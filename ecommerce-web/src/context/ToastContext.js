/*
================================================================================
ARQUIVO: src/context/ToastContext.js (NOVO)
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
import { graphqlClient } from "../api/client";
import { useAuth } from "./AuthContext";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [currentToast, setCurrentToast] = useState(null);
  const { isAuthenticated } = useAuth();

  // 1. Busca todos os produtos em oferta quando o usuário se autentica
  useEffect(() => {
    const fetchOnSaleProducts = async () => {
      if (isAuthenticated) {
        try {
          const query = `query { products(onSale: true) { products { id name price discount_price imageUrl } } }`;
          const data = await graphqlClient(query);
          if (data.products) {
            setOnSaleProducts(data.products.products || []);
          }
        } catch (error) {
          console.error(
            "Erro ao buscar produtos em oferta para toasts:",
            error
          );
        }
      }
    };
    fetchOnSaleProducts();
  }, [isAuthenticated]);

  // 2. Lógica para exibir os toasts periodicamente
  useEffect(() => {
    if (onSaleProducts.length === 0) {
      return; // Não faz nada se não houver produtos em oferta
    }

    const showRandomToast = () => {
      const randomIndex = Math.floor(Math.random() * onSaleProducts.length);
      const randomProduct = onSaleProducts[randomIndex];
      setCurrentToast(randomProduct);

      // Esconde o toast após 7 segundos
      setTimeout(() => {
        setCurrentToast(null);
      }, 7000);
    };

    // Mostra o primeiro toast após 10 segundos e depois a cada 20 segundos
    const initialTimeout = setTimeout(showRandomToast, 10000);
    const interval = setInterval(showRandomToast, 30000);

    // Limpa os timers quando o componente for desmontado para evitar vazamentos de memória
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [onSaleProducts]);

  const closeToast = useCallback(() => {
    setCurrentToast(null);
  }, []);

  const value = useMemo(
    () => ({
      currentToast,
      closeToast,
    }),
    [currentToast, closeToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
