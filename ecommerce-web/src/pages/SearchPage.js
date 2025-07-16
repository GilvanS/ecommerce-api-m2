import React from "react";

// Importando componentes reutilizáveis
import { Spinner } from "../components/ui/Spinner";
import { ProductCardV2 } from "../components/products/ProductCardV2";

export const SearchPage = ({
  searchTerm,
  results,
  loading,
  onProductSelect,
}) => {
  // Exibe um spinner enquanto a busca está em andamento
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Resultados da busca por: "{searchTerm}"
      </h1>

      {results.length === 0 ? (
        // Mensagem exibida se nenhum resultado for encontrado
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <p className="text-slate-600 text-lg">
            Nenhum produto encontrado para sua busca.
          </p>
        </div>
      ) : (
        // Grid com os produtos encontrados
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((product) => (
            <ProductCardV2
              key={product.id}
              product={product}
              onProductSelect={onProductSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
