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
  KeyRound,
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
              className="px-6 py-2 rounded-md text-white bg-merqado-orange hover:bg-merqado-orange-dark disabled:bg-merqado-orange-light"
            >
              {isSubmitting ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const CategoryFormModal = ({ category, onClose, onSave }) => {
  const { values, errors, handleInputChange, isFormValid, setValues } = useForm(
    { name: "", image_url: "" },
    { name: { required: true }, image_url: { required: true } }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setValues({
        name: category.name || "",
        image_url: category.image_url || "",
      });
    }
  }, [category, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setIsSubmitting(true);
    await onSave(values);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {category ? "Editar Categoria" : "Adicionar Nova Categoria"}
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
            placeholder="Nome da Categoria"
            error={errors.name}
          />
          <Input
            name="image_url"
            value={values.image_url}
            onChange={handleInputChange}
            placeholder="URL da Imagem da Categoria"
            error={errors.image_url}
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
              className="px-6 py-2 rounded-md text-white bg-merqado-orange hover:bg-opacity-90 transition-opacity"
            >
              {isSubmitting ? "Salvando..." : "Salvar Categoria"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const UserRoleModal = ({ user, onClose, onSave }) => {
  const [role, setRole] = useState(user?.role || "customer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(user.id, role);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Editar Papel do Usuário
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p>
            Usuário: <span className="font-semibold">{user.name}</span>
          </p>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Papel (Role)
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-merqado-blue focus:border-merqado-blue sm:text-sm rounded-md"
            >
              <option value="customer">Cliente (customer)</option>
              <option value="admin">Administrador (admin)</option>
            </select>
          </div>
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
              className="px-6 py-2 rounded-md text-white bg-merqado-orange hover:bg-opacity-90 transition-opacity"
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const ResetPasswordModal = ({ user, onClose, onSave }) => {
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      alert("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setIsSubmitting(true);
    await onSave(user.id, newPassword);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Redefinir Senha</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p>
            Você está redefinindo a senha para o usuário:{" "}
            <span className="font-semibold">{user.name}</span>
          </p>
          <Input
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Digite a nova senha"
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
              className="px-6 py-2 rounded-md text-white bg-merqado-orange hover:bg-opacity-90 transition-opacity"
            >
              {isSubmitting ? "Salvando..." : "Redefinir Senha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export const AdminPage = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // Estados dos modais
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = `
                query GetAdminData {
                    products { id name description price stock imageUrl category_id }
                    categories { id name image_url }
                    getAllUsers { id name username role }
                }
            `;
      const data = await graphqlClient(query);
      setProducts(data.products || []);
      setCategories(data.categories || []);
      setUsers(data.getAllUsers || []);
    } catch (error) {
      console.error("Erro ao buscar dados para o painel de admin", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userProfile?.role === "admin") {
      fetchData();
    }
  }, [userProfile, fetchData]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await apiClient.delete(`/products/${productId}`);
        fetchData(); // CORREÇÃO: Chamando fetchData em vez de fetchProducts
      } catch (error) {
        console.error("Erro ao excluir produto", error);
        alert("Falha ao excluir o produto.");
      }
    }
  };
  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await apiClient.put(`/products/${editingProduct.id}`, productData);
      } else {
        await apiClient.post("/products", productData);
      }
      setIsProductModalOpen(false); // CORREÇÃO: Fechando o modal correto
      fetchData(); // CORREÇÃO: Chamando fetchData em vez de fetchProducts
    } catch (error) {
      console.error("Erro ao salvar produto", error);
      alert("Falha ao salvar o produto.");
    }
  };
  // --- Lógicas de Categoria (NOVAS) ---
  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };
  const handleSaveCategory = async (categoryData) => {
    try {
      if (editingCategory) {
        await apiClient.put(`/categories/${editingCategory.id}`, categoryData);
      } else {
        await apiClient.post("/categories", categoryData);
      }
      setIsCategoryModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar categoria", error);
      alert(
        `Falha ao salvar a categoria: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta categoria? Apenas categorias sem produtos podem ser excluídas."
      )
    ) {
      try {
        await apiClient.delete(`/categories/${categoryId}`);
        fetchData();
      } catch (error) {
        console.error("Erro ao excluir categoria", error);
        alert(
          `Falha ao excluir a categoria: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };
  const handleSaveUserRole = async (userId, role) => {
    try {
      await apiClient.put(`/users/${userId}/role`, { role });
      setIsUserModalOpen(false);
      fetchData();
    } catch (error) {
      alert(
        `Falha ao atualizar papel: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };
  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await apiClient.delete(`/users/${userId}`);
        fetchData();
      } catch (error) {
        alert(
          `Falha ao excluir usuário: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };
  const handleResetPassword = (user) => {
    setEditingUser(user);
    setIsResetPasswordModalOpen(true);
  };
  const handleSaveNewPassword = async (userId, newPassword) => {
    try {
      await apiClient.put(`/users/${userId}/reset-password`, { newPassword });
      alert("Senha redefinida com sucesso!");
      setIsResetPasswordModalOpen(false);
    } catch (error) {
      alert(
        `Falha ao redefinir a senha: ${
          error.response?.data?.message || error.message
        }`
      );
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
      {isProductModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setIsProductModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
      {isCategoryModalOpen && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={handleSaveCategory}
        />
      )}
      {isUserModalOpen && (
        <UserRoleModal
          user={editingUser}
          onClose={() => setIsUserModalOpen(false)}
          onSave={handleSaveUserRole}
        />
      )}
      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          user={editingUser}
          onClose={() => setIsResetPasswordModalOpen(false)}
          onSave={handleSaveNewPassword}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-merqado-gray-dark flex items-center gap-3">
          <Shield className="w-8 h-8" />
          Painel do Administrador
        </h1>
        {activeTab !== "users" && (
          <button
            onClick={
              activeTab === "products" ? handleAddProduct : handleAddCategory
            }
            className="flex items-center gap-2 px-4 py-2 bg-merqado-orange text-white rounded-md hover:bg-opacity-90 transition-opacity"
          >
            <PlusCircle className="w-5 h-5" />
            {activeTab === "products"
              ? "Adicionar Produto"
              : "Adicionar Categoria"}
          </button>
        )}
      </div>

      {/* Abas de Navegação */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("products")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "products"
                ? "border-merqado-blue text-merqado-blue"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Gerenciar Produtos
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-merqado-blue text-merqado-blue"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Gerenciar Categorias
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "users"
                ? "border-merqado-blue text-merqado-blue"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Gerenciar Usuários
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Tabela de Produtos */}
          <div className={activeTab === "products" ? "" : "hidden"}>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-merqado-gray-light">
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
                    <th scope="col" className="px-6 py-3 text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b hover:bg-merqado-gray-light/50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.id}
                      </td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4 flex justify-end space-x-3">
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
          {/* Tabela de Categorias */}
          <div className={activeTab === "categories" ? "" : "hidden"}>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-merqado-gray-light">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nome da Categoria
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="bg-white border-b hover:bg-merqado-gray-light/50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {category.id}
                      </td>
                      <td className="px-6 py-4">{category.name}</td>
                      <td className="px-6 py-4 flex justify-end space-x-3">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
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
          {/* Tabela de Usuários */}
          <div className={activeTab === "users" ? "" : "hidden"}>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-merqado-gray-light">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Papel (Role)
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b hover:bg-merqado-gray-light/50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end space-x-3">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="font-medium text-blue-600 hover:underline"
                          title="Editar Papel"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(user)}
                          className="font-medium text-yellow-600 hover:underline"
                          title="Redefinir Senha"
                        >
                          <KeyRound className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="font-medium text-red-600 hover:underline"
                          title="Excluir Usuário"
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
        </>
      )}
    </div>
  );
};
