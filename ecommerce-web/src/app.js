/* eslint-disable no-unused-vars */
/*
================================================================================
ARQUIVO: src/App.js (CORRIGIDO)
================================================================================
*/
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

// Importando Provedores de Contexto
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext"; // Importado

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

// Importando Componentes de Layout e UI
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Spinner } from "./components/ui/Spinner";

// Importando Funções de API
import { graphqlClient } from "./api/client";

// Componente que gerencia o conteúdo principal da aplicação
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />;
};

// Componente que renderiza a aplicação quando o usuário está autenticado
const Dashboard = () => {
  const [page, setPage] = useState("home");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage />;
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
      case "search":
        return (
          <SearchPage
            searchTerm={currentSearchTerm}
            results={searchResults}
            loading={isSearching}
          />
        );
      case "categories":
        return <CategoriesPage />;
      case "favorites":
        return <FavoritesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header
        setPage={setPage}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
};

// Componente Raiz da Aplicação
const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        {" "}
        {/* O FavoritesProvider agora envolve tudo que precisa de seus dados */}
        <CartProvider>
          <AppContent />
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
