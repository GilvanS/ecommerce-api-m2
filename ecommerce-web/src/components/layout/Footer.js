/* eslint-disable jsx-a11y/anchor-is-valid */
/*
================================================================================
ARQUIVO: src/components/layout/Footer.js
================================================================================
*/
import React from "react";

// Importando componentes, se necessário (neste caso, a Logo)
import { Logo } from "../shared/LogoFooter";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Coluna da Marca */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400">
              A sua loja de confiança para encontrar os melhores produtos com a
              melhor qualidade.
            </p>
          </div>

          {/* Coluna de Categorias Populares */}
          <div>
            <h4 className="font-semibold mb-4">Categorias Populares</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Eletrônicos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Roupas Femininas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Roupas Masculinas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Cosméticos
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna de Links da Empresa */}
          <div>
            <h4 className="font-semibold mb-4">Nossa Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Termos e Condições
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-merqado-orange">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna de Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>Rua Exemplo, 123, São Paulo, SP</p>
              <p>Email: contato@anon.com</p>
              <p>Telefone: (11) 99999-9999</p>
            </address>
          </div>
        </div>

        {/* Seção de Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Anon. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
