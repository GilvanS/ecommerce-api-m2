/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { graphqlClient } from "../api/client";
import { Spinner } from "../components/ui/Spinner";
import { HeroSlider } from "../components/home/HeroSlider";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { CategorySidebar } from "../components/home/CategorySidebar";
import { ProductColumn } from "../components/home/ProductColumn";
import { ProductCardV2 } from "../components/products/ProductCardV2";
import { Pagination } from "../components/ui/Pagination";

export const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = `
                    query GetAllProductsForHome {
                        products {
                            id
                            name
                            description
                            price
                            imageUrl
                            is_new
                            is_trending
                            category {
                                name
                            }
                        }
                    }
                `;
        const data = await graphqlClient(query);
        if (data.products) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const { currentProducts, totalPages } = useMemo(() => {
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = allProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
    return { currentProducts, totalPages };
  }, [currentPage, allProducts]);

  const newArrivals = allProducts.filter((p) => p.is_new).slice(0, 3);
  const trending = allProducts.filter((p) => p.is_trending).slice(0, 3);
  const topRated = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <HeroSlider />
      <div className="container mx-auto px-4 my-12">
        <div className="flex flex-col md:flex-row gap-8">
          <CategorySidebar />
          <div className="w-full md:w-3/4">
            {loading && allProducts.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <ProductColumn title="Novidades" products={newArrivals} />
                <ProductColumn title="Tendências" products={trending} />
                <ProductColumn title="Mais Avaliados" products={topRated} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-merqado-gray-dark mb-8">
            Nossos Produtos
          </h2>
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProducts.map((p) => (
                  <ProductCardV2 key={p.id} product={p} />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
