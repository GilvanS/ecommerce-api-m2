/*
================================================================================
ARQUIVO: src/routes/productRoutes.js (ATUALIZADO)
================================================================================
*/
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
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
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Retorna todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *       405:
 *         description: Método não permitido
 */
router
  .route("/")
  .options((req, res) => res.set("Allow", "GET,POST,OPTIONS").sendStatus(204))
  .get(productController.getProducts)
  .all(methodNotAllowed);

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
 *       405:
 *         description: Método não permitido
 */
router
  .route("/")
  .options((req, res) => res.set("Allow", "GET,POST,OPTIONS").sendStatus(204))
  .post(authMiddleware, adminMiddleware, productController.createProduct)
  .all(methodNotAllowed);

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
 *       405:
 *         description: Método não permitido
 */
router
  .route("/:id")
  .options((req, res) => res.set("Allow", "PUT,DELETE,OPTIONS").sendStatus(204))
  .put(authMiddleware, adminMiddleware, productController.updateProduct)
  .all(methodNotAllowed);

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
 *       405:
 *         description: Método não permitido
 */
router
  .route("/:id")
  .options((req, res) => res.set("Allow", "PUT,DELETE,OPTIONS").sendStatus(204))
  .delete(authMiddleware, adminMiddleware, productController.deleteProduct)
  .all(methodNotAllowed);

module.exports = router;
