/*
================================================================================
ARQUIVO: src/components/ui/QuantitySelector.js (NOVO)
================================================================================
*/
import React from "react";
import { MinusCircle, PlusCircle } from "../shared/Icons";

export const QuantitySelector = ({ quantity, setQuantity, stock }) => {
  const handleDecrement = () => {
    // Não permite quantidade menor que 1
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const handleIncrement = () => {
    // Não permite adicionar mais do que o estoque disponível
    setQuantity((currentQuantity) => Math.min(stock, currentQuantity + 1));
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="p-2 border rounded-md hover:bg-merqado-gray-light disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuir quantidade"
      >
        <MinusCircle className="w-4 h-4" />
      </button>

      <span
        className="font-bold text-lg w-10 text-center select-none"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        onClick={handleIncrement}
        disabled={quantity >= stock}
        className="p-2 border rounded-md hover:bg-merqado-gray-light disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar quantidade"
      >
        <PlusCircle className="w-4 h-4" />
      </button>
    </div>
  );
};
