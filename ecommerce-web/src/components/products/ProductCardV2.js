/* eslint-disable no-unused-vars */
/*
================================================================================
ARQUIVO: src/components/products/ProductCardV2.js (ATUALIZADO)
================================================================================
*/
import React from "react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { formatCurrency } from "../../utils/formatters";
import { Heart, Eye, Star } from "../shared/Icons";

export const ProductCardV2 = ({ product, onProductSelect }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) return null;

  const favorited = isFavorite(product.id);
  const hasDiscount =
    product.discount_price && product.discount_price < product.price;

  // Função principal de clique para o card, navega para a página de detalhes
  const handleCardClick = () => {
    if (onProductSelect) {
      onProductSelect(product.id);
    }
  };

  // Função para o botão de favoritar, que impede o clique do card principal
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Impede que o clique "vaze" para o card pai
    toggleFavorite(product);
  };

  // Função para o botão de adicionar ao carrinho, que impede o clique do card principal
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Impede que o clique "vaze" para o card pai
    addToCart(product);
  };

  // Função para o botão de visualização, que impede o clique do card principal mas executa a mesma ação
  const handleEyeClick = (e) => {
    e.stopPropagation(); // Impede que o clique "vaze" para o card pai
    handleCardClick(); // Executa a mesma lógica de navegação do card
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <img
          src={
            product.imageUrl ||
            "https://placehold.co/600x400/cccccc/ffffff?text=Imagem+Indisponível"
          }
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              favorited
                ? "bg-merqado-orange text-white"
                : "bg-white text-gray-700 hover:bg-merqado-orange hover:text-white"
            }`}
          >
            <Heart className={favorited ? "fill-current" : ""} />
          </button>
          <button
            onClick={handleEyeClick}
            className="bg-white p-2 rounded-full text-gray-700 hover:bg-merqado-orange hover:text-white transition-colors"
          >
            <Eye />
          </button>
        </div>
        {product.is_new && (
          <span className="absolute top-3 left-3 bg-merqado-orange text-white text-xs font-bold px-2 py-1 rounded-md">
            NOVO
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-merqado-offer text-white text-xs font-bold px-2 py-1 rounded-md">
            OFERTA
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-merqado-gray-medium mb-1">
          {product.category?.name || "Categoria"}
        </p>
        <h3
          className="font-semibold text-merqado-gray-dark group-hover:text-merqado-blue"
          title={product.name}
        >
          {product.name}
        </h3>
        <div className="flex items-center my-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
        {/* Lógica de Preço com Desconto */}
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <p className="font-bold text-merqado-orange text-lg">
                  {formatCurrency(product.discount_price)}
                </p>
                <p className="text-sm text-merqado-gray-medium line-through">
                  {formatCurrency(product.price)}
                </p>
              </>
            ) : (
              <p className="font-bold text-merqado-blue text-lg">
                {formatCurrency(product.price)}
              </p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-merqado-blue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-merqado-blue-dark transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
