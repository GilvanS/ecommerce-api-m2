/*
================================================================================
ARQUIVO: src/routes/userRoutes.js (ATUALIZADO)
================================================================================
*/
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

// Middleware para responder a métodos não permitidos e incluir header Allow
const methodNotAllowed = (req, res) => {
  const allowedMethods = req.route.stack
    .filter((layer) => layer.method)
    .map((layer) => layer.method.toUpperCase());
  res.set("Allow", allowedMethods.join(", "));
  return res.status(405).json({
    error: {
      code: "METHOD_NOT_ALLOWED",
      message: "O método HTTP utilizado não é permitido para esta rota.",
    },
  });
};

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Registra um novo usuário
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/register")
  .options((req, res) => res.set("Allow", "POST,OPTIONS").sendStatus(204))
  .post(userController.register)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Autentica um usuário
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/login")
  .options((req, res) => res.set("Allow", "POST,OPTIONS").sendStatus(204))
  .post(userController.login)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Retorna o perfil do usuário autenticado
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/profile")
  .options((req, res) => res.set("Allow", "GET,OPTIONS").sendStatus(204))
  .get(authMiddleware, userController.getProfile)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     tags: [Users]
 *     summary: Permite ao usuário logado alterar a própria senha
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/change-password")
  .options((req, res) => res.set("Allow", "PUT,OPTIONS").sendStatus(204))
  .put(authMiddleware, userController.changePassword)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Retorna uma lista de todos os usuários (Admin)
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/")
  .options((req, res) => res.set("Allow", "GET,OPTIONS").sendStatus(204))
  .get(authMiddleware, adminMiddleware, userController.getAllUsers)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/users/{id}/role:
 *   put:
 *     tags: [Users]
 *     summary: Atualiza o papel de um usuário (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/:id/role")
  .options((req, res) => res.set("Allow", "PUT,OPTIONS").sendStatus(204))
  .put(authMiddleware, adminMiddleware, userController.updateUserRole)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/users/{userId}/reset-password:
 *   put:
 *     tags: [Users]
 *     summary: Redefine a senha de um usuário (Admin)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/:userId/reset-password")
  .options((req, res) => res.set("Allow", "PUT,OPTIONS").sendStatus(204))
  .put(authMiddleware, adminMiddleware, userController.resetPasswordByAdmin)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Exclui um usuário (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       405:
 *         description: Método não permitido
 */
router
  .route("/:id")
  .options((req, res) => res.set("Allow", "DELETE,OPTIONS").sendStatus(204))
  .delete(authMiddleware, adminMiddleware, userController.deleteUser)
  .all(methodNotAllowed);

module.exports = router;
