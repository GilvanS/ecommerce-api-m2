/*
================================================================================
ARQUIVO: src/config/mailer.js (NOVO)
================================================================================
*/
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configura o "transportador" de e-mail usando as credenciais do .env
// NOTA: Para o Gmail, pode ser necessário criar uma "Senha de App" se a autenticação de 2 fatores estiver ativa.
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT, 10),
  secure: process.env.MAIL_SECURE === "true", // true para a porta 465, false para outras
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Função para enviar um e-mail.
 * @param {string} to - O destinatário do e-mail.
 * @param {string} subject - O assunto do e-mail.
 * @param {string} html - O corpo do e-mail em HTML.
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"MerQAdo Livre" <${process.env.MAIL_USER}>`, // Remetente
      to,
      subject,
      html,
    });
    console.log("E-mail de redefinição de senha enviado para:", to);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    // Em um ambiente de produção, você pode querer um tratamento de erro mais robusto aqui.
    throw new Error(
      "Não foi possível enviar o e-mail de redefinição de senha."
    );
  }
};

module.exports = { sendEmail };
