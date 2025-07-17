/*
================================================================================
ARQUIVO: src/routes/favoritesRoutes.js (ATUALIZADO)
================================================================================
*/
const express_fav = require("express");
const router_fav = express_fav.Router();
const favoritesController = require("../controllers/favoritesController");

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
 * tags:
 *   - name: Favorites
 *     description: Gerenciamento de favoritos do usuário
 */

/**
 * @swagger
 * /api/favorites/toggle:
 *   post:
 *     tags: [Favorites]
 *     summary: Adiciona ou remove um produto dos favoritos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Removido dos favoritos
 *       201:
 *         description: Adicionado aos favoritos
 *       401:
 *         description: Não autorizado
 *       405:
 *         description: Método não permitido
 */
router_fav
  .route("/toggle")
  .options((req, res) => res.set("Allow", "POST,OPTIONS").sendStatus(204))
  .post(favoritesController.toggleFavorite)
  .all(methodNotAllowed);

module.exports = router_fav;
