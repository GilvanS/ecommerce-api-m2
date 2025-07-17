import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { isPasswordStrong } from "../utils/validators";
import { Input } from "../components/ui/Input";
import { Spinner } from "../components/ui/Spinner";
import { Logo } from "../components/shared/Logo";
import { PasswordStrengthIndicator } from "../components/shared/PasswordStrengthIndicator";
import poweredByLogo from "../assets/img/logo-chris.svg";
import { AlertCircle } from "../components/shared/Icons";

export const LoginPage = ({ setPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formErrorTitle, setFormErrorTitle] = useState("");
  const [success, setSuccess] = useState("");

  const initialValues = {
    name: "",
    age: "",
    city: "",
    state: "",
    username: "",
    password: "",
    email: "",
  };

  const { values, errors, handleInputChange, isFormValid, setValues } = useForm(
    initialValues,
    {
      name: { required: !isLogin },
      age: { required: !isLogin },
      city: { required: !isLogin },
      state: { required: !isLogin },
      email: {
        required: !isLogin,
        validator: (v) => isLogin || /\S+@\S+\.\S+/.test(v),
        errorMessage: "Informe um e‑mail válido.",
      },
      username: { required: true },
      password: {
        required: true,
        validator: (p) => isLogin || isPasswordStrong(p),
        errorMessage: "A senha não atende aos critérios de segurança.",
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    setFormErrorTitle("");

    if (!isFormValid()) {
      setFormErrorTitle("Erro de Validação");
      setFormError("Por favor, corrija os erros no formulário.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        setFormErrorTitle("Erro de Autenticação");
        await login(values.username, values.password);
      } else {
        setFormErrorTitle("Erro de Registo");
        await register(values);
        setSuccess(
          "Utilizador registrado com sucesso! Por favor, faça o login."
        );
        setIsLogin(true);
        setValues({ ...initialValues, username: values.username });
      }
    } catch (err) {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Ocorreu um erro inesperado.";
      setFormError(msg);
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
        <h2 className="text-center text-3xl font-extrabold text-merqado-gray-dark mb-6">
          {isLogin ? "Bem-vindo de volta!" : "Crie a sua conta"}
        </h2>

        {formError && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4"
            role="alert"
          >
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-1" />
              <div>
                <p className="font-bold">{formErrorTitle}</p>
                <p className="text-sm">{formError}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-4">
            <p className="text-sm">{success}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <>
              <Input
                name="name"
                value={values.name}
                onChange={handleInputChange}
                placeholder="Nome Completo"
                error={errors.name}
              />{" "}
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleInputChange}
                placeholder="E‑mail"
                error={errors.email}
              />
              <div className="flex space-x-4">
                <Input
                  name="age"
                  type="number"
                  value={values.age}
                  onChange={handleInputChange}
                  placeholder="Idade"
                  error={errors.age}
                />
                <Input
                  name="city"
                  value={values.city}
                  onChange={handleInputChange}
                  placeholder="Cidade"
                  error={errors.city}
                />
              </div>
              <Input
                name="state"
                value={values.state}
                onChange={handleInputChange}
                placeholder="Estado"
                error={errors.state}
                maxLength="15"
              />
              <hr />
            </>
          )}
          <Input
            name="username"
            value={values.username}
            onChange={handleInputChange}
            placeholder="Usuário"
            error={errors.username}
          />
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Senha"
            error={errors.password}
          />
          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" /* ... */ />
                <span className="ml-2">Lembrar-me</span>
              </label>
              {/* Este botão agora funciona porque setPage é uma função válida */}
              <button
                type="button"
                onClick={() => setPage("forgotPassword")}
                className="text-sm font-medium text-merqado-blue hover:underline"
              >
                Esqueceu a sua senha?
              </button>
            </div>
          )}
          {!isLogin && <PasswordStrengthIndicator password={values.password} />}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-white bg-merqado-orange hover:bg-opacity-90 disabled:bg-merqado-orange/50"
          >
            {loading ? <Spinner /> : isLogin ? "Entrar" : "Registrar"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-600 mt-4">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormError("");
              setSuccess("");
              setValues(initialValues);
            }}
            className="font-medium text-merqado-blue hover:text-merqado-blue-dark ml-1"
          >
            {isLogin ? "Registe-se" : "Faça o login"}
          </button>
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center space-y-2">
        <p className="text-xs text-slate-400">Powered by</p>
        <img src={poweredByLogo} alt="Chris" className="h-6 w-auto" />
      </div>
    </div>
  );
};
