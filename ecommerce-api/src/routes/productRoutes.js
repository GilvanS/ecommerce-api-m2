// src/routes/productRoutes.js
/*
================================================================================
ARQUIVO: src/routes/productRoutes.js
================================================================================
*/
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

// Middleware para métodos não permitidos
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
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retorna todos os produtos
 *     responses:
 *       '200':
 *         description: Lista de produtos retornada com sucesso.
 *       '500':
 *         description: Erro interno ao buscar produtos.
 */
router.route("/").get(productController.getProducts).all(methodNotAllowed);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Cria um novo produto (Admin)
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
 *               discount_price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               is_new:
 *                 type: boolean
 *               is_trending:
 *                 type: boolean
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - imageUrl
 *               - category_id
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso.
 *       '400':
 *         description: Campos essenciais obrigatórios.
 *       '403':
 *         description: Acesso negado. Requer privilégios de administrador.
 *       '500':
 *         description: Erro interno ao criar produto.
 */
router
  .route("/")
  .post(authMiddleware, adminMiddleware, productController.createProduct)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Atualiza um produto existente (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
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
 *               discount_price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               is_new:
 *                 type: boolean
 *               is_trending:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso.
 *       '400':
 *         description: Campos essenciais obrigatórios.
 *       '403':
 *         description: Acesso negado. Requer privilégios de administrador.
 *       '404':
 *         description: Produto não encontrado.
 *       '500':
 *         description: Erro interno ao atualizar produto.
 */
router
  .route("/:id")
  .put(authMiddleware, adminMiddleware, productController.updateProduct)
  .all(methodNotAllowed);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Exclui um produto (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       '200':
 *         description: Produto excluído com sucesso.
 *       '403':
 *         description: Acesso negado. Requer privilégios de administrador.
 *       '404':
 *         description: Produto não encontrado.
 *       '500':
 *         description: Erro interno ao excluir produto.
 */
router
  .route("/:id")
  .delete(authMiddleware, adminMiddleware, productController.deleteProduct)
  .all(methodNotAllowed);

module.exports = router;
