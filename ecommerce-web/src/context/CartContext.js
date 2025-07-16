/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useMemo, createContext, useContext } from "react";
import toast from "react-hot-toast"; // NOVO: Importando a biblioteca de toast
import { CheckCircle, Trash2 } from "../components/shared/Icons";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const priceToUse = item.discount_price || item.price;
        return sum + parseFloat(priceToUse) * item.quantity;
      }, 0),
    [cart]
  );

  const addToCart = (product, quantityToAdd = 1) => {
    // Lógica para adicionar ao carrinho...
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          price: product.price,
          discount_price: product.discount_price,
          quantity: quantityToAdd,
        },
      ];
    });

    // NOVO: Dispara o toast de sucesso
    toast.success(`${quantityToAdd}x ${product.name} adicionado(s)!`, {
      icon: <CheckCircle className="text-merqado-blue-dark" />,
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

  const removeItem = (productId) => {
    const removedItem = cart.find((item) => item.id === productId);
    if (removedItem) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      // Opcional: toast para item removido
      toast.error(`${removedItem.name} removido do carrinho.`, {
        icon: <Trash2 className="text-merqado-orange-dark" />,
      });
    }
  };

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
    [cart, removeItem, total, updateItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
