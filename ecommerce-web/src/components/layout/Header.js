/* eslint-disable jsx-a11y/anchor-is-valid */
/*
================================================================================
ARQUIVO: src/components/layout/Header.js (CORRIGIDO)
================================================================================
*/
import React, { useMemo } from "react";

// Importando contextos para dados globais
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext"; // Importado

// Importando componentes e ícones
import { Logo } from "../shared/Logo2";
import { User, Heart, ShoppingBag, Search, Shield, X } from "../shared/Icons";

export const Header = ({
  setPage,
  handleSearch,
  searchTerm,
  setSearchTerm,
}) => {
  const { cart } = useCart();
  const { favoritesCount } = useFavorites(); // Consumindo o contexto de favoritos
  const { isAuthenticated, userProfile, logout } = useAuth();

  const cartItemCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm.trim());
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setPage("home");
  };

  return (
    <header className="sticky top-0 bg-white z-20">
      <div className="bg-merqado-gray-light border-b border-gray-200 py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>{/* Espaço para links de redes sociais, etc. */}</div>
          <div className="flex items-center space-x-4 text-merqado-gray-dark">
            {isAuthenticated ? (
              <>
                {userProfile?.role === "admin" && (
                  <button
                    onClick={() => setPage("admin")}
                    className="flex items-center gap-1 hover:text-merqado-blue"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </button>
                )}
                <button onClick={logout} className="hover:text-merqado-blue">
                  Sair
                </button>
              </>
            ) : (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-merqado-blue"
              >
                Login / Registro
              </a>
            )}
            <button
              onClick={() => setPage("favorites")}
              className="hover:text-merqado-blue"
            >
              Favoritos
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => setPage("home")}>
            <Logo />
          </div>
          <form
            onSubmit={onSearchSubmit}
            className="w-1/2 relative flex items-center"
          >
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar produto..."
              className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-20 focus:outline-none focus:ring-2 focus:ring-merqado-blue"
            />
            <div className="absolute right-0 top-0 h-full flex items-center">
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="h-full px-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-merqado-blue"
              >
                <Search />
              </button>
            </div>
          </form>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setPage("profile")}
              className="hover:text-merqado-blue"
            >
              <User />
            </button>
            <button
              onClick={() => setPage("favorites")}
              className="hover:text-merqado-blue relative"
            >
              <Heart />
              <span className="absolute -top-2 -right-2 bg-merqado-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {favoritesCount}
              </span>
            </button>
            <button
              onClick={() => setPage("cart")}
              className="hover:text-merqado-blue relative"
            >
              <ShoppingBag />
              <span className="absolute -top-2 -right-2 bg-merqado-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 flex justify-center">
          <ul className="flex space-x-8 font-medium">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("home");
                }}
                className="block py-4 text-gray-800 hover:text-merqado-orange border-b-2 border-transparent hover:border-merqado-orange"
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("categories");
                }}
                className="block py-4 text-gray-800 hover:text-merqado-orange border-b-2 border-transparent hover:border-merqado-orange"
              >
                Categorias
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("orders");
                }}
                className="block py-4 text-gray-800 hover:text-merqado-orange border-b-2 border-transparent hover:border-merqado-orange"
              >
                Meus Pedidos
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
