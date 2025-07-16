/* eslint-disable no-unused-vars */
/*
================================================================================
ARQUIVO: src/pages/FavoritesPage.js (ATUALIZADO)
================================================================================
*/
import React, { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Spinner } from "../components/ui/Spinner";
import { ProductCardV2 } from "../components/products/ProductCardV2";
import { Heart } from "../components/shared/Icons";

// A página agora recebe a prop onProductSelect
export const FavoritesPage = ({ onProductSelect }) => {
  const { favoriteProducts, loading } = useFavorites();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <Heart className="w-8 h-8 text-merqado-orange" />
        Meus Favoritos
      </h1>
      {favoriteProducts.length === 0 ? (
        <p className="text-slate-600 text-center text-lg mt-10">
          Você ainda não adicionou nenhum produto aos favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* A prop onProductSelect é passada para cada card */}
          {favoriteProducts.map((p) => (
            <ProductCardV2
              key={p.id}
              product={p}
              onProductSelect={onProductSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
