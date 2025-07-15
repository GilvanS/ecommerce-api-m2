/*
================================================================================
ARQUIVO: src/components/home/HeroSlider.js (REATORADO)
================================================================================
*/
import React, { useState, useEffect } from "react";

// Dados dos banners. Em uma aplicação real, isso viria de uma API.
const banners = [
  {
    preTitle: "Tendências 2025",
    title: "Nova Coleção",
    subtitle: "Descubra os produtos que estão definindo o novo estilo.",
    buttonText: "Compre Agora",
    imageUrl:
      "https://i.postimg.cc/qRbsCSS9/assets-task-01k04p5tt0fkqbcs152neb6bk8-1752504225-img-0.png",
    primaryColor: "text-white",
    buttonColor: "bg-merqado-blue",
  },
  {
    preTitle: "Oferta Especial",
    title: "Eletrônicos com 30% OFF",
    subtitle: "Aproveite descontos incríveis em notebooks, mouses e teclados.",
    buttonText: "Ver Ofertas",
    imageUrl:
      "https://i.postimg.cc/CS3hDv7s/assets-task-01k04qc9gqfewb64p1z7b90nzx-1752505477-img-0.png",
    primaryColor: "text-white",
    buttonColor: "bg-merqado-orange",
  },
  {
    preTitle: "Frete Grátis",
    title: "Para Todo o Brasil",
    subtitle: "Em compras acima de R$ 99,00, o frete é por nossa conta.",
    buttonText: "Saiba Mais",
    imageUrl:
      "https://i.postimg.cc/1ypzY5Fn/assets-task-01k04jrka4esyt9wad10crdnfs-1752500835-img-0.png",
    primaryColor: "text-green-500",
    buttonColor: "bg-green-500",
  },
];

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efeito para alternar os banners automaticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
  }, []);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentBanner = banners[currentIndex];

  return (
    // Contêiner principal que alinha o carrossel com o resto do conteúdo
    <div className="container mx-auto px-4 mb-12">
      <div className="h-96 w-full relative overflow-hidden rounded-b-lg shadow-lg">
        {/* Container dos Banners */}
        <div className="w-full h-full relative">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={banner.imageUrl}
                className="w-full h-full object-cover"
                alt={banner.title}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>

        {/* Conteúdo de Texto Centralizado */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 z-10">
          <div className="max-w-lg">
            <p className={`font-semibold ${currentBanner.primaryColor}`}>
              {currentBanner.preTitle}
            </p>
            <h2 className="text-5xl font-bold my-4">{currentBanner.title}</h2>
            <p className="mb-6">{currentBanner.subtitle}</p>
            <button
              className={`${currentBanner.buttonColor} text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-opacity`}
            >
              {currentBanner.buttonText}
            </button>
          </div>
        </div>

        {/* Pontos de Navegação */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
