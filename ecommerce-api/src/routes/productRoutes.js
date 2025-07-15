const express_product = require("express");
const router_product = express_product.Router();
const productController = require("../controllers/productController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operações de gerenciamento de produtos (requerem privilégios de admin)
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Cria um novo produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       403:
 *         description: Acesso negado (não é admin)
 */

router_product.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Atualiza um produto existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       403:
 *         description: Acesso negado (não é admin)
 */
router_product.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Exclui um produto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       403:
 *         description: Acesso negado (não é admin)
 */
router_product.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router_product;
