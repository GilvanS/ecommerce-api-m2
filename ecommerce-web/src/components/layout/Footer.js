/* eslint-disable jsx-a11y/anchor-is-valid */
/*
================================================================================
ARQUIVO: src/components/layout/Footer.js (ATUALIZADO)
================================================================================
*/
import React from "react";
import { Logo } from "../shared/LogoFooter";

export const Footer = () => {
  // URLs para as imagens das bandeiras e métodos de pagamento
  const paymentMethods = [
    {
      name: "Visa",
      url: "https://img.shields.io/badge/Visa-1A1F71?style=for-the-badge&logo=visa&logoColor=white",
    },
    {
      name: "Mastercard",
      url: "https://img.shields.io/badge/Mastercard-EB001B?style=for-the-badge&logo=mastercard&logoColor=white",
    },
    {
      name: "Pix",
      url: "https://img.shields.io/badge/Pix-32BCAD?style=for-the-badge&logo=pix&logoColor=white",
    },
    {
      name: "Boleto",
      url: "https://img.shields.io/badge/Boleto-000?style=for-the-badge&logo=barcode&logoColor=white",
    },
  ];

  return (
    <footer className="bg-merqado-gray-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Coluna da Logo */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-merqado-gray-medium max-w-xs">
              A sua loja de confiança para encontrar os melhores produtos com a
              melhor qualidade.
            </p>
          </div>

          {/* Coluna de Links */}
          <div>
            <h4 className="font-semibold mb-4">Nossa Empresa</h4>
            <ul className="space-y-2 text-merqado-gray-medium">
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
            </ul>
          </div>

          {/* Coluna de Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <address className="not-italic text-merqado-gray-medium space-y-2">
              <p>Rua Exemplo, 123, São Paulo, SP</p>
              <p>Email: contato@merqado.com</p>
            </address>
          </div>

          {/* NOVA Coluna de Formas de Pagamento */}
          <div>
            <h4 className="font-semibold mb-4">Formas de Pagamento</h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <img
                  key={method.name}
                  src={method.url}
                  alt={method.name}
                  className="h-6 rounded-sm"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-merqado-gray-medium">
          <p>&copy; 2025 MerQAdo Livre. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
