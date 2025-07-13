import React, { useState } from "react";

// Importando hooks e contextos necessários
import { useForm } from "../../src/hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { isPasswordStrong } from "../../src/utils/validators";

// Importando componentes de UI
import { Input } from "../../src/components/ui/Input";
import { Logo } from "../../src/components/shared/Logo";
import { PasswordStrengthIndicator } from "../../src/components/shared/PasswordStrengthIndicator";
import poweredByLogo from "../../src/assets/img/logo-chris.svg";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, loading } = useAuth();
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  // Configuração do hook de formulário com valores iniciais e regras de validação
  const { values, errors, handleInputChange, isFormValid, setValues } = useForm(
    { name: "", age: "", city: "", state: "", username: "", password: "" },
    {
      name: { required: !isLogin },
      age: { required: !isLogin },
      city: { required: !isLogin },
      state: { required: !isLogin },
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

    // Valida o formulário antes de submeter
    if (!isFormValid()) {
      setFormError("Por favor, corrija os erros no formulário.");
      return;
    }

    if (isLogin) {
      const result = await login(values.username, values.password);
      if (!result.success) {
        setFormError(result.message);
      }
    } else {
      const result = await register(values);
      if (result.success) {
        setSuccess("Usuário registrado com sucesso! Por favor, faça o login.");
        setIsLogin(true);
        // Limpa os campos de perfil, mas mantém o username para conveniência
        setValues((prev) => ({ ...initialValues, username: prev.username }));
      } else {
        setFormError(result.message);
      }
    }
  };

  // Valores iniciais para resetar o formulário
  const initialValues = {
    name: "",
    age: "",
    city: "",
    state: "",
    username: "",
    password: "",
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-slate-800">
            {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <>
                <Input
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  placeholder="Nome Completo"
                  error={errors.name}
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
                  maxLength="2"
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
            {!isLogin && (
              <PasswordStrengthIndicator password={values.password} />
            )}

            {formError && (
              <p className="text-sm text-red-600 text-center">{formError}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 text-center">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-white bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : isLogin ? (
                "Entrar"
              ) : (
                "Registrar"
              )}
            </button>
          </form>
          <p className="text-center text-sm text-slate-600">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormError("");
                setSuccess("");
                setValues(initialValues);
              }}
              className="font-medium text-pink-500 hover:text-pink-600 ml-1"
            >
              {isLogin ? "Registre-se" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center space-y-2">
        <p className="text-xs text-slate-400">Powered by</p>
        <img src={poweredByLogo} alt="Chris" className="h-6 w-auto" />
      </div>
    </div>
  );
};
