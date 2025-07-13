import React from "react";
import logoMerqado from "../../assets/img/logo-merqado.webp";
export const Logo = ({ size = "md" }) => {
  // Define o tamanho da imagem com base na prop
  const sizeClass = size === "lg" ? "h-40" : "h-10";

  return (
    <div className="flex items-center justify-center">
      <img
        src={logoMerqado}
        alt="MerQAdo Logo"
        className={`${sizeClass} w-auto`}
      />
    </div>
  );
};
