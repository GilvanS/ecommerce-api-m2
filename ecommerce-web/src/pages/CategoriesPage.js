/*
================================================================================
ARQUIVO: src/pages/CategoriesPage.js
================================================================================
*/
import React, { useState, useEffect } from "react";

// Importando o cliente GraphQL para buscar dados
import { graphqlClient } from "../../src/api/client";

// Importando componentes de UI
import { Spinner } from "../components/ui/Spinner";

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Query GraphQL para buscar todas as categorias
        const query = `
                    query {
                        categories {
                            id
                            name
                            image_url
                        }
                    }
                `;
        const data = await graphqlClient(query);
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Exibe um spinner enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Todas as Categorias
      </h1>

      {categories.length === 0 ? (
        // Mensagem exibida se nenhuma categoria for encontrada
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <p className="text-slate-600 text-lg">
            Nenhuma categoria encontrada.
          </p>
        </div>
      ) : (
        // Grid com as categorias encontradas
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
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
      )}
    </div>
  );
};
