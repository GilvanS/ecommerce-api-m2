/*
================================================================================
ARQUIVO: src/pages/ProfilePage.js
================================================================================
*/
import React from "react";

// Importando o contexto para acessar os dados do usuário
import { useAuth } from "../context/AuthContext";

// Importando componentes de UI
import { Spinner } from "../components/ui/Spinner";

// Importando Ícones
import { User } from "../components/shared/Icons";

export const ProfilePage = () => {
  const { userProfile, loading } = useAuth();

  // Exibe um spinner enquanto os dados do perfil estão sendo carregados
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  // Exibe uma mensagem caso o perfil não seja encontrado
  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Perfil não encontrado
        </h1>
        <p className="text-slate-600 mt-2">
          Não foi possível carregar os dados do seu perfil. Por favor, tente
          fazer login novamente.
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
      <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Nome Completo
            </p>
            <p className="font-medium text-slate-800">{userProfile.name}</p>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Nome de Usuário
            </p>
            <p className="font-medium text-slate-800">{userProfile.username}</p>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Idade
            </p>
            <p className="font-medium text-slate-800">{userProfile.age} anos</p>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Localização
            </p>
            <p className="font-medium text-slate-800">{`${userProfile.city}, ${userProfile.state}`}</p>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row">
            <p className="w-full sm:w-1/3 text-slate-500 font-semibold">
              Membro Desde
            </p>
            <p className="font-medium text-slate-800">
              {new Date(userProfile.created_at).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
