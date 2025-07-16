/*
================================================================================
ARQUIVO: src/components/shared/ProductsCarousel.js (NOVO)
================================================================================
*/
import React, { useRef } from "react";
import { ProductCardV2 } from "../products/ProductCardV2";
import { ChevronLeft, ChevronRight } from "./Icons";

export const ProductsCarousel = ({ title, products, onProductSelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  if (!products || products.length === 0) {
    return null; // Não renderiza nada se não houver produtos
  }

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-merqado-gray-dark">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white shadow-md hover:bg-merqado-gray-light"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white shadow-md hover:bg-merqado-gray-light"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex space-x-8 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="w-80 flex-shrink-0">
            <ProductCardV2
              product={product}
              onProductSelect={onProductSelect}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
