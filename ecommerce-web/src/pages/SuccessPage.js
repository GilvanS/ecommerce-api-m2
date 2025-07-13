/*
================================================================================
ARQUIVO: src/pages/SuccessPage.js
================================================================================
*/
import React, { useEffect } from "react";

// Importando o contexto para limpar o carrinho após a compra
import { useCart } from "../context/CartContext";

// Importando Ícones
import { CheckCircle } from "../components/shared/Icons";

export const SuccessPage = ({ setPage }) => {
  const { clearCart } = useCart();

  // useEffect é usado para executar uma ação assim que o componente é renderizado.
  // Neste caso, ele limpa o carrinho de compras. O array vazio `[]` como segundo
  // argumento garante que isso aconteça apenas uma vez.
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-xl shadow-md">
        <CheckCircle className="h-24 w-24 mx-auto text-green-500" />
        <h1 className="text-4xl font-bold text-slate-800 mt-6">
          Compra Realizada com Sucesso!
        </h1>
        <p className="text-slate-600 mt-2 max-w-md mx-auto">
          Obrigado por comprar conosco. Um resumo do seu pedido foi enviado para
          o seu e-mail.
        </p>
        <button
          onClick={() => setPage("home")}
          className="mt-8 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Voltar para a Loja
        </button>
      </div>
    </div>
  );
};
