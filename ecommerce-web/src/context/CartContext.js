/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useContext, useMemo } from "react";

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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
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
