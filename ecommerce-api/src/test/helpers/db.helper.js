const db = require("../../config/database");

/**
 * Limpa um usuário da base de dados pelo seu username,
 * garantindo estado inicial limpo para os testes.
 */
const cleanupUserByUsername = async (username) => {
  try {
    await db.query("DELETE FROM users WHERE username = ?", [username]);
  } catch (err) {
    console.error(`Erro ao limpar usuário ${username}:`, err);
    throw err;
  }
};

/**
 * Retorna o último token de recuperação gerado para um email,
 * considerando a tabela `password_reset_tokens`.
 * Faz join com `users` para relacionar email a user_id.
 * @param {string} email
 * @returns {Promise<string>} token de reset
 */
const getLatestResetToken = async (email) => {
  const query = `
    SELECT prt.token
    FROM password_reset_tokens prt
    JOIN users u ON u.id = prt.user_id
    WHERE u.email = ?
    ORDER BY prt.created_at DESC
    LIMIT 1
  `;
  const [rows] = await db.query(query, [email]);
  if (!rows.length) {
    throw new Error(`Nenhum token de reset encontrado para ${email}`);
  }
  return rows[0].token;
};

module.exports = {
  cleanupUserByUsername,
  getLatestResetToken,
};
