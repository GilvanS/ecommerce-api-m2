/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./index.css"; // ou ./styles/tailwind.css

// Importando Provedores de Contexto
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import {
  NotificationProvider,
  useNotification,
} from "./context/NotificationContext";

// Importando Páginas
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/CartPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SuccessPage } from "./pages/SuccessPage";
import { AdminPage } from "./pages/AdminPage";
import { SearchPage } from "./pages/SearchPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CategoryProductsPage } from "./pages/CategoryProductsPage";

// Importando Componentes de Layout e UI
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Spinner } from "./components/ui/Spinner";
import { NotificationModal } from "./components/ui/NotificationModal";

// Importando Funções de API
import { graphqlClient } from "./api/client";

// Componente que gerencia o conteúdo principal da aplicação
const AppContent = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const { showModal, modalState } = useNotification();

  // Configura o listener de eventos para erros de autenticação
  useEffect(() => {
    const handleAuthError = () => {
      logout(); // Limpa o estado de autenticação
      showModal({
        title: "Sessão Expirada",
        message:
          "Sua sessão expirou. Por favor, faça login novamente para continuar.",
        onConfirm: () => {
          /* Apenas fecha o modal, o logout já redireciona */
        },
      });
    };

    window.addEventListener("auth-error", handleAuthError);

    // Limpa o listener quando o componente é desmontado
    return () => {
      window.removeEventListener("auth-error", handleAuthError);
    };
  }, [logout, showModal]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <NotificationModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.onConfirm}
      />
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </>
  );
};
// Componente que renderiza a aplicação quando o usuário está autenticado
const Dashboard = () => {
  const [page, setPage] = useState("home");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleSearch = async (term) => {
    if (!term) return;
    setIsSearching(true);
    setPage("search");
    setCurrentSearchTerm(term);
    try {
      const query = `query Products($search: String) { products(search: $search) { id name description price imageUrl } }`;
      const data = await graphqlClient(query, { search: term });
      setSearchResults(data.products);
    } catch (error) {
      console.error("Search failed", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setSearchTerm("");
    }
  };
  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setPage("productDetail");
  };
  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setPage("categoryProducts");
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onProductSelect={handleSelectProduct} />;
      case "search":
        return (
          <SearchPage
            searchTerm={searchTerm}
            onProductSelect={handleSelectProduct}
          />
        );
      case "categories":
        return <CategoriesPage onCategorySelect={handleSelectCategory} />;
      case "categoryProducts":
        return (
          <CategoryProductsPage
            categoryId={selectedCategoryId}
            onProductSelect={handleSelectProduct}
          />
        );
      case "favorites":
        return <FavoritesPage onProductSelect={handleSelectProduct} />;
      case "cart":
        return <CartPage setPage={setPage} />;
      case "orders":
        return <OrdersPage />;
      case "profile":
        return <ProfilePage />;
      case "checkout":
        return <CheckoutPage setPage={setPage} />;
      case "success":
        return <SuccessPage setPage={setPage} />;
      case "admin":
        return <AdminPage />;
      case "productDetail":
        return (
          <ProductDetailPage productId={selectedProductId} setPage={setPage} />
        );
      default:
        return <HomePage onProductSelect={handleSelectProduct} />;
    }
  };

  return (
    <div className="bg-merqado-gray-light min-h-screen flex flex-col">
      <Header
        setPage={setPage}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-grow">
        {" "}
        {renderPage()}
        <Routes>
          <Route path="/categoria/:id" element={<CategoryProductsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Componente Raiz da Aplicação
const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <FavoritesProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </FavoritesProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
