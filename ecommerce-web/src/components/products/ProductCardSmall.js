import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { StarRating } from "../shared/StarRating"; // <- novo import

export const ProductCardSmall = ({ product, onProductSelect }) => {
  const fakeRating = Math.random() * 5;
  if (!product) return null;

  return (
    <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md shadow-sm flex-shrink-0"
      />
      <div className="flex-grow">
        <p className="text-sm text-merqado-gray-medium">
          {product.category?.name || "Categoria"}
        </p>
        <h4
          onClick={() => onProductSelect(product.id)}
          className="font-semibold text-merqado-gray-dark hover:text-merqado-blue cursor-pointer truncate"
          title={product.name}
        >
          {product.name}
        </h4>

        <StarRating rating={fakeRating} />

        <p className="font-bold text-merqado-blue">
          {formatCurrency(product.price)}
        </p>
      </div>
    </div>
  );
};
