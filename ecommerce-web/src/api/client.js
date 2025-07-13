import axios from "axios";

const API_URL = "http://localhost:3005/api";
const GQL_URL = "http://localhost:3005/graphql";

export const apiClient = axios.create({ baseURL: API_URL });
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = token;
  return config;
});

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
      throw new Error(response.data.errors.map((e) => e.message).join("\n"));
    }
    return response.data.data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
};
