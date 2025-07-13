import React, { useState, useEffect, useCallback } from "react";

// Importando o cliente GraphQL para buscar dados e o cliente REST para mutações
import { graphqlClient, apiClient } from "../api/client";

// Importando contextos e hooks
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

// Importando componentes de UI e utilitários
import { Spinner } from "../components/ui/Spinner";
import { Input } from "../components/ui/Input";
import { formatCurrency } from "../utils/formatters";

// Importando Ícones
import {
  Shield,
  PlusCircle,
  Trash2,
  Edit,
  X,
} from "../components/shared/Icons";

// Componente do Modal para Adicionar/Editar Produto
const ProductFormModal = ({ product, onClose, onSave }) => {
  const { values, errors, handleInputChange, isFormValid, setValues } = useForm(
    {
      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
      category_id: "",
    },
    {
      name: { required: true },
      price: { required: true },
      stock: { required: true },
      imageUrl: { required: true },
      category_id: { required: true },
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setValues({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        imageUrl: product.imageUrl || "",
        category_id: product.category_id || "",
      });
    }
  }, [product, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Por favor, corrija os erros no formulário.");
      return;
    }
    setIsSubmitting(true);
    await onSave(values);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {product ? "Editar Produto" : "Adicionar Novo Produto"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            value={values.name}
            onChange={handleInputChange}
            placeholder="Nome do Produto"
            error={errors.name}
          />
          <textarea
            name="description"
            value={values.description}
            onChange={handleInputChange}
            placeholder="Descrição"
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="price"
              type="number"
              value={values.price}
              onChange={handleInputChange}
              placeholder="Preço (ex: 499.90)"
              error={errors.price}
            />
            <Input
              name="stock"
              type="number"
              value={values.stock}
              onChange={handleInputChange}
              placeholder="Estoque"
              error={errors.stock}
            />
            <Input
              name="category_id"
              type="number"
              value={values.category_id}
              onChange={handleInputChange}
              placeholder="ID da Categoria"
              error={errors.category_id}
            />
          </div>
          <Input
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleInputChange}
            placeholder="URL da Imagem"
            error={errors.imageUrl}
          />
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-md text-white bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300"
            >
              {isSubmitting ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AdminPage = () => {
  const { userProfile } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await graphqlClient(
        `query { products { id name description price stock imageUrl category_id } }`
      );
      setProducts(data.products);
    } catch (error) {
      console.error("Erro ao buscar produtos para o painel de admin", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await apiClient.delete(`/products/${productId}`);
        fetchProducts(); // Re-fetch products after deletion
      } catch (error) {
        console.error("Erro ao excluir produto", error);
        alert("Falha ao excluir o produto.");
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        await apiClient.put(`/products/${editingProduct.id}`, productData);
      } else {
        // Create new product
        await apiClient.post("/products", productData);
      }
      setIsModalOpen(false);
      fetchProducts(); // Re-fetch products to show changes
    } catch (error) {
      console.error("Erro ao salvar produto", error);
      alert("Falha ao salvar o produto.");
    }
  };

  if (userProfile?.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Acesso Negado</h1>
        <p className="text-slate-600 mt-2">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Shield className="w-8 h-8" />
          Painel do Administrador
        </h1>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
        >
          <PlusCircle className="w-5 h-5" />
          Adicionar Produto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Produto
              </th>
              <th scope="col" className="px-6 py-3">
                Preço
              </th>
              <th scope="col" className="px-6 py-3">
                Estoque
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {product.id}
                </th>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
