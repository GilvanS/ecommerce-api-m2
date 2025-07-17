// src/routes/userRoutes.js
/*
================================================================================
ARQUIVO: src/routes/userRoutes.js
================================================================================
*/
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

// Middleware para métodos não permitidos
const methodNotAllowed = (req, res) =>
  res.status(405).json({
    error: {
      code: "METHOD_NOT_ALLOWED",
      message: "O método HTTP utilizado não é permitido para esta rota.",
    },
  });

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               age: { type: integer }
 *               city: { type: string }
 *               state: { type: string }
 *               username: { type: string }
 *               password: { type: string }
 *             required:
 *               - name
 *               - age
 *               - city
 *               - state
 *               - username
 *               - password
 *     responses:
 *       '201':
 *         description: Usuário registrado com sucesso.
 *       '400':
 *         description: Campos obrigatórios ausentes ou fracos.
 *       '409':
 *         description: Usuário já cadastrado.
 *       '500':
 *         description: Erro interno ao registrar usuário.
 */
router.route("/register").post(userController.register).all(methodNotAllowed);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Autentica um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Login bem-sucedido.
 *       '400':
 *         description: Campos obrigatórios ausentes.
 *       '401':
 *         description: Credenciais inválidas.
 *       '403':
 *         description: Conta bloqueada.
 *       '500':
 *         description: Erro interno ao realizar login.
 */
router.route("/login").post(userController.login).all(methodNotAllowed);

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     tags:
 *       - Users
 *     summary: Solicita link de recuperação de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, format: email }
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Link de redefinição enviado (mesmo que o e-mail não exista).
 *       '400':
 *         description: E-mail não informado.
 *       '500':
 *         description: Erro interno ao processar recuperação.
 */
router.post("/forgot-password", userController.forgotPassword);

/**
 * @swagger
 * /api/users/reset-password/{token}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Redefine a senha usando token de recuperação
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de recuperação enviado por e-mail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password: { type: string }
 *               confirmPassword: { type: string }
 *             required:
 *               - password
 *               - confirmPassword
 *     responses:
 *       '200':
 *         description: Senha redefinida com sucesso.
 *       '400':
 *         description: Senha fraca, confirmação diferente ou token inválido/expirado.
 *       '500':
 *         description: Erro interno ao redefinir senha.
 */
router.post("/reset-password/:token", userController.resetPassword);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retorna perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil retornado com sucesso.
 *       '401':
 *         description: Não autenticado.
 *       '500':
 *         description: Erro interno ao buscar perfil.
 */
router.get("/profile", authMiddleware, userController.getProfile);

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Altera a própria senha
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword: { type: string }
 *               newPassword: { type: string }
 *               confirmPassword: { type: string }
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *     responses:
 *       '200':
 *         description: Senha alterada com sucesso.
 *       '400':
 *         description: Campos ausentes ou confirmação incorreta.
 *       '401':
 *         description: Senha antiga incorreta.
 *       '500':
 *         description: Erro interno ao alterar senha.
 */
router.put("/change-password", authMiddleware, userController.changePassword);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retorna todos os usuários (Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuários retornada com sucesso.
 *       '403':
 *         description: Acesso negado. Requer privilégios de administrador.
 *       '500':
 *         description: Erro interno ao buscar usuários.
 */
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}/role:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza papel de um usuário (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *             required:
 *               - role
 *     responses:
 *       '200':
 *         description: Papel atualizado com sucesso.
 *       '400':
 *         description: Role inválido.
 *       '403':
 *         description: Acesso negado.
 *       '500':
 *         description: Erro interno ao atualizar papel.
 */
router.put(
  "/:id/role",
  authMiddleware,
  adminMiddleware,
  userController.updateUserRole
);

/**
 * @swagger
 * /api/users/{userId}/reset-password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Redefine senha de outro usuário (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário alvo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *     responses:
 *       '200':
 *         description: Senha redefinida com sucesso.
 *       '400':
 *         description: Senha fraca ou ausente.
 *       '403':
 *         description: Acesso negado ou tentativa de reset em admin.
 *       '404':
 *         description: Usuário não encontrado.
 *       '500':
 *         description: Erro interno ao resetar senha.
 */
router.put(
  "/:userId/reset-password",
  authMiddleware,
  adminMiddleware,
  userController.resetPasswordByAdmin
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Exclui um usuário (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       '200':
 *         description: Usuário excluído com sucesso.
 *       '403':
 *         description: Acesso negado.
 *       '404':
 *         description: Usuário não encontrado.
 *       '500':
 *         description: Erro interno ao excluir usuário.
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

module.exports = router;
