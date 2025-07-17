// src/routes/categoryRoutes.js

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

// Swagger Tags
/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Gerenciar categorias de produtos (criar, atualizar, excluir) – requer autenticação de administrador
 */

// Components Schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Eletrônicos
 *         image_url:
 *           type: string
 *           example: http://exemplo.com/imagem.png
 *       required:
 *         - id
 *         - name
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Cria uma nova categoria
 *     description: Cria uma categoria de produto. Apenas administradores podem executar esta operação.
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
 *                 example: Eletrônicos
 *               image_url:
 *                 type: string
 *                 example: http://exemplo.com/imagem.png
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Parâmetros inválidos.
 *       '401':
 *         description: Não autenticado.
 *       '403':
 *         description: Acesso negado. Permissão de administrador necessária.
 *       '500':
 *         description: Erro interno do servidor.
 */
router
  .route("/")
  .post(authMiddleware, adminMiddleware, categoryController.createCategory)
  .all((req, res) =>
    res.status(405).json({
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Método HTTP não permitido neste endpoint.",
      },
    })
  );

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Atualiza uma categoria existente
 *     description: Atualiza o nome e/ou imagem de uma categoria pelo seu ID (admin somente).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da categoria a ser atualizada
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Eletrodomésticos
 *               image_url:
 *                 type: string
 *                 example: http://exemplo.com/nova-imagem.png
 *     responses:
 *       '200':
 *         description: Categoria atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Dados fornecidos inválidos.
 *       '401':
 *         description: Não autenticado.
 *       '403':
 *         description: Acesso negado. Permissão de administrador necessária.
 *       '404':
 *         description: Categoria não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Exclui uma categoria
 *     description: Remove uma categoria pelo seu ID (admin somente).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da categoria a ser excluída
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Categoria excluída com sucesso.
 *       '401':
 *         description: Não autenticado.
 *       '403':
 *         description: Acesso negado. Permissão de administrador necessária.
 *       '404':
 *         description: Categoria não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */
router
  .route("/:id")
  .put(authMiddleware, adminMiddleware, categoryController.updateCategory)
  .delete(authMiddleware, adminMiddleware, categoryController.deleteCategory)
  .all((req, res) =>
    res.status(405).json({
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Método HTTP não permitido neste endpoint.",
      },
    })
  );

module.exports = router;
