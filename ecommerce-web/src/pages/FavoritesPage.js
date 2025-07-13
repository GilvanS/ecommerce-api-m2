/*
================================================================================
ARQUIVO: src/pages/FavoritesPage.js (CORRIGIDO)
================================================================================
*/
import React from "react";

// Importando o contexto para acessar os favoritos
import { useFavorites } from "../context/FavoritesContext";

// Importando componentes de UI e o card de produto
import { Spinner } from "../components/ui/Spinner";
import { ProductCardV2 } from "../components/products/ProductCardV2";

// Importando Ícones
import { Heart } from "../components/shared/Icons";

export const FavoritesPage = () => {
  // Consome diretamente a lista de produtos favoritados e o estado de loading
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
        <Heart className="w-8 h-8 text-pink-500" />
        Meus Favoritos
      </h1>
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <p className="text-slate-600 text-lg">
            Você ainda não adicionou nenhum produto aos favoritos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {favoriteProducts.map((product) => (
            // O ProductCardV2 já tem a lógica para exibir o coração preenchido
            // e a ação de remover ao clicar.
            <ProductCardV2 key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
