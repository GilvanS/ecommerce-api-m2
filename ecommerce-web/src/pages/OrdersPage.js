/*
================================================================================
ARQUIVO: src/pages/OrdersPage.js
================================================================================
*/
import React, { useState, useEffect } from "react";

// Importando o cliente GraphQL para buscar dados
import { graphqlClient } from "../api/client";

// Importando componentes de UI e utilitários
import { Spinner } from "../components/ui/Spinner";
import { formatCurrency, formatCEP, formatCPF } from "../utils/formatters";

// Importando Ícones
import { Package } from "../components/shared/Icons";

// Componente para exibir os detalhes de um único pedido
const OrderDetail = ({ order }) => {
  if (!order) {
    return (
      <div className="flex justify-center items-center h-full bg-white rounded-xl shadow-md text-slate-500">
        <p>Selecione um pedido para ver os detalhes</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-3">
        Detalhes do Pedido #{order.id}
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-slate-700">Itens</h3>
          <ul className="mt-2 space-y-2">
            {order.items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-10 w-10 object-cover rounded-md mr-3"
                  />
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                </div>
                <span>
                  {formatCurrency(item.price_at_purchase * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold text-slate-700">Endereço de Entrega</h3>
          <p className="text-sm text-slate-600 mt-1">
            {order.shipping_address.address}, {order.shipping_address.number}{" "}
            <br />
            {order.shipping_address.city},{" "}
            {formatCEP(order.shipping_address.cep)} <br />
            CPF: {formatCPF(order.shipping_address.cpf)}
          </p>
        </div>
        <div className="border-t pt-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-700">Pagamento</h3>
            <p className="text-sm text-slate-600 mt-1 capitalize">
              {order.payment_method.replace("_", " de ")}
            </p>
          </div>
          <div className="text-right">
            <h3 className="font-semibold text-slate-700">Total do Pedido</h3>
            <p className="text-xl font-bold text-pink-500">
              {formatCurrency(order.total_price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = `
                    query {
                        orders {
                            id
                            total_price
                            payment_method
                            shipping_address
                            created_at
                            items {
                                quantity
                                price_at_purchase
                                product {
                                    id
                                    name
                                    imageUrl
                                }
                            }
                        }
                    }
                `;
        const data = await graphqlClient(query);
        setOrders(data.orders);
        if (data.orders.length > 0) {
          setSelectedOrder(data.orders[0]); // Seleciona o primeiro pedido por padrão
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <Package className="w-8 h-8" />
        Meus Pedidos
      </h1>
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <p className="text-slate-600 text-lg">
            Você ainda não fez nenhum pedido.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna da Lista de Pedidos */}
          <div className="md:col-span-1">
            <ul className="space-y-3">
              {orders.map((order) => (
                <li key={order.id}>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedOrder?.id === order.id
                        ? "bg-indigo-50 border-indigo-500 shadow"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-semibold">Pedido #{order.id}</p>
                    <p className="text-sm text-slate-500">
                      Data:{" "}
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-sm font-medium text-slate-700 mt-1">
                      Total: {formatCurrency(order.total_price)}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Coluna de Detalhes do Pedido */}
          <div className="md:col-span-2">
            <OrderDetail order={selectedOrder} />
          </div>
        </div>
      )}
    </div>
  );
};
