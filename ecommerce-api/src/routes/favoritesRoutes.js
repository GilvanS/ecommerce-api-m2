const express_fav = require("express");
const router_fav = express_fav.Router();
const favoritesController = require("../controllers/favoritesController");

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
 */
router_fav.post("/toggle", favoritesController.toggleFavorite);

module.exports = router_fav;
