/* eslint-disable jsx-a11y/anchor-is-valid */
/*
================================================================================
ARQUIVO: src/components/home/CategorySidebar.js (CORRIGIDO E FUNCIONAL)
================================================================================
*/
import React, { useState, useEffect } from "react";
import { graphqlClient } from "../../api/client";
import { PlusCircle, MinusCircle } from "../shared/Icons";
import { Spinner } from "../ui/Spinner";

// Importe os ícones que você criou na pasta assets
import RoupasIcon from "../../assets/icons/dress.svg";
import CalcadosIcon from "../../assets/icons/shoes.svg";
import AcessoriosIcon from "../../assets/icons/glasses.svg";
import EletronicosIcon from "../../assets/icons/eletronic.png";
import EletrosIcon from "../../assets/icons/eletros.png";
import TvIcon from "../../assets/icons/tv.png";
import HobbieIcon from "../../assets/icons/tent.png";
import PerfumeIcon from "../../assets/icons/perfume.svg";
import MouseIcon from "../../assets/icons/mouse.png";
import DefaultIcon from "../../assets/icons/quotes.svg";

const iconMap = {
  roupas: RoupasIcon,
  calçados: CalcadosIcon,
  acessórios: AcessoriosIcon,
  eletrônicos: EletronicosIcon,
  perfumaria: PerfumeIcon,
  eletrodomésticos: EletrosIcon,
  televisores: TvIcon,
  lazer: HobbieIcon,
  periféricos: MouseIcon,
};

const CategoryIcon = ({ categoryName }) => {
  const iconSrc = iconMap[categoryName.toLowerCase()] || DefaultIcon;
  return (
    <img src={iconSrc} alt={`${categoryName} icon`} className="w-5 h-5 mr-3" />
  );
};

const AccordionItem = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200/50">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center p-4 text-left font-semibold transition-colors duration-200 ${
          isOpen
            ? "text-merqado-blue bg-merqado-blue-light"
            : "text-merqado-gray-dark hover:bg-merqado-blue-light/50"
        }`}
      >
        <div className="flex items-center">
          {icon}
          <span>{title}</span>
        </div>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <MinusCircle className="w-4 h-4" />
          ) : (
            <PlusCircle className="w-4 h-4" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="py-2 px-4">{children}</div>
      </div>
    </div>
  );
};

export const CategorySidebar = ({ onProductSelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      setLoading(true);
      try {
        const query = `
        query GetCategoriesWithProducts {
          categories(limit: 8) {
            categories {
              id
              name
              products {
                id
                name
              }
            }
          }
        }
      `;
        const data = await graphqlClient(query);

        const receivedCategories = data?.categories?.categories ?? [];
        setCategories(receivedCategories);
      } catch (error) {
        console.error("Erro ao buscar categorias para a sidebar:", error);
        setCategories([]); // fallback de segurança
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const handleToggle = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <aside className="w-full md:w-1/4 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg h-fit">
      <h2 className="text-xl font-bold text-merqado-gray-dark p-4 border-b border-gray-200/80">
        Categorias
      </h2>
      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : (
        <div>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <AccordionItem
                key={category.id}
                title={category.name}
                icon={<CategoryIcon categoryName={category.name} />}
                isOpen={openCategory === category.id}
                onToggle={() => handleToggle(category.id)}
              >
                {category.products && category.products.length > 0 ? (
                  <ul className="space-y-1 py-2">
                    {category.products.map((product) => (
                      <li key={product.id}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onProductSelect(product.id); // Ação de clique adicionada
                          }}
                          className="block px-4 py-2 rounded-md text-merqado-gray-dark/90 hover:bg-merqado-blue-light hover:text-merqado-blue font-medium transition-colors duration-150"
                        >
                          {product.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-sm text-merqado-gray-medium">
                    Nenhum produto nesta categoria.
                  </p>
                )}
              </AccordionItem>
            ))}
        </div>
      )}
    </aside>
  );
};
