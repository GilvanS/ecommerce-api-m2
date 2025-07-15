import React, { useState, useEffect, useMemo } from "react";

// Importando o cliente GraphQL para buscar dados
import { graphqlClient } from "../api/client";

// Importando componentes de UI
import { Spinner } from "../components/ui/Spinner";
import { Pagination } from "../components/ui/Pagination"; // Importando o componente de paginação

export const CategoriesPage = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const CATEGORIES_PER_PAGE = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const query = `
          query {
            categories {
              categories {
                id
                name
                image_url
              }
            }
          }
        `;
        const data = await graphqlClient(query);
        if (data.categories?.categories) {
          setAllCategories(data.categories.categories);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Lógica para calcular as categorias da página atual e o total de páginas
  const { currentCategories, totalPages } = useMemo(() => {
    const indexOfLastCategory = currentPage * CATEGORIES_PER_PAGE;
    const indexOfFirstCategory = indexOfLastCategory - CATEGORIES_PER_PAGE;
    const currentCategories = allCategories.slice(
      indexOfFirstCategory,
      indexOfLastCategory
    );
    const totalPages = Math.ceil(allCategories.length / CATEGORIES_PER_PAGE);
    return { currentCategories, totalPages };
  }, [currentPage, allCategories]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-merqado-gray-dark mb-8">
        Todas as Categorias
      </h1>

      {currentCategories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <p className="text-slate-600 text-lg">
            Nenhuma categoria encontrada.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentCategories.map((cat) => (
              <div
                key={cat.id}
                className="relative overflow-hidden rounded-lg group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">{cat.name}</h3>
                </div>
              </div>
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
  );
};
