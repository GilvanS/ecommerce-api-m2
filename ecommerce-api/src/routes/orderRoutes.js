/*
================================================================================
ARQUIVO: src/routes/orderRoutes.js (ATUALIZADO E CORRIGIDO)
================================================================================
*/
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

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
 *   - name: Orders
 *     description: Criação e consulta de pedidos (requer autenticação)
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Retorna o histórico de pedidos do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso.
 *       401:
 *         description: Não autorizado.
 *       405:
 *         description: Método não permitido.
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Cria um novo pedido a partir do carrinho
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart
 *               - paymentMethod
 *               - shippingAddress
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - quantity
 *                     - price
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 12500.00
 *               paymentMethod:
 *                 type: string
 *                 example: "credit_card"
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - cpf
 *                   - address
 *                   - number
 *                   - cep
 *                   - city
 *                 properties:
 *                   cpf:
 *                     type: string
 *                     example: "123.456.789-00"
 *                   address:
 *                     type: string
 *                     example: "Avenida Paulista"
 *                   number:
 *                     type: string
 *                     example: "1000"
 *                   cep:
 *                     type: string
 *                     example: "01310-100"
 *                   city:
 *                     type: string
 *                     example: "São Paulo"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *       400:
 *         description: Dados do pedido incompletos.
 *       401:
 *         description: Não autorizado.
 *       405:
 *         description: Método não permitido.
 */
router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder)
  .all(methodNotAllowed);

module.exports = router;
