/*
================================================================================
ARQUIVO: src/routes/favoritesRoutes.js (CORRIGIDO)
================================================================================
*/
const express = require("express");
const router = express.Router();

// a importação deve subir uma pasta até controllers
const favoritesController = require("../controllers/favoritesController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Middleware para responder a métodos não permitidos
const methodNotAllowed = (req, res) =>
  res.status(405).json({
    error: {
      code: "METHOD_NOT_ALLOWED",
      message: "O método HTTP utilizado não é permitido para esta rota.",
    },
  });

/**
 * @swagger
 * tags:
 *   - name: Favorites
 *     description: Marcar/Desmarcar produtos como favoritos (requer autenticação)
 */

/**
 * @swagger
 * /api/favorites/{productId}:
 *   post:
 *     tags: [Favorites]
 *     summary: Marca ou desmarca um produto como favorito para o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a favoritar/desfavoritar
 *     responses:
 *       200:
 *         description: Status do favorito alterado com sucesso
 *       401:
 *         description: Não autorizado (usuário não autenticado)
 *       404:
 *         description: Produto não encontrado
 *       405:
 *         description: Método não permitido
 */
router
  .route("/:productId")
  .post(authMiddleware, favoritesController.toggleFavorite)
  .all(methodNotAllowed);

module.exports = router;
