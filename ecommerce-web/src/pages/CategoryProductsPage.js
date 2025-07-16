import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { graphqlClient } from "../api/client";
import { ProductCardV2 } from "../components/products/ProductCardV2";

export const CategoryProductsPage = ({ categoryId, onProductSelect }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `
        query GetProducts($categoryId: ID) {
          products(categoryId: $categoryId) {
            products {
              id
              name
              price
              imageUrl
            }
          }
        }
      `;
      const data = await graphqlClient(query, { categoryId: id });
      setProducts(data.products.products);
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Produtos da Categoria {categoryId}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCardV2
            key={product.id}
            product={product}
            onProductSelect={onProductSelect} // PASSA AQUI!!!
          />
        ))}
      </div>
    </div>
  );
};
