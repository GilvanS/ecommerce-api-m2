import React from "react";

// Importando o contexto do carrinho para acessar os dados
import { useCart } from "../../src/context/CartContext";

// Importando componentes de UI e utilitários
import { formatCurrency } from "../../src/utils/formatters";

// Importando Ícones
import {
  ShoppingBag,
  MinusCircle,
  PlusCircle,
  Trash2,
} from "../components/shared/Icons";

export const CartPage = ({ setPage }) => {
  const { cart, total, updateItemQuantity, removeItem } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8" />
          Seu Carrinho
        </h1>
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <p className="text-slate-600 text-lg">Seu carrinho está vazio.</p>
          <button
            onClick={() => setPage("home")}
            className="mt-4 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8" />
        Seu Carrinho
      </h1>
      <div className="bg-white rounded-xl shadow-md">
        <ul className="divide-y divide-slate-200">
          {cart.map((item) => (
            <li
              key={item.id}
              className="p-6 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-lg text-slate-800">
                    {item.name}
                  </h4>
                  <p className="text-slate-500">{formatCurrency(item.price)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                    className="text-slate-500 hover:text-red-500 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <MinusCircle className="h-6 w-6" />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                    className="text-slate-500 hover:text-green-500"
                  >
                    <PlusCircle className="h-6 w-6" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-6 bg-slate-50 rounded-b-xl flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-slate-600 text-lg">Total</p>
            <p className="text-3xl font-bold text-pink-500">
              {formatCurrency(total)}
            </p>
          </div>
          <button
            onClick={() => setPage("checkout")}
            className="w-full md:w-auto bg-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
