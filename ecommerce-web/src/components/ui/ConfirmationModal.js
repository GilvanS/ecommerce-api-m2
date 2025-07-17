import React from "react";
import { AlertTriangle } from "../shared/Icons";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Ação",
  message = "Você tem certeza que deseja prosseguir com esta ação? Ela não pode ser desfeita.",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60] p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <h3
          className="text-lg leading-6 font-bold text-merqado-gray-dark mt-4"
          id="modal-title"
        >
          {title}
        </h3>

        <div className="mt-2">
          <p className="text-sm text-merqado-gray-dark/80">{message}</p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-md font-semibold text-merqado-gray-dark bg-merqado-gray-light hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-6 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700"
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
};
