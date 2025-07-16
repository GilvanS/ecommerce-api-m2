/*
================================================================================
ARQUIVO: src/components/ui/Tabs.js (NOVO)
================================================================================
*/
import React, { useState } from "react";

export const Tabs = ({ items }) => {
  // O estado começa com o 'id' da primeira aba como ativo
  const [activeTab, setActiveTab] = useState(items[0]?.id);

  // Encontra o conteúdo da aba ativa para ser exibido
  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Container dos botões das abas */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === item.id
                    ? "border-merqado-blue text-merqado-blue"
                    : "border-transparent text-merqado-gray-medium hover:text-merqado-gray-dark hover:border-gray-300"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo da aba ativa */}
      <div className="py-6">{activeContent}</div>
    </div>
  );
};
