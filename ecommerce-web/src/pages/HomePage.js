import React, { useState, useEffect } from "react";
import { graphqlClient } from "../../src/api/client";
import { HeroSlider } from "../components/home/HeroSlider";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { ProductCardV2 } from "../../src/components/products/ProductCardV2";
import { Spinner } from "../../src/components/ui/Spinner";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await graphqlClient(
          `query { products { id name description price imageUrl } }`
        );
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <HeroSlider />
      <CategoryCarousel />
      <div className="container mx-auto px-4 my-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nossos Produtos
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCardV2 key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
