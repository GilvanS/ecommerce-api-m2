/*
================================================================================
ARQUIVO: src/components/products/ProductCardV2.js
================================================================================
*/
import React from "react";

// Importando o contexto do carrinho para a ação de adicionar
import { useCart } from "../../context/CartContext";

// Importando o utilitário de formatação de moeda
import { formatCurrency } from "../../utils/formatters";

// Importando Ícones
import { Heart, Eye, Star } from "../shared/Icons";

export const ProductCardV2 = ({ product }) => {
  const { addToCart } = useCart();

  // Fallback para caso o produto não seja válido
  if (!product) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={
            product.imageUrl ||
            "https://placehold.co/600x400/cccccc/ffffff?text=Imagem+Indisponível"
          }
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* Overlay com ações que aparece no hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
          <button className="bg-white p-2 rounded-full text-gray-700 hover:bg-pink-500 hover:text-white transition-colors">
            <Heart />
          </button>
          <button className="bg-white p-2 rounded-full text-gray-700 hover:bg-pink-500 hover:text-white transition-colors">
            <Eye />
          </button>
        </div>

        {/* Badge "NOVO" */}
        {product.is_new && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            NOVO
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">
          {/* Em uma implementação futura, o nome da categoria viria aqui */}
          Eletrônicos
        </p>
        <h3
          className="font-semibold text-gray-800 truncate"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Avaliação por estrelas (estática por enquanto) */}
        <div className="flex items-center my-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p className="font-bold text-pink-500 text-lg">
            {formatCurrency(product.price)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-800 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-pink-500 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
