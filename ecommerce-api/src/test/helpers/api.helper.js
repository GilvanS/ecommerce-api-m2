const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");

/**
 * Encapsula a requisição para registrar um novo usuário.
 * @param {Object} userData
 */
const registerUser = (userData) =>
  request(app).post("/api/users/register").send(userData);

/**
 * Encapsula a requisição para fazer login.
 * @param {Object} credentials
 */
const loginUser = (credentials) =>
  request(app).post("/api/users/login").send(credentials);

/**
 * Encapsula a requisição para solicitar recuperação de senha.
 * @param {string} email
 */
const forgotPassword = (email) =>
  request(app).post("/api/users/forgot-password").send({ email });

/**
 * Encapsula a requisição para resetar a senha usando token na URL.
 * @param {string} token - Token de recuperação.
 * @param {string} password - Nova senha.
 */
const resetPassword = (token, password) =>
  request(app)
    .post(`/api/users/reset-password/${token}`)
    .send({ password, confirmPassword: password });

/**
 * Acessa um endpoint protegido. Adiciona Authorization se token fornecido.
 * @param {string} [token]
 */
const getProtectedData = (token) => {
  const req = request(app).get("/api/protected");
  if (token) req.set("Authorization", `Bearer ${token}`);
  return req;
};

/**
 * Login com headers customizados (Content-Type etc.).
 * @param {Object} credentials
 * @param {Object} headers
 */
const loginUserRaw = (credentials, headers = {}) => {
  const req = request(app).post("/api/users/login");
  Object.entries(headers).forEach(([key, value]) => req.set(key, value));
  return req.send(credentials);
};

/**
 * Gera um JWT expirado para testes de token expirado.
 * @param {string} username
 */
const generateExpiredToken = (username) => {
  const secret = process.env.JWT_SECRET; // Alterado para usar variável de ambiente
  if (!secret) {
    throw new Error("JWT_SECRET não definido nas variáveis de ambiente.");
  }
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign({ username, iat: now - 7200, exp: now - 3600 }, secret);
};

/**
 * Gera um token de reset expirado para testes de expiração de reset.
 * @param {string} email
 */
const generateExpiredResetToken = (email) => {
  const secret = process.env.RESET_PASSWORD_SECRET || process.env.JWT_SECRET; // Alterado
  if (!secret) {
    throw new Error(
      "RESET_PASSWORD_SECRET ou JWT_SECRET não definido nas variáveis de ambiente."
    );
  }
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign({ email, iat: now - 7200, exp: now - 3600 }, secret);
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProtectedData,
  loginUserRaw,
  generateExpiredToken,
  generateExpiredResetToken,
};
