/*
================================================================================
ARQUIVO: src/pages/ResetPasswordPage.js (ATUALIZADO)
================================================================================
*/
import React, { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { apiClient } from "../api/client";
import { isPasswordStrong } from "../utils/validators";
import { Spinner } from "../components/ui/Spinner";
import { Input } from "../components/ui/Input";
import { Logo } from "../components/shared/Logo2";
import { PasswordStrengthIndicator } from "../components/shared/PasswordStrengthIndicator";

export const ResetPasswordPage = ({ setPage }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Extrai o token da URL quando o componente é montado
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError(
        "Token de redefinição não encontrado. Por favor, solicite um novo link."
      );
    }
  }, []);

  const { values, errors, handleInputChange, isFormValid } = useForm(
    { password: "", confirmPassword: "" },
    {
      password: {
        required: true,
        validator: isPasswordStrong,
        errorMessage: "A senha não atende aos critérios de segurança.",
      },
      confirmPassword: {
        required: true,
        validator: (val) => val === values.password,
        errorMessage: "As senhas não coincidem.",
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isFormValid()) {
      setError("Por favor, corrija os erros no formulário.");
      return;
    }

    if (!token) {
      setError("Token de redefinição inválido.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post(`/users/reset-password/${token}`, {
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      setMessage(response.data.message);
      // Invalida o token na URL e ajusta para a tela de login
      window.history.replaceState(null, "", "/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ocorreu um erro. O token pode ser inválido ou ter expirado."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-merqado-gray-light flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h2 className="text-center text-2xl font-bold text-merqado-gray-dark mb-6">
          Redefinir a sua Senha
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {message ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">{message}</p>
            <button
              onClick={() => setPage("login")}
              className="w-full bg-merqado-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-merqado-blue-dark transition-colors"
            >
              Ir para o Login
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder="Nova Senha"
              error={errors.password}
            />
            {values.password && (
              <PasswordStrengthIndicator password={values.password} />
            )}
            <Input
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirmar Nova Senha"
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              disabled={loading || !token}
              className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-white bg-merqado-orange hover:bg-opacity-90 disabled:bg-opacity-50"
            >
              {loading ? <Spinner /> : "Redefinir Senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
