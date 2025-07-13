/*
================================================================================
ARQUIVO: src/App.js
================================================================================
*/
import React, { useState } from "react";
import { graphqlClient } from "./api/client";

// Importando Provedores de Contexto
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Importando Componentes de Layout
import { Header } from "../src/components/layout/Header";
import { Footer } from "../src/components/layout/Footer";

// Importando Páginas
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { CartPage } from "../src/pages/CartPage";
import { OrdersPage } from "../src/pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SuccessPage } from "./pages/SuccessPage";
import { AdminPage } from "../src/pages/AdminPage";
import { SearchPage } from "../src/pages/SearchPage";
import { CategoriesPage } from "../src/pages/CategoriesPage";

// Componente que gerencia o conteúdo principal da aplicação
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Você pode adicionar um spinner de tela cheia aqui se desejar
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Carregando...
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
        return <HomePage setPage={setPage} />;
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
      default:
        return <HomePage setPage={setPage} />;
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
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
