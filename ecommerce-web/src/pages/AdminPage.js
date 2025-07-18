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
import { Pagination } from "../components/ui/Pagination";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";
import { useNotification } from "../context/NotificationContext";

// Importando componentes de gráficos
import { DoughnutChart } from "../components/admin/DoughnutChart";
import { BarChart } from "../components/admin/BarChart";
import { TestDoughnutChart } from "../components/admin/TestDoughnutChart";
import { TestBarChart } from "../components/admin/TestBarChart";

// Importando Ícones
import {
  Shield,
  PlusCircle,
  Trash2,
  Edit,
  X,
  KeyRound,
} from "../components/shared/Icons";

// --- MODAIS (Nenhuma alteração necessária aqui, permanecem os mesmos) ---

const ProductFormModal = ({ product, categories, onClose, onSave }) => {
  const { values, errors, handleInputChange, isFormValid, setValues } = useForm(
    {
      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
      category_id: "",
      discount_price: "",
      is_new: true,
      is_trending: false,
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
        discount_price: product.discount_price || "",
        is_new: product.is_new ?? true,
        is_trending: product.is_trending ?? false,
      });
    }
  }, [product, setValues]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    setIsSubmitting(true);
    const productData = { ...values };
    await onSave(productData);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="price"
              type="number"
              step="0.01"
              value={values.price}
              onChange={handleInputChange}
              placeholder="Preço Original"
              error={errors.price}
            />
            <Input
              name="discount_price"
              type="number"
              step="0.01"
              value={values.discount_price}
              onChange={handleInputChange}
              placeholder="Preço com Desconto (opcional)"
              error={errors.discount_price}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="stock"
              type="number"
              value={values.stock}
              onChange={handleInputChange}
              placeholder="Estoque"
              error={errors.stock}
            />
            <select
              name="category_id"
              value={values.category_id}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md bg-white ${
                errors.category_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecione uma Categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleInputChange}
            placeholder="URL da Imagem"
            error={errors.imageUrl}
          />
          <div className="flex items-center space-x-8 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_new"
                checked={values.is_new}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded text-merqado-blue focus:ring-merqado-blue"
              />
              <span className="text-slate-700">É Novidade?</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_trending"
                checked={values.is_trending}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded text-merqado-blue focus:ring-merqado-blue"
              />
              <span className="text-slate-700">É Tendência?</span>
            </label>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
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
  const { showModal } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      showModal({
        title: "Senha Inválida",
        message: "A nova senha deve ter pelo menos 8 caracteres.",
        onConfirm: () => {},
      });
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

const formatChartDate = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return "Data Inválida";
  }
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Data Inválida";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// --- COMPONENTE PRINCIPAL ---

export const AdminPage = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("audit");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auditData, setAuditData] = useState(null);
  const [testResultsData, setTestResultsData] = useState(null);

  const [pagination, setPagination] = useState({
    products: { currentPage: 1, totalPages: 1 },
    categories: { currentPage: 1, totalPages: 1 },
    users: { currentPage: 1, totalPages: 1 },
  });

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "dashboard") {
        const auditResponse = apiClient.get("/audit/summary");
        const testResultsQuery = `
            query GetTestDashboardData {
                testDashboardData(limit: 20) {
                    latestRun { 
                        total_tests, passed, failed, skipped, created_at
                        testCases { name, duration_ms, status }
                    }
                    historicalRuns { passed, failed, created_at }
                }
            }
        `;
        const testResultsResponse = graphqlClient(testResultsQuery);

        const [auditRes, testRes] = await Promise.all([
          auditResponse,
          testResultsResponse,
        ]);

        setAuditData(auditRes.data);
        setTestResultsData(testRes.testDashboardData);
      } else {
        const query = `
            query GetAdminData($productsPage: Int, $categoriesPage: Int, $usersPage: Int) {
                products(page: $productsPage, limit: 15) { products { id name price stock category_id description imageUrl discount_price is_new is_trending }, totalPages }
                categories(page: $categoriesPage, limit: 15) { categories { id name image_url }, totalPages }
                users(page: $usersPage, limit: 15) { users { id name username role }, totalPages }
            }
        `;
        const variables = {
          productsPage: pagination.products.currentPage,
          categoriesPage: pagination.categories.currentPage,
          usersPage: pagination.users.currentPage,
        };
        const data = await graphqlClient(query, variables);
        if (data.products) {
          setProducts(data.products.products || []);
          setPagination((p) => ({
            ...p,
            products: { ...p.products, totalPages: data.products.totalPages },
          }));
        }
        if (data.categories) {
          setCategories(data.categories.categories || []);
          setPagination((p) => ({
            ...p,
            categories: {
              ...p.categories,
              totalPages: data.categories.totalPages,
            },
          }));
        }
        if (data.users) {
          setUsers(data.users.users || []);
          setPagination((p) => ({
            ...p,
            users: { ...p.users, totalPages: data.users.totalPages },
          }));
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados para o painel de admin:", error);
    } finally {
      setLoading(false);
    }
  }, [
    activeTab,
    pagination.products.currentPage,
    pagination.categories.currentPage,
    pagination.users.currentPage,
  ]);

  useEffect(() => {
    if (userProfile?.role === "admin") {
      fetchData();
    }
  }, [userProfile, fetchData]);

  const handleSaveAndRefetch = async (saveFunction) => {
    await saveFunction();
    fetchData();
  };
  const openConfirmationModal = ({ title, message, onConfirm }) => {
    setConfirmationState({ isOpen: true, title, message, onConfirm });
  };
  const closeConfirmationModal = () => {
    setConfirmationState({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };
  const confirmAndDelete = async () => {
    await confirmationState.onConfirm();
    closeConfirmationModal();
  };
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };
  const handleDeleteProduct = (productId) => {
    openConfirmationModal({
      title: "Confirmar Exclusão de Produto",
      message: `Tem certeza que deseja excluir o produto com ID ${productId}? Esta ação não pode ser desfeita.`,
      onConfirm: () =>
        handleSaveAndRefetch(() => apiClient.delete(`/products/${productId}`)),
    });
  };
  const handleSaveProduct = async (productData) => {
    await handleSaveAndRefetch(async () => {
      if (editingProduct) {
        await apiClient.put(`/products/${editingProduct.id}`, productData);
      } else {
        await apiClient.post("/products", productData);
      }
      setIsProductModalOpen(false);
    });
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };
  const handleSaveCategory = async (categoryData) => {
    await handleSaveAndRefetch(async () => {
      if (editingCategory) {
        await apiClient.put(`/categories/${editingCategory.id}`, categoryData);
      } else {
        await apiClient.post("/categories", categoryData);
      }
      setIsCategoryModalOpen(false);
    });
  };
  const handleDeleteCategory = (categoryId) => {
    openConfirmationModal({
      title: "Confirmar Exclusão de Categoria",
      message: `Tem certeza que deseja excluir a categoria com ID ${categoryId}? Apenas categorias sem produtos podem ser excluídas.`,
      onConfirm: () =>
        handleSaveAndRefetch(() =>
          apiClient.delete(`/categories/${categoryId}`)
        ),
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };
  const handleSaveUserRole = async (userId, role) => {
    await handleSaveAndRefetch(async () => {
      await apiClient.put(`/users/${userId}/role`, { role });
      setIsUserModalOpen(false);
    });
  };
  const handleDeleteUser = (userId) => {
    openConfirmationModal({
      title: "Confirmar Exclusão de Usuário",
      message: `Tem certeza que deseja excluir o usuário com ID ${userId}?`,
      onConfirm: () =>
        handleSaveAndRefetch(() => apiClient.delete(`/users/${userId}`)),
    });
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

  if (!userProfile) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }
  if (userProfile.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Acesso Negado</h1>
        <p className="text-slate-600 mt-2">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  const renderStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case "passed":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            Aprovado
          </span>
        );
      case "failed":
      case "broken":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            Falhou
          </span>
        );
      case "skipped":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            Ignorado
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            {status}
          </span>
        );
    }
  };

  // --- INÍCIO DA CORREÇÃO ---
  const formatDuration = (ms) => {
    if (typeof ms !== "number" || ms < 0) {
      return "-";
    }
    if (ms < 1000) {
      return `${ms}ms`;
    }
    return `${(ms / 1000).toFixed(3)}s`;
  };
  // --- FIM DA CORREÇÃO ---

  return (
    <div className="container mx-auto px-4 py-8">
      {isProductModalOpen && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
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
      <ConfirmationModal
        isOpen={confirmationState.isOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmAndDelete}
        title={confirmationState.title}
        message={confirmationState.message}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-merqado-gray-dark flex items-center gap-3">
          <Shield className="w-8 h-8" />
          Painel do Administrador
        </h1>
        {activeTab !== "users" && activeTab !== "dashboard" && (
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

      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "dashboard"
                ? "border-merqado-blue text-merqado-blue"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Dashboard
          </button>
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
          <div className={activeTab === "dashboard" ? "" : "hidden"}>
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-6" aria-label="Sub-tabs">
                <button
                  onClick={() => setActiveSubTab("audit")}
                  className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${
                    activeSubTab === "audit"
                      ? "border-merqado-orange text-merqado-orange"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Auditoria
                </button>
                <button
                  onClick={() => setActiveSubTab("test_results")}
                  className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${
                    activeSubTab === "test_results"
                      ? "border-merqado-orange text-merqado-orange"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Resultados dos Testes
                </button>
              </nav>
            </div>

            <div className={activeSubTab === "audit" ? "" : "hidden"}>
              {auditData ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-center mb-4">
                      Ações por Tipo
                    </h3>
                    <DoughnutChart chartData={auditData.actionsByType} />
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-center mb-4">
                      Atividade por Dia
                    </h3>
                    <BarChart chartData={auditData.activityByDay} />
                  </div>
                </div>
              ) : (
                <p className="text-center text-slate-500 py-10">
                  Não há dados de auditoria para exibir.
                </p>
              )}
            </div>

            <div className={activeSubTab === "test_results" ? "" : "hidden"}>
              {testResultsData && testResultsData.latestRun ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-semibold text-center mb-4">
                        Última Execução de Testes
                      </h3>
                      <TestDoughnutChart
                        chartData={{
                          Aprovados: testResultsData.latestRun.passed,
                          Falhas: testResultsData.latestRun.failed,
                          Ignorados: testResultsData.latestRun.skipped,
                        }}
                      />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-semibold text-center mb-4">
                        Tendência de Falhas (Últimas Execuções)
                      </h3>
                      <TestBarChart
                        chartData={testResultsData.historicalRuns.reduce(
                          (acc, run) => {
                            const formattedDate = formatChartDate(
                              run.created_at
                            );
                            if (formattedDate !== "Data Inválida") {
                              acc[formattedDate] =
                                (acc[formattedDate] || 0) + run.failed;
                            }
                            return acc;
                          },
                          {}
                        )}
                      />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4">
                      Detalhes da Última Execução
                    </h3>
                    <div className="overflow-x-auto max-h-96">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-merqado-gray-light sticky top-0">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              Nome do Teste
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Duração
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {testResultsData.latestRun.testCases &&
                            testResultsData.latestRun.testCases.map(
                              (testCase, index) => (
                                <tr
                                  key={index}
                                  className="bg-white border-b hover:bg-merqado-gray-light/50"
                                >
                                  <td className="px-4 py-2 font-medium text-gray-900">
                                    {testCase.name}
                                  </td>
                                  {/* --- INÍCIO DA CORREÇÃO --- */}
                                  <td className="px-4 py-2">
                                    {formatDuration(testCase.duration_ms)}
                                  </td>
                                  {/* --- FIM DA CORREÇÃO --- */}
                                  <td className="px-4 py-2">
                                    {renderStatusBadge(testCase.status)}
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-slate-500 py-10">
                  Não há dados de execução de testes para exibir.
                </p>
              )}
            </div>
          </div>

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
            {pagination.products.totalPages > 1 && (
              <Pagination
                currentPage={pagination.products.currentPage}
                totalPages={pagination.products.totalPages}
                onPageChange={(page) =>
                  setPagination((p) => ({
                    ...p,
                    products: { ...p.products, currentPage: page },
                  }))
                }
              />
            )}
          </div>

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
            {pagination.categories.totalPages > 1 && (
              <Pagination
                currentPage={pagination.categories.currentPage}
                totalPages={pagination.categories.totalPages}
                onPageChange={(page) =>
                  setPagination((p) => ({
                    ...p,
                    categories: { ...p.categories, currentPage: page },
                  }))
                }
              />
            )}
          </div>

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
            {pagination.users.totalPages > 1 && (
              <Pagination
                currentPage={pagination.users.currentPage}
                totalPages={pagination.users.totalPages}
                onPageChange={(page) =>
                  setPagination((p) => ({
                    ...p,
                    users: { ...p.users, currentPage: page },
                  }))
                }
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
