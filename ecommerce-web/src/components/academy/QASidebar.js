/*
================================================================================
ARQUIVO: src/components/academy/QASidebar.js (ATUALIZADO)
================================================================================
*/
import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { QAAccordion } from "./QAAccordion";
import { Spinner } from "../ui/Spinner";
import { X, ChevronLeft } from "../shared/Icons";

export const QASidebar = ({ isOpen, onClose }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicContent, setTopicContent] = useState("");
  const [contentLoading, setContentLoading] = useState(false);

  // Busca o "mapa" de conteúdo do arquivo index.json
  useEffect(() => {
    const fetchContentIndex = async () => {
      setLoading(true);
      try {
        const response = await fetch("/academic-content/index.json");
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error("Erro ao buscar o índice de conteúdo acadêmico:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchContentIndex();
    }
  }, [isOpen]);

  // Função para lidar com a seleção de um tópico
  const handleTopicSelect = useCallback(async (topic) => {
    setContentLoading(true);
    setSelectedTopic(topic);
    try {
      const response = await fetch(`/academic-content/${topic.file}`);
      const markdown = await response.text();
      setTopicContent(markdown);
    } catch (error) {
      console.error(`Erro ao carregar o conteúdo de ${topic.file}:`, error);
      setTopicContent("Não foi possível carregar o conteúdo deste tópico.");
    } finally {
      setContentLoading(false);
    }
  }, []);

  const handleBack = () => {
    setSelectedTopic(null);
    setTopicContent("");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-30 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-md bg-gray-800/80 backdrop-blur-md shadow-2xl transition-transform duration-500 ease-in-out z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/20 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">QA Academy</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          {selectedTopic ? (
            // Vista de Conteúdo do Tópico
            <div className="p-6 text-white">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-4"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar aos Módulos
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedTopic.title}</h3>
              {contentLoading ? (
                <Spinner />
              ) : (
                <div className="prose prose-invert">
                  <ReactMarkdown children={topicContent} />
                </div>
              )}
            </div>
          ) : (
            // Vista da Lista de Módulos
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner />
                </div>
              ) : (
                modules.map((module) => (
                  <QAAccordion
                    key={module.id}
                    module={module}
                    onTopicSelect={handleTopicSelect}
                    completedTopics={[]}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
