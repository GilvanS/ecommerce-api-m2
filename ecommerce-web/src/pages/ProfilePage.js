/*
================================================================================
ARQUIVO: src/pages/ProfilePage.js (CORRIGIDO)
================================================================================
*/
import React from "react";

// Importando o contexto de autenticação
import { useAuth } from "../context/AuthContext";

// Importando componentes de UI e Ícones
import { Spinner } from "../components/ui/Spinner";
import { User } from "../components/shared/Icons";

export const ProfilePage = () => {
  // Adicionando 'loading' do contexto de autenticação
  const { userProfile, loading } = useAuth();

  // Função para formatar a data de forma segura
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

  // Exibe o spinner enquanto o contexto está a carregar os dados do perfil.
  // Isso garante que não tentaremos renderizar dados parciais.
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  // Se, após o carregamento, ainda não houver perfil, exibe uma mensagem.
  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-slate-600">
          Não foi possível carregar as informações do perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <User className="w-8 h-8" />
        Meu Perfil
      </h1>
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Nome Completo
            </p>
            <p className="font-medium text-slate-800">{userProfile.name}</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Nome de Usuário
            </p>
            <p className="font-medium text-slate-800">{userProfile.username}</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Idade
            </p>
            <p className="font-medium text-slate-800">{userProfile.age} anos</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Localização
            </p>
            <p className="font-medium text-slate-800">{`${userProfile.city}, ${userProfile.state}`}</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Papel (Role)
            </p>
            <p className="font-medium text-slate-800 capitalize">
              {userProfile.role}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Membro Desde
            </p>
            <p className="font-medium text-slate-800">
              {formatDate(userProfile.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
