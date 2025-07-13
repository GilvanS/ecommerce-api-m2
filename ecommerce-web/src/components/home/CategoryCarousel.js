import React, { useState, useEffect, useRef } from "react";

// Importando o cliente GraphQL para buscar dados
import { graphqlClient } from "../../api/client";

// Importando Ícones
import { ChevronLeft, ChevronRight } from "../shared/Icons";

export const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
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
        console.error("Erro ao buscar categorias para o carrossel", error);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // A quantidade de pixels a rolar
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth pb-4"
          // Esconde a barra de scroll
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 w-48 h-32 relative overflow-hidden rounded-lg group cursor-pointer shadow-md"
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Esquerdo */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10 transition-opacity"
        >
          <ChevronLeft />
        </button>

        {/* Botão Direito */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10 transition-opacity"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
