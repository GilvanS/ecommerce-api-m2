const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../../audit.log");

/**
 * Registra um evento de auditoria.
 * @param {object} logData - O objeto com os dados do log.
 * @param {number} logData.actorId - ID do usuário que realizou a ação.
 * @param {string} logData.actorName - Username do usuário.
 * @param {string} logData.action - A ação realizada (ex: 'PRODUCT_DELETED').
 * @param {object} logData.details - Detalhes adicionais, como o ID do alvo.
 */
const logAudit = (logData) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ...logData,
  };

  const logMessage = JSON.stringify(logEntry) + "\n";

  // Log no console
  console.log(`[AUDIT] ${logMessage}`);

  // Log no arquivo
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Falha ao escrever no log de auditoria:", err);
    }
  });
};

module.exports = { logAudit };
