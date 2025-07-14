/* eslint-disable no-unused-vars */
/*
================================================================================
ARQUIVO: src/pages/CheckoutPage.js
================================================================================
*/
import React, { useState } from "react";

// Importando contextos e hooks
import { useCart } from "../../src/context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import { useForm } from "../../src/hooks/useForm";
import { apiClient } from "../../src/api/client";

// Importando componentes de UI e utilitários
import { Input } from "../../src/components/ui/Input";
import { Spinner } from "../../src/components/ui/Spinner";
import {
  formatCurrency,
  formatCPF,
  formatCEP,
  formatCardNumber,
  formatExpiryDate,
} from "../../src/utils/formatters";
import { validateCPF } from "../../src/utils/validators";

// Importando Ícones
import { CreditCard, Barcode, QrCode, Copy } from "../components/shared/Icons";

export const CheckoutPage = ({ setPage }) => {
  const { cart, total, clearCart } = useCart();
  const { userProfile } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Configuração do hook de formulário com validações
  const { values, errors, handleInputChange, isFormValid } = useForm(
    {
      cpf: "",
      address: "",
      number: "",
      complement: "",
      cep: "",
      city: "",
      card_number: "",
      card_name: "",
      card_expiry: "",
      card_cvv: "",
    },
    {
      cpf: {
        required: true,
        mask: formatCPF,
        validator: validateCPF,
        errorMessage: "CPF inválido.",
      },
      address: { required: true },
      number: { required: true },
      cep: { required: true, mask: formatCEP },
      city: { required: true },
      card_number: {
        required: paymentMethod === "credit_card",
        mask: formatCardNumber,
      },
      card_name: { required: paymentMethod === "credit_card" },
      card_expiry: {
        required: paymentMethod === "credit_card",
        mask: formatExpiryDate,
      },
      card_cvv: { required: paymentMethod === "credit_card" },
    }
  );

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Por favor, corrija os erros no formulário antes de continuar.");
      return;
    }

    setIsProcessing(true);

    const shippingAddress = {
      cpf: values.cpf,
      address: values.address,
      number: values.number,
      complement: values.complement,
      cep: values.cep,
      city: values.city,
    };

    const orderData = {
      cart,
      paymentMethod,
      shippingAddress,
    };

    try {
      await apiClient.post("/orders", orderData);
      clearCart();
      setPage("success");
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert("Não foi possível finalizar o pedido. Tente novamente mais tarde.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Finalizar Compra
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal com os Formulários */}
        <div className="lg:col-span-2">
          <form onSubmit={handleCheckout} className="space-y-8" noValidate>
            {/* Formulário de Endereço */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    name="cpf"
                    value={values.cpf}
                    onChange={handleInputChange}
                    placeholder="CPF"
                    error={errors.cpf}
                    maxLength="14"
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                    placeholder="Endereço"
                    error={errors.address}
                  />
                </div>
                <Input
                  name="number"
                  value={values.number}
                  onChange={handleInputChange}
                  placeholder="Número"
                  error={errors.number}
                />
                <Input
                  name="complement"
                  value={values.complement}
                  onChange={handleInputChange}
                  placeholder="Complemento"
                  error={errors.complement}
                />
                <Input
                  name="cep"
                  value={values.cep}
                  onChange={handleInputChange}
                  placeholder="CEP"
                  error={errors.cep}
                  maxLength="9"
                />
                <Input
                  name="city"
                  value={values.city}
                  onChange={handleInputChange}
                  placeholder="Cidade"
                  error={errors.city}
                />
              </div>
            </div>

            {/* Formulário de Pagamento */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Pagamento</h2>
              <div className="flex space-x-4 border-b mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit_card")}
                  className={`flex items-center space-x-2 p-3 border-b-2 ${
                    paymentMethod === "credit_card"
                      ? "border-merqado-orange text-merqado-orange-dark"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  <CreditCard />
                  <span>Cartão</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("boleto")}
                  className={`flex items-center space-x-2 p-3 border-b-2 ${
                    paymentMethod === "boleto"
                      ? "border-merqado-orange text-merqado-orange-dark"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  <Barcode />
                  <span>Boleto</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex items-center space-x-2 p-3 border-b-2 ${
                    paymentMethod === "pix"
                      ? "border-merqado-orange text-merqado-orange-dark"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  <QrCode />
                  <span>PIX</span>
                </button>
              </div>
              {paymentMethod === "credit_card" && (
                <div className="space-y-4">
                  <Input
                    name="card_number"
                    value={values.card_number}
                    onChange={handleInputChange}
                    placeholder="Número do Cartão"
                    error={errors.card_number}
                    maxLength="19"
                  />
                  <Input
                    name="card_name"
                    value={values.card_name}
                    onChange={handleInputChange}
                    placeholder="Nome no Cartão"
                    error={errors.card_name}
                  />
                  <div className="flex space-x-4">
                    <Input
                      name="card_expiry"
                      value={values.card_expiry}
                      onChange={handleInputChange}
                      placeholder="Validade (MM/AA)"
                      error={errors.card_expiry}
                      maxLength="5"
                    />
                    <Input
                      name="card_cvv"
                      value={values.card_cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      error={errors.card_cvv}
                      maxLength="4"
                    />
                  </div>
                </div>
              )}
              {paymentMethod === "boleto" && (
                <div className="text-center p-4 bg-slate-100 rounded-md">
                  <p>
                    O boleto será gerado e enviado para o seu e-mail após a
                    finalização do pedido.
                  </p>
                </div>
              )}
              {paymentMethod === "pix" && (
                <div className="text-center p-4 bg-slate-100 rounded-md space-y-3">
                  <p>Pague com PIX para aprovação imediata.</p>
                  <QrCode className="h-32 w-32 mx-auto text-slate-800" />
                  <div className="flex items-center justify-center">
                    <input
                      readOnly
                      value="00020126580014br.gov.bcb.pix..."
                      className="text-sm p-2 bg-slate-200 rounded-l-md w-2/3"
                    />
                    <button
                      type="button"
                      className="bg-indigo-500 text-white p-2 rounded-r-md hover:bg-indigo-600"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-merqado-orange text-white font-bold py-4 rounded-lg text-lg hover:bg-merqado-orange-dark disabled:bg-merqado-orange-light flex justify-center items-center"
            >
              {isProcessing ? <Spinner /> : `Pagar ${formatCurrency(total)}`}
            </button>
          </form>
        </div>

        {/* Coluna de Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-3">
              Resumo do Pedido
            </h2>
            <div className="space-y-2 mt-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-slate-800">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600">Total</span>
                <span className="text-slate-900 text-lg">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
