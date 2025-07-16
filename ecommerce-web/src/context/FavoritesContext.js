/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*
================================================================================
ARQUIVO: src/context/FavoritesContext.js (CORRIGIDO)
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

// Importando o cliente GraphQL para buscar dados e o cliente REST para mutações
import { graphqlClient, apiClient } from "../api/client";

// Importando o contexto de autenticação para verificar se o usuário está logado
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Efeito para buscar os favoritos do usuário quando ele se autentica
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          // Utiliza a query GraphQL 'favorites' para buscar os produtos completos
          const data = await graphqlClient(
            `query { favorites { id name description price imageUrl } }`
          );
          setFavoriteProducts(data.favorites);
        } catch (error) {
          console.error("Erro ao buscar favoritos", error);
          // Limpa os favoritos em caso de erro (ex: token expirado)
          setFavoriteProducts([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Se o usuário não está autenticado, a lista de favoritos é vazia
        setFavoriteProducts([]);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  // Função para adicionar ou remover um produto dos favoritos
  const toggleFavorite = async (product) => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado para adicionar favoritos.");
      return;
    }

    const isCurrentlyFavorite = favoriteProducts.some(
      (fav) => fav.id === product.id
    );

    // Atualização Otimista da UI:
    // A interface é atualizada imediatamente para dar um feedback rápido ao usuário,
    // antes mesmo da confirmação da API.
    if (isCurrentlyFavorite) {
      setFavoriteProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setFavoriteProducts((prev) => [...prev, product]);
    }

    try {
      // Chamada ao endpoint REST para persistir a alteração no banco de dados
      await apiClient.post("/favorites/toggle", { productId: product.id });
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      // Em caso de erro na API, reverte a atualização otimista da UI
      if (isCurrentlyFavorite) {
        setFavoriteProducts((prev) => [...prev, product]);
      } else {
        setFavoriteProducts((prev) => prev.filter((p) => p.id !== product.id));
      }
      alert("Não foi possível atualizar seus favoritos. Tente novamente.");
    }
  };

  // Função auxiliar para verificar se um produto já é favorito
  const isFavorite = (productId) =>
    favoriteProducts.some((fav) => fav.id === productId);

  // O valor do contexto é memoizado para evitar re-renderizações desnecessárias
  const value = useMemo(
    () => ({
      favoriteProducts,
      favoritesCount: favoriteProducts.length,
      loading,
      toggleFavorite,
      isFavorite,
    }),
    [favoriteProducts, isFavorite, loading, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto nos componentes
export const useFavorites = () => useContext(FavoritesContext);
