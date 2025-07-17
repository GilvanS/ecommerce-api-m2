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

// --- Interceptor de Resposta (ATUALIZADO) ---
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error;
    const needsReauthentication =
      response && (response.status === 401 || response.status === 403);

    // CORREÇÃO: Não interceta erros na rota de login. Deixa a página de login tratar.
    // A verificação `config.url.endsWith` garante que estamos a ignorar apenas o endpoint de login.
    if (config.url.endsWith("/users/login")) {
      return Promise.reject(error); // Rejeita a promessa para que o .catch() local possa lidar com o erro.
    }

    if (needsReauthentication) {
      // Para todas as outras rotas, dispara o evento de sessão expirada.
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
