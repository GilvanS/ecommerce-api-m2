const express = require("express");
const router_user = express.Router();
const userController = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Autenticação e gerenciamento de perfis de usuários
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Registra um novo usuário com perfil completo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, age, city, state, username, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               age:
 *                 type: integer
 *                 example: 30
 *               city:
 *                 type: string
 *                 example: São Paulo
 *               state:
 *                 type: string
 *                 example: SP
 *               username:
 *                 type: string
 *                 example: joao123
 *               password:
 *                 type: string
 *                 example: Senha@123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados incompletos
 *       409:
 *         description: Usuário já existe
 */

router_user.post("/register", userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Autentica um usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: joao123
 *               password:
 *                 type: string
 *                 example: Senha@123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */

router_user.post("/login", userController.login);
router_user.put(
  "/change-password",
  authMiddleware,
  userController.changePassword
);
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Retorna o perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *       401:
 *         description: Não autorizado
 */

router_user.get("/profile", authMiddleware, userController.getProfile);

// Novas Rotas para Admin
router_user.get(
  "/",
  authMiddleware,
  adminMiddleware,
  userController.getAllUsers
);
router_user.put(
  "/:id/role",
  authMiddleware,
  adminMiddleware,
  userController.updateUserRole
);
router_user.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);
router_user.put(
  "/:userId/reset-password",
  authMiddleware,
  adminMiddleware,
  userController.resetPasswordByAdmin
);

module.exports = router_user;
