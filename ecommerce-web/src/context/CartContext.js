/* eslint-disable react-hooks/exhaustive-deps */
/*
================================================================================
ARQUIVO: src/context/CartContext.js (ATUALIZADO)
================================================================================
*/
import React, { useState, useMemo, createContext, useContext } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      ),
    [cart]
  );

  // ATUALIZADO: A função agora aceita uma quantidade específica a ser adicionada
  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Se o item já existe, soma a nova quantidade à existente
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      // Se for um item novo, adiciona com a quantidade especificada
      return [...prevCart, { ...product, quantity: quantityToAdd }];
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity < 1) return removeItem(productId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId) =>
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

  const clearCart = () => setCart([]);

  const value = useMemo(
    () => ({
      cart,
      total,
      addToCart,
      updateItemQuantity,
      removeItem,
      clearCart,
    }),
    [cart, total, updateItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
