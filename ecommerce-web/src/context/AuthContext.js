/* eslint-disable react-hooks/exhaustive-deps */
/*
================================================================================
ARQUIVO: src/context/AuthContext.js (ATUALIZADO E CORRIGIDO)
================================================================================
*/
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { apiClient, graphqlClient } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!token;

  const logout = useCallback(() => {
    setToken(null);
    setUserProfile(null);
    localStorage.removeItem("authToken");
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const data = await graphqlClient(
            `query { profile { id name age city state username role } }`
          );
          setUserProfile(data.profile);
        } catch (error) {
          console.error("Falha ao buscar perfil, fazendo logout.", error);
          logout();
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [isAuthenticated, logout]);

  // --- FUNÇÃO CORRIGIDA ---
  const login = async (username, password) => {
    // O estado de loading agora é gerido pelo componente que chama, para um feedback mais preciso.
    try {
      const { data } = await apiClient.post("/users/login", {
        username,
        password,
      });
      setToken(data.token);
      localStorage.setItem("authToken", data.token);
      // Se o login for bem-sucedido, o fluxo continua no componente que chamou.
    } catch (error) {
      // Em vez de retornar um objeto de erro, simplesmente RELANÇAMOS o erro.
      // Isto permite que o `.catch()` no componente LoginPage seja ativado.
      throw error;
    }
  };

  const register = async (profileData) => {
    // Refatorado para também lançar o erro
    try {
      await apiClient.post("/users/register", profileData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      token,
      userProfile,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
    }),
    [token, userProfile, isAuthenticated, loading, logout, login, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
