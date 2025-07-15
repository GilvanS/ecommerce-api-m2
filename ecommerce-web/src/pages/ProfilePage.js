import React, { useState } from "react";

// Importando contextos e hooks
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { apiClient } from "../api/client";
import { isPasswordStrong } from "../utils/validators";

// Importando componentes de UI e Ícones
import { Spinner } from "../components/ui/Spinner";
import { Input } from "../components/ui/Input";
import { User } from "../components/shared/Icons";
import { PasswordStrengthIndicator } from "../components/shared/PasswordStrengthIndicator";

export const ProfilePage = () => {
  const { userProfile, loading: authLoading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { values, errors, handleInputChange, isFormValid, setValues } = useForm(
    { oldPassword: "", newPassword: "", confirmPassword: "" },
    {
      oldPassword: { required: true },
      newPassword: {
        required: true,
        validator: isPasswordStrong,
        errorMessage: "A nova senha não é forte o suficiente.",
      },
      confirmPassword: {
        required: true,
        validator: (val) => val === values.newPassword,
        errorMessage: "As senhas não coincidem.",
      },
    }
  );

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!isFormValid()) {
      setErrorMessage("Por favor, corrija os erros no formulário.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await apiClient.put("/users/change-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      setSuccessMessage(response.data.message);
      setValues({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Limpa os campos
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao alterar a senha."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    if (
      typeof dateString !== "string" ||
      dateString.trim() === "" ||
      dateString === "0000-00-00 00:00:00"
    ) {
      return "Data indisponível";
    }
    const date = new Date(Number(dateString));

    if (isNaN(date.getTime())) return "Data Inválida";

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Não foi possível carregar o perfil.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna de Informações do Perfil */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-merqado-gray-dark mb-6 flex items-center gap-3">
              <User className="w-8 h-8" />
              Meu Perfil
            </h1>
            <div className="space-y-4">
              <div className="flex">
                <p className="w-1/3 text-merqado-gray-medium font-semibold">
                  Nome:
                </p>
                <p>{userProfile.name}</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-merqado-gray-medium font-semibold">
                  Usuário:
                </p>
                <p>{userProfile.username}</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-merqado-gray-medium font-semibold">
                  Membro Desde:
                </p>
                <p>{formatDate(userProfile.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna de Alteração de Senha */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-merqado-gray-dark mb-4">
              Alterar Senha
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                name="oldPassword"
                type="password"
                value={values.oldPassword}
                onChange={handleInputChange}
                placeholder="Senha Atual"
                error={errors.oldPassword}
              />
              <Input
                name="newPassword"
                type="password"
                value={values.newPassword}
                onChange={handleInputChange}
                placeholder="Nova Senha"
                error={errors.newPassword}
              />
              {values.newPassword && (
                <PasswordStrengthIndicator password={values.newPassword} />
              )}
              <Input
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmar Nova Senha"
                error={errors.confirmPassword}
              />

              {successMessage && (
                <p className="text-sm text-green-600">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm font-medium text-white bg-merqado-blue hover:bg-merqado-blue-dark disabled:bg-blue-300"
              >
                {isProcessing ? <Spinner /> : "Alterar Senha"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
