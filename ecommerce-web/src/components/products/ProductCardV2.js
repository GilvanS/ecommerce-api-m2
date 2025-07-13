import React from "react";

// Importando os contextos necessários
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

// Importando o utilitário de formatação de moeda
import { formatCurrency } from "../../utils/formatters";

// Importando Ícones
import { Heart, Eye, Star } from "../shared/Icons";

export const ProductCardV2 = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) {
    return null;
  }

  const favorited = isFavorite(product.id);

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

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => toggleFavorite(product)}
            className={`p-2 rounded-full transition-colors ${
              favorited
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 hover:bg-pink-500 hover:text-white"
            }`}
          >
            <Heart className={favorited ? "fill-current" : ""} />
          </button>
          <button className="bg-white p-2 rounded-full text-gray-700 hover:bg-pink-500 hover:text-white transition-colors">
            <Eye />
          </button>
        </div>

        {product.is_new && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            NOVO
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">Eletrônicos</p>
        <h3
          className="font-semibold text-gray-800 truncate"
          title={product.name}
        >
          {product.name}
        </h3>

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
