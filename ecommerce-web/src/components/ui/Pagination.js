/*
================================================================================
ARQUIVO: src/components/ui/Pagination.js (NOVO)
================================================================================
*/
import React from "react";
import { ChevronLeft, ChevronRight } from "../shared/Icons";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Lógica para gerar os números de página a serem exibidos
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Mostra sempre a primeira página
    if (totalPages > 0) pageNumbers.push(1);

    // Adiciona "..." se a página atual estiver longe do início
    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // Adiciona as páginas ao redor da página atual
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    // Adiciona "..." se a página atual estiver longe do final
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    // Mostra sempre a última página
    if (totalPages > 1) pageNumbers.push(totalPages);

    return [...new Set(pageNumbers)]; // Remove duplicatas
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2 mt-8"
      aria-label="Pagination"
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-merqado-blue-light"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-md font-semibold transition-colors ${
              currentPage === page
                ? "bg-merqado-blue text-white shadow-md"
                : "bg-white text-merqado-gray-dark hover:bg-merqado-blue-light"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-1 text-merqado-gray-medium"
          >
            ...
          </span>
        )
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-merqado-blue-light"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};
