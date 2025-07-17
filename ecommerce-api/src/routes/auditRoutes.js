/*
================================================================================
ARQUIVO: src/routes/auditRoutes.js (NOVO)
================================================================================
*/
const express = require("express");
const router = express.Router();
const auditController = require("../controllers/auditController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

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
 * /api/audit/summary:
 *   get:
 *     tags:
 *       - Audit
 *     summary: Retorna um resumo dos dados de auditoria (Admin)
 *     description: >
 *       Lê o ficheiro de log de auditoria e retorna dados agregados, como
 *       contagem de ações por tipo e atividade por dia.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Resumo dos dados de auditoria retornado com sucesso.
 *       '403':
 *         description: Acesso negado. Requer privilégios de administrador.
 *       '500':
 *         description: Erro ao ler ou processar o ficheiro de log.
 */

router
  .route("/summary")
  .get(authMiddleware, adminMiddleware, auditController.getAuditSummary)
  .all(methodNotAllowed);

module.exports = router;
