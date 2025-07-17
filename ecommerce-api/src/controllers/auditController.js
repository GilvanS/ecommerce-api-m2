/*
================================================================================
ARQUIVO: src/controllers/auditController.js (NOVO)
================================================================================
*/
const fs = require("fs").promises;
const path = require("path");

// Define o caminho para o ficheiro de log
const logFilePath = path.join(__dirname, "../../audit.log");

// Função principal para ler e processar o log de auditoria
exports.getAuditSummary = async (req, res) => {
  try {
    let fileContent;
    try {
      fileContent = await fs.readFile(logFilePath, "utf-8");
    } catch (error) {
      // Se o ficheiro não existir, retorna um resumo vazio em vez de um erro.
      if (error.code === "ENOENT") {
        return res.status(200).json({
          actionsByType: {},
          activityByDay: {},
        });
      }
      throw error; // Lança outros erros de leitura
    }

    const logEntries = fileContent
      .split("\n")
      .filter((line) => line) // Remove linhas em branco
      .map((line) => JSON.parse(line));

    // 1. Processa a contagem de ações por tipo
    const actionsByType = logEntries.reduce((acc, entry) => {
      acc[entry.action] = (acc[entry.action] || 0) + 1;
      return acc;
    }, {});

    // 2. Processa a atividade nos últimos 7 dias
    const activityByDay = {};
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
      activityByDay[dateString] = 0;
    }

    logEntries.forEach((entry) => {
      const entryDate = new Date(entry.timestamp);
      const entryDateString = entryDate.toISOString().split("T")[0];
      if (activityByDay.hasOwnProperty(entryDateString)) {
        activityByDay[entryDateString]++;
      }
    });

    res.status(200).json({ actionsByType, activityByDay });
  } catch (error) {
    console.error("Erro ao processar o log de auditoria:", error);
    res.status(500).json({
      error: {
        code: "AUDIT_LOG_ERROR",
        message: "Não foi possível ler ou processar o log de auditoria.",
      },
    });
  }
};
