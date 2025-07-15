import axios from "axios";

const API_URL = "http://localhost:3005/api";
const GQL_URL = "http://localhost:3005/graphql";

export const apiClient = axios.create({ baseURL: API_URL });

// --- Interceptor de Requisição ---
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = token;
  return config;
});

// --- Interceptor de Resposta ---
// Lida com erros de autenticação de forma global disparando um evento customizado.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const needsReauthentication =
      error.response &&
      (error.response.status === 401 || error.response.status === 403);

    if (needsReauthentication) {
      // Dispara um evento customizado que o front-end pode ouvir
      window.dispatchEvent(new CustomEvent("auth-error"));
    }

    return Promise.reject(error);
  }
);

export const graphqlClient = async (query, variables = {}) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      GQL_URL,
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
      }
    );

    if (response.data.errors) {
      const isAuthError = response.data.errors.some(
        (e) =>
          e.message.includes("Não autenticado") ||
          e.message.includes("Acesso negado")
      );
      if (isAuthError) {
        window.dispatchEvent(new CustomEvent("auth-error"));
      }
      throw new Error(response.data.errors.map((e) => e.message).join("\n"));
    }
    return response.data.data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
};
