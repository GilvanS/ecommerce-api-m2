/*
================================================================================
ARQUIVO: src/components/products/ProductCardSmall.js (ATUALIZADO)
================================================================================
*/
import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { Star } from "../shared/Icons";

export const ProductCardSmall = ({ product, onProductSelect }) => {
  if (!product) return null;

  const hasDiscount =
    product.discount_price &&
    parseFloat(product.discount_price) < parseFloat(product.price);

  return (
    <div
      onClick={() => onProductSelect && onProductSelect(product.id)}
      className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200 cursor-pointer group"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md shadow-sm flex-shrink-0"
      />
      <div className="flex-grow min-w-0">
        <p className="text-sm text-merqado-gray-medium">
          {product.category?.name || "Categoria"}
        </p>
        <h4
          className="font-semibold text-merqado-gray-dark group-hover:text-merqado-blue truncate"
          title={product.name}
        >
          {product.name}
        </h4>
        <div className="flex items-center my-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
        {/* Lógica de Preço com Desconto CORRIGIDA */}
        <div className="flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <p className="font-bold text-merqado-orange">
                {formatCurrency(product.discount_price)}
              </p>
              <p className="text-xs text-merqado-gray-medium line-through">
                {formatCurrency(product.price)}
              </p>
            </>
          ) : (
            <p className="font-bold text-merqado-blue">
              {formatCurrency(product.price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
