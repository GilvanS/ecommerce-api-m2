import React from "react";

export const ImageGallery = ({ product }) => {
  if (!product) {
    return (
      <div className="w-full md:w-1/2">
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Carregando imagem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2">
      {/* Imagem Principal */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto max-h-[500px] object-contain rounded-lg"
        />
      </div>

      {/* Thumbnails (preparado para o futuro) */}
      <div className="flex space-x-2 mt-4">
        {/* Exemplo de thumbnail ativa */}
        <div className="w-20 h-20 border-2 border-merqado-blue rounded-md p-1">
          <img
            src={product.imageUrl}
            alt="thumbnail 1"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
        {/* Exemplo de thumbnails inativas */}
        <div className="w-20 h-20 border border-gray-300 rounded-md p-1 cursor-pointer">
          <img
            src={product.imageUrl}
            alt="thumbnail 2"
            className="w-full h-full object-cover rounded-sm opacity-50"
          />
        </div>
      </div>
    </div>
  );
};
