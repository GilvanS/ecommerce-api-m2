import React, { useState, useEffect } from "react";
import { graphqlClient } from "../api/client";
import { Spinner } from "../components/ui/Spinner";
import { ProductCardV2 } from "../components/products/ProductCardV2";

export const CategoryProductsPage = ({ categoryId, onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        // Query corrigida para buscar produtos por categoryId
        const query = `
                    query GetProductsByCategory($categoryId: ID!) {
                        products(categoryId: $categoryId) {
                            products {
                                id
                                name
                                price
                                imageUrl
                                is_new
                                category {
                                    name
                                }
                            }
                        }
                    }
                `;
        const data = await graphqlClient(query, { categoryId });
        const productList = data.products?.products || [];
        setProducts(productList);

        // Define o nome da categoria a partir do primeiro produto encontrado
        if (productList.length > 0) {
          setCategoryName(productList[0].category.name);
        }
      } catch (error) {
        console.error(
          `Erro ao buscar produtos para a categoria ${categoryId}`,
          error
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

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
        Categoria: {categoryName || "..."}
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCardV2
              key={p.id}
              product={p}
              onProductSelect={onProductSelect}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-600 text-center text-lg mt-10">
          Nenhum produto encontrado nesta categoria.
        </p>
      )}
    </div>
  );
};
