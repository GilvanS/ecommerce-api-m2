import React from "react";
import { CheckCircle } from "../shared/Icons";

export const NotificationModal = ({ isOpen, title, message, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center animate-fade-in-up">
        <CheckCircle className="h-16 w-16 mx-auto text-merqado-blue" />
        <h2 className="text-2xl font-bold text-merqado-gray-dark mt-4">
          {title}
        </h2>
        <p className="text-merqado-gray-dark/80 my-4">{message}</p>
        <button
          onClick={onConfirm}
          className="w-full mt-4 bg-merqado-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-merqado-blue-dark transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};
