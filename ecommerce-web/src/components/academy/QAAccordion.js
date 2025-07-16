/*
================================================================================
ARQUIVO: src/components/academy/QAAccordion.js (NOVO)
================================================================================
*/
import React, { useState } from "react";
import { ChevronRight } from "../shared/Icons";

export const QAAccordion = ({ module, onTopicSelect, completedTopics }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20">
      {/* Botão do Módulo Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-white transition-colors duration-200 hover:bg-white/10"
      >
        <div className="flex items-center">
          {/* O ícone do módulo será adicionado aqui no futuro */}
          <span className="ml-2">{module.title}</span>
        </div>
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>

      {/* Lista de Tópicos (conteúdo do acordeão) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="py-2 pl-6 pr-4">
          {module.topics.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => onTopicSelect(topic)}
                className="w-full text-left flex items-center p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={completedTopics.includes(topic.id)}
                  className="h-4 w-4 rounded border-gray-300 text-merqado-blue focus:ring-merqado-blue mr-3"
                />
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
