/* eslint-disable no-unused-vars */
/*
================================================================================
ARQUIVO: src/pages/ForgotPasswordPage.js (NOVO)
================================================================================
*/
import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { apiClient } from "../api/client";
import { Spinner } from "../components/ui/Spinner";
import { Input } from "../components/ui/Input";
import { Logo } from "../components/shared/Logo2";
import { AlertCircle } from "../components/shared/Icons";

export const ForgotPasswordPage = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { values, handleInputChange, isFormValid } = useForm(
    { email: "" },
    { email: { required: true } }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isFormValid()) {
      setError("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/users/forgot-password", {
        email: values.email,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Ocorreu um erro. Tente novamente."
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
        <h2 className="text-center text-2xl font-bold text-merqado-gray-dark mb-4">
          Recuperar Senha
        </h2>
        <p className="text-center text-sm text-merqado-gray-medium mb-6">
          Insira o seu e-mail e enviaremos um link para redefinir a sua senha.
        </p>

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4"
            role="alert"
          >
            <p className="text-sm">{error}</p>
          </div>
        )}

        {message ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-4">
            <p className="font-bold">Verifique o seu e-mail</p>
            <p className="text-sm">{message}</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              value={values.email}
              onChange={handleInputChange}
              placeholder="Seu e-mail de registo"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-white bg-merqado-orange hover:bg-opacity-90 disabled:bg-opacity-50"
            >
              {loading ? <Spinner /> : "Enviar Link de Recuperação"}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => setPage("login")}
            className="text-sm font-medium text-merqado-blue hover:underline"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    </div>
  );
};
