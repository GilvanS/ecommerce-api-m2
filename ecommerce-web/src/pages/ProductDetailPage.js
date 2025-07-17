/*
================================================================================
ARQUIVO: src/pages/ProductDetailPage.js (NOVO E COMPLETO)
================================================================================
*/
import React, { useState, useEffect } from "react";
import { graphqlClient } from "../api/client";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Spinner } from "../components/ui/Spinner";
import { ImageGallery } from "../components/products/ImageGallery";
import { QuantitySelector } from "../components/ui/QuantitySelector";
import { Tabs } from "../components/ui/Tabs";
import { Star, Heart } from "../components/shared/Icons";
import { formatCurrency } from "../utils/formatters";

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
                            discount_price
                            stock
                            imageUrl
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
  };

  // Prepara o conteúdo para as abas
  const tabItems = [
    {
      id: "description",
      label: "Descrição",
      content: (
        <p className="text-merqado-gray-dark/90 leading-relaxed">
          {product.description}
        </p>
      ),
    },
    {
      id: "specs",
      label: "Especificações",
      content: (
        <p className="text-merqado-gray-dark/90">
          Detalhes técnicos do produto apareceriam aqui.
        </p>
      ),
    },
    {
      id: "reviews",
      label: "Avaliações",
      content: (
        <p className="text-merqado-gray-dark/90">
          A seção de avaliações dos clientes apareceria aqui.
        </p>
      ),
    },
  ];
  const hasDiscount =
    product.discount_price && product.discount_price < product.price;
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Coluna da Esquerda: Imagem */}
          <ImageGallery product={product} />

          {/* Coluna da Direita: Informações e Ações */}
          <div className="w-full md:w-1/2 pt-4">
            <div className="space-y-4">
              <p className="text-sm text-merqado-gray-medium font-semibold uppercase">
                {product.category?.name || "Categoria"}
              </p>
              <h1 className="text-4xl font-bold text-merqado-gray-dark">
                {product.name}
              </h1>

              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-sm text-merqado-gray-medium">
                  (58 avaliações)
                </span>
              </div>

              <div>
                {hasDiscount ? (
                  <div className="flex items-center gap-4">
                    <p className="text-2xl text-merqado-gray-medium line-through">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-4xl font-bold text-merqado-orange">
                      {formatCurrency(product.discount_price)}
                    </p>
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-merqado-blue">
                    {formatCurrency(product.price)}
                  </p>
                )}
              </div>

              <p className="text-merqado-gray-dark/90 pb-4 border-b border-gray-200">
                {product.description.substring(0, 150)}...
              </p>

              <div className="flex items-center space-x-6 py-4">
                <p className="font-semibold text-merqado-gray-dark">
                  Quantidade:
                </p>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={product.stock}
                />
                <p className="text-sm text-merqado-gray-medium">
                  {product.stock} disponíveis
                </p>
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
                  <Heart
                    className={`w-6 h-6 ${favorited ? "fill-current" : ""}`}
                  />
                  <span>{favorited ? "Favoritado" : "Favoritar"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Detalhes Adicionais com Abas */}
        <div className="mt-16">
          <Tabs items={tabItems} />
        </div>
      </div>
    </div>
  );
};
