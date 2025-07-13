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

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post("/users/login", {
        username,
        password,
      });
      setToken(data.token);
      localStorage.setItem("authToken", data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro de conexão.",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (profileData) => {
    setLoading(true);
    try {
      await apiClient.post("/users/register", profileData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro de registro.",
      };
    } finally {
      setLoading(false);
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
    [token, userProfile, isAuthenticated, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
