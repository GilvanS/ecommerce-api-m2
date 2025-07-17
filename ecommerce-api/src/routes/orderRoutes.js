/*
================================================================================
ARQUIVO: src/routes/orderRoutes.js (CORRIGIDO)
================================================================================
*/
const express = require("express");
const router = express.Router();

// Aponta para o arquivo correto de controller
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
router
  .route("/")
  // A função abaixo deve existir e estar exportada em orderController.js
  .get(orderController.getOrders)
  // A função abaixo também
  .post(orderController.createOrder)
  .all(methodNotAllowed);

module.exports = router;
