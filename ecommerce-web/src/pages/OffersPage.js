import React, { useState, useEffect } from "react";
import { graphqlClient } from "../api/client";
import { Spinner } from "../components/ui/Spinner";
import { ProductsCarousel } from "../components/shared/ProductsCarousel";
import { Package } from "../components/shared/Icons";

export const OffersPage = ({ onProductSelect }) => {
  const [sections, setSections] = useState({
    newArrivals: [],
    trending: [],
    onSale: [],
    topRated: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOffers = async () => {
      setLoading(true);
      try {
        const newArrivalsQuery = `query { products(is_new: true, limit: 10) { products { id name price discount_price imageUrl category { name } is_new } } }`;
        const trendingQuery = `query { products(is_trending: true, limit: 10) { products { id name price discount_price imageUrl category { name } is_new } } }`;
        const onSaleQuery = `query { products(onSale: true, limit: 10) { products { id name price discount_price imageUrl category { name } is_new } } }`;
        const topRatedQuery = `query { products(sortBy: "rating_desc", limit: 10) { products { id name price discount_price imageUrl category { name } is_new } } }`;

        // Executa todas as consultas em paralelo
        const [newArrivalsData, trendingData, onSaleData, topRatedData] =
          await Promise.all([
            graphqlClient(newArrivalsQuery),
            graphqlClient(trendingQuery),
            graphqlClient(onSaleQuery),
            graphqlClient(topRatedQuery),
          ]);

        setSections({
          newArrivals: newArrivalsData.products.products,
          trending: trendingData.products.products,
          onSale: onSaleData.products.products,
          topRated: topRatedData.products.products,
        });
      } catch (error) {
        console.error("Erro ao buscar seções de ofertas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOffers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-merqado-gray-dark mb-8 flex items-center gap-3">
        <Package className="w-8 h-8" />
        Ofertas Especiais
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-8">
          <ProductsCarousel
            title="Novidades"
            products={sections.newArrivals}
            onProductSelect={onProductSelect}
          />
          <ProductsCarousel
            title="Em Tendência"
            products={sections.trending}
            onProductSelect={onProductSelect}
          />
          <ProductsCarousel
            title="Promoções"
            products={sections.onSale}
            onProductSelect={onProductSelect}
          />
          <ProductsCarousel
            title="Mais Avaliados"
            products={sections.topRated}
            onProductSelect={onProductSelect}
          />
        </div>
      )}
    </div>
  );
};
