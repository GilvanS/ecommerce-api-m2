const { sendEmail } = require("../../config/mailer");

/**
 * Envia e-mail de redefinição de senha para o usuário.
 * @param {string} email - E-mail do destinatário.
 * @param {string} token - Token de redefinição de senha.
 */
async function sendPasswordReset(email, token) {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const resetLink = `${frontendUrl}/reset-password?token=${token}`;
  const html = `
    <p>Olá,</p>
    <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
    <p><a href="${resetLink}">${resetLink}</a></p>
    <p>Se você não solicitou essa ação, ignore este e-mail.</p>
  `;
  await sendEmail({
    to: email,
    subject: "Redefinição de Senha",
    html,
  });
}

module.exports = { sendPasswordReset, sendEmail };
