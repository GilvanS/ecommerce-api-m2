/* eslint-disable no-unused-vars */
/*
================================================================================
ARQUIVO: src/pages/HomePage.js (CORRIGIDO)
================================================================================
*/
import React, { useState, useEffect, useMemo } from "react";
import { graphqlClient } from "../api/client";
import { Spinner } from "../components/ui/Spinner";
import { HeroSlider } from "../components/home/HeroSlider";
import { CategorySidebar } from "../components/home/CategorySidebar";
import { ProductColumn } from "../components/home/ProductColumn";
import { ProductCardV2 } from "../components/products/ProductCardV2";
import { Pagination } from "../components/ui/Pagination";

export const HomePage = ({ onProductSelect, onCategorySelect, setPage }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState({
    newArrivals: [],
    trending: [],
    topRated: [],
    all: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // CORREÇÃO: A query agora acessa a lista 'products' dentro do tipo paginado
        const query = `
                    query GetHomepageProducts($page: Int, $limit: Int) {
                        products(page: $page, limit: $limit) {
                            products {
                                id
                                name
                                description
                                price
                                discount_price
                                category_id
                                imageUrl
                                is_new
                                is_trending
                                category { 
                                    name
                                }
                            }
                            totalPages
                        }
                    }
                `;
        const data = await graphqlClient(query, {
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
        });
        if (data.products) {
          setAllProducts(data.products.products || []);
          setTotalPages(data.products.totalPages || 1);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  // A lógica de filtragem permanece a mesma
  const newArrivals = allProducts.filter((p) => p.is_new).slice(0, 3);
  const trending = allProducts.filter((p) => p.is_trending).slice(0, 3);
  const topRated = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <HeroSlider setPage={setPage} />
      <div className="container mx-auto px-4 my-12">
        <div className="flex flex-col md:flex-row gap-8">
          <CategorySidebar onProductSelect={onProductSelect} />
          <div className="w-full md:w-3/4">
            {loading && allProducts.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <ProductColumn
                  title="Novidades"
                  products={newArrivals}
                  onProductSelect={onProductSelect}
                  setPage={setPage}
                />
                <ProductColumn
                  title="Tendências"
                  products={trending}
                  onProductSelect={onProductSelect}
                  setPage={setPage}
                />
                <ProductColumn
                  title="Mais Avaliados"
                  products={topRated}
                  onProductSelect={onProductSelect}
                  setPage={setPage}
                />
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
                {allProducts.map((p) => (
                  <ProductCardV2
                    key={p.id}
                    product={p}
                    onProductSelect={onProductSelect}
                  />
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
