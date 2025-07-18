// ecommerce-api/src/controllers/internalController.js
const db = require("../config/database");

exports.saveTestResult = async (req, res) => {
  // Agora recebemos um objeto com 'summary' e 'testCases'
  const { summary, testCases } = req.body;

  if (!summary || !testCases || typeof summary.total_tests === "undefined") {
    return res
      .status(400)
      .json({
        error: { code: "INVALID_PAYLOAD", message: "Payload inválido." },
      });
  }

  const connection = await db.getConnection(); // Obter uma conexão para usar transações

  try {
    await connection.beginTransaction(); // Inicia a transação

    // 1. Insere o resumo na tabela `test_runs`
    const dateObject = new Date(summary.run_at);
    const formattedDate = dateObject
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const summarySql = `
            INSERT INTO test_runs (total_tests, passed, failed, skipped, duration_ms, run_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    const summaryParams = [
      summary.total_tests,
      summary.passed,
      summary.failed,
      summary.skipped,
      summary.duration_ms,
      formattedDate,
    ];
    const [summaryResult] = await connection.query(summarySql, summaryParams);
    const testRunId = summaryResult.insertId;

    // 2. Insere cada caso de teste detalhado na tabela `test_case_results`
    if (testCases.length > 0) {
      const testCasesSql = `
                INSERT INTO test_case_results (test_run_id, name, duration_ms, status) VALUES ?
            `;
      // Mapeia os dados para o formato que o mysql2 espera para inserção em massa
      const testCasesValues = testCases.map((tc) => [
        testRunId,
        tc.name,
        tc.duration_ms,
        tc.status,
      ]);
      await connection.query(testCasesSql, [testCasesValues]);
    }

    await connection.commit(); // Confirma a transação se tudo deu certo
    res
      .status(201)
      .json({
        message: "Resultado do teste e seus detalhes foram salvos com sucesso.",
      });
  } catch (error) {
    await connection.rollback(); // Desfaz a transação em caso de erro
    console.error("ERRO DETALHADO DO BANCO DE DADOS:", error);
    res
      .status(500)
      .json({
        error: { code: "DATABASE_ERROR", message: "Erro ao salvar os dados." },
      });
  } finally {
    connection.release(); // Libera a conexão de volta para o pool
  }
};
