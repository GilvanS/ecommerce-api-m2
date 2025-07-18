// ecommerce-api/scripts/publish-test-results.js
const fs = require("fs/promises");
const path = require("path");
const { glob } = require("glob");
const fetch = require("node-fetch");

const API_URL = process.env.TEST_RESULTS_API_URL;
const API_KEY = process.env.INTERNAL_API_KEY;

async function main() {
  if (!API_URL || !API_KEY) {
    console.error(
      "Erro: Variáveis de ambiente TEST_RESULTS_API_URL e INTERNAL_API_KEY são obrigatórias."
    );
    process.exit(1);
  }

  console.log("Analisando resultados dos testes na pasta allure-results...");

  const resultsPath = path.join(process.cwd(), "allure-results");
  const files = await glob(`${resultsPath}/*-result.json`);

  if (files.length === 0) {
    console.log("Nenhum arquivo de resultado encontrado. Abortando.");
    return;
  }

  let passed = 0;
  let failed = 0;
  let broken = 0;
  let skipped = 0;
  let totalDuration = 0;
  let earliestStartTime = Infinity;
  const testCases = []; // --- INÍCIO DA ALTERAÇÃO ---

  for (const file of files) {
    try {
      const content = await fs.readFile(file, "utf-8");
      const json = JSON.parse(content);

      const status = json.status || "unknown";
      const duration = json.stop && json.start ? json.stop - json.start : 0;

      // Adiciona detalhes do caso de teste ao array
      testCases.push({
        name: json.name || "Nome do teste não encontrado",
        duration_ms: duration,
        status: status,
      });

      switch (status) {
        case "passed":
          passed++;
          break;
        case "failed":
          failed++;
          break;
        case "broken":
          broken++;
          break;
        case "skipped":
          skipped++;
          break;
      }

      if (json.start && json.start < earliestStartTime) {
        earliestStartTime = json.start;
      }
      totalDuration += duration;
    } catch (error) {
      console.warn(`Aviso: Falha ao ler ou analisar o arquivo ${file}.`, error);
    }
  }

  const runAtDate =
    earliestStartTime === Infinity ? new Date() : new Date(earliestStartTime);

  const payload = {
    summary: {
      total_tests: files.length,
      passed,
      failed: failed + broken,
      skipped,
      duration_ms: totalDuration,
      run_at: runAtDate.toISOString(),
    },
    testCases: testCases, // Adiciona o array de detalhes ao payload
  };
  // --- FIM DA ALTERAÇÃO ---

  console.log(
    `Resumo da execução: ${payload.testCases.length} casos de teste encontrados.`
  );

  try {
    console.log(`Enviando dados para ${API_URL}...`);

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload), // Envia o payload completo
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Erro na API: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    const responseBody = await response.json();
    console.log("Sucesso! Resposta da API:", responseBody);
  } catch (error) {
    console.error("Erro ao enviar os resultados para a API:", error);
    process.exit(1);
  }
}

main();
