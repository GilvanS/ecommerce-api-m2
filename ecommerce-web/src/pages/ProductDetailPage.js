import React, { useState, useEffect } from "react";
import { graphqlClient } from "../api/client";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Spinner } from "../components/ui/Spinner";
import {
  Star,
  Heart,
  PlusCircle,
  MinusCircle,
} from "../components/shared/Icons";
import { formatCurrency } from "../utils/formatters";

// --- Subcomponentes da Página de Detalhes ---

// Galeria de Imagens (Coluna da Esquerda)
const ImageGallery = ({ product }) => (
  <div className="w-full md:w-1/2">
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
    {/* Thumbnails podem ser adicionadas aqui no futuro */}
  </div>
);

// Seletor de Quantidade
const QuantitySelector = ({ quantity, setQuantity }) => (
  <div className="flex items-center space-x-3">
    <button
      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
      className="p-2 border rounded-md hover:bg-gray-100"
    >
      <MinusCircle className="w-4 h-4" />
    </button>
    <span className="font-bold text-lg w-10 text-center">{quantity}</span>
    <button
      onClick={() => setQuantity((q) => q + 1)}
      className="p-2 border rounded-md hover:bg-gray-100"
    >
      <PlusCircle className="w-4 h-4" />
    </button>
  </div>
);

// --- Componente Principal da Página ---

export const ProductDetailPage = ({ productId, setPage }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const query = `
                    query GetProductById($id: ID!) {
                        product(id: $id) {
                            id
                            name
                            description
                            price
                            imageUrl
                            stock
                            category {
                                name
                            }
                        }
                    }
                `;
        const data = await graphqlClient(query, { id: productId });
        setProduct(data.product);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Produto não encontrado.</p>
      </div>
    );
  }

  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity}x ${product.name} adicionado(s) ao carrinho!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Coluna da Esquerda: Imagem */}
        <ImageGallery product={product} />

        {/* Coluna da Direita: Informações e Ações */}
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-sm text-merqado-gray-medium">
            {product.category?.name || "Categoria"}
          </p>
          <h1 className="text-4xl font-bold text-merqado-gray-dark">
            {product.name}
          </h1>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-sm text-merqado-gray-medium">
              (58 avaliações)
            </span>
          </div>
          <p className="text-4xl font-bold text-merqado-blue">
            {formatCurrency(product.price)}
          </p>
          <p className="text-merqado-gray-dark/90 pb-4 border-b">
            {product.description}
          </p>

          <div className="flex items-center space-x-6 py-4">
            <p className="font-semibold">Quantidade:</p>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-merqado-orange text-white font-bold py-4 px-8 rounded-lg hover:bg-opacity-90 transition-opacity"
            >
              Adicionar ao Carrinho
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              className={`flex items-center justify-center gap-2 border-2 px-6 py-3 rounded-lg transition-colors ${
                favorited
                  ? "border-merqado-orange text-merqado-orange bg-merqado-orange/10"
                  : "border-gray-300 text-gray-600 hover:border-merqado-orange hover:text-merqado-orange"
              }`}
            >
              <Heart className={`w-6 h-6 ${favorited ? "fill-current" : ""}`} />
              <span>{favorited ? "Favoritado" : "Favoritar"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Detalhes Adicionais (Tabs) pode ser adicionada aqui no futuro */}
    </div>
  );
};
