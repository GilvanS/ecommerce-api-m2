/*
================================================================================
ARQUIVO: src/components/ui/SalesToast.js (NOVO)
================================================================================
*/
import React, { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { formatCurrency } from "../../utils/formatters";
import { X } from "../shared/Icons";

export const SalesToast = ({ onProductSelect }) => {
  const { currentToast, closeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (currentToast) {
      // Ativa a animação de entrada
      setIsVisible(true);
    } else {
      // Ativa a animação de saída
      setIsVisible(false);
    }
  }, [currentToast]);

  if (!currentToast) {
    return null;
  }

  const handleToastClick = () => {
    if (onProductSelect) {
      onProductSelect(currentToast.id);
    }
    closeToast();
  };

  return (
    <div
      className={`fixed bottom-5 right-5 w-80 bg-white rounded-xl shadow-2xl transition-all duration-500 ease-in-out z-50 ${
        isVisible
          ? "transform translate-x-0 opacity-100"
          : "transform translate-x-full opacity-0"
      }`}
    >
      <div className="p-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeToast();
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={handleToastClick}
        >
          <img
            src={currentToast.imageUrl}
            alt={currentToast.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-grow">
            <p className="text-sm text-merqado-gray-medium">
              Alguém comprou há pouco!
            </p>
            <h4 className="font-semibold text-merqado-gray-dark">
              {currentToast.name}
            </h4>
            <p className="font-bold text-merqado-orange">
              {formatCurrency(
                currentToast.discount_price || currentToast.price
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
