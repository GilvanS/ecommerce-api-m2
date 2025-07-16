/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { ProductCardSmall } from "../products/ProductCardSmall";

export const ProductColumn = ({
  title,
  products,
  onProductSelect,
  setPage,
}) => {
  return (
    <div className="flex-1 bg-white/40 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-merqado-gray-dark">{title}</h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPage("offers");
          }}
          className="text-sm font-semibold text-merqado-blue hover:underline"
        >
          Ver mais
        </a>
      </div>
      <div className="space-y-4">
        {!products || products.length === 0 ? (
          <p className="text-sm text-merqado-gray-medium">
            Nenhum produto para exibir.
          </p>
        ) : (
          products.map((product) => (
            <ProductCardSmall
              key={product.id}
              product={product}
              onProductSelect={onProductSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};
