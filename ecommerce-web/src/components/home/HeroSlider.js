import React from "react";

export const HeroSlider = () => {
  return (
    <div className="bg-gray-100 h-96 flex items-center justify-center mb-12">
      <div className="text-center">
        <p className="text-pink-500 font-semibold">Tendências 2025</p>
        <h2 className="text-5xl font-bold text-gray-800 my-4">Nova Coleção</h2>
        <p className="text-gray-600 mb-6">
          Descubra os produtos que estão definindo o novo estilo.
        </p>
        <button className="bg-pink-500 text-white font-bold py-3 px-8 rounded-md hover:bg-pink-600 transition-colors">
          Compre Agora
        </button>
      </div>
    </div>
  );
};
