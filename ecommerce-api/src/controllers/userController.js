const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../config/mailer");
const { logAudit } = require("../utils/logger");

const isPasswordStrong = (password = "") => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};
const register = async (req, res) => {
  const { name, age, city, state, username, email, password } = req.body;
  if (!name || !age || !city || !state || !username || !email || !password)
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "E‑mail inválido." });
  }

  if (!isPasswordStrong(password)) {
    return res
      .status(400)
      .json({ message: "A senha não atende aos critérios de segurança." });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT username FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0)
      return res
        .status(409)
        .json({ message: "Usuário ou e‑mail já cadastrado." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql =
      "INSERT INTO users (name, age, city, state, username, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await db.query(sql, [
      name,
      age,
      city,
      state,
      username,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Usuário e senha são obrigatórios." });
  }

  const LOCKOUT_DURATION_MINUTES = 15;
  const MAX_LOGIN_ATTEMPTS = 3;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const user = users[0];

    // 1. Verifica se a conta está bloqueada
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const lockedUntil = new Date(user.locked_until);
      return res.status(403).json({
        error: {
          code: "ACCOUNT_LOCKED",
          message: `Conta bloqueada devido a múltiplas tentativas de login falhas. Tente novamente às ${lockedUntil.toLocaleTimeString(
            "pt-BR"
          )}.`,
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // 2. Login bem-sucedido: reseta as tentativas de falha
      if (user.failed_login_attempts > 0) {
        await db.query(
          "UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE id = ?",
          [user.id]
        );
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "Login bem-sucedido!", token: `Bearer ${token}` });
    } else {
      // 3. Login com falha: incrementa as tentativas e bloqueia se necessário
      const newAttempts = user.failed_login_attempts + 1;

      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        const lockedUntil = new Date();
        lockedUntil.setMinutes(
          lockedUntil.getMinutes() + LOCKOUT_DURATION_MINUTES
        );

        await db.query(
          "UPDATE users SET failed_login_attempts = ?, locked_until = ? WHERE id = ?",
          [newAttempts, lockedUntil, user.id]
        );

        logAudit({
          actorId: user.id,
          actorName: user.username,
          action: "ACCOUNT_LOCKED",
          details: { attempts: newAttempts },
        });
      } else {
        await db.query(
          "UPDATE users SET failed_login_attempts = ? WHERE id = ?",
          [newAttempts, user.id]
        );
      }

      return res.status(401).json({ message: "Credenciais inválidas." });
    }
  } catch (error) {
    console.error("Erro no processo de login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "O campo de e-mail é obrigatório." });
  }

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      // Responde com sucesso mesmo que o e-mail não exista para não confirmar a existência de contas
      return res.status(200).json({
        message:
          "Se um utilizador com este e-mail existir, um link de redefinição foi enviado.",
      });
    }
    const user = users[0];

    // Gera um token seguro
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Define a data de expiração para 1 hora
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora a partir de agora

    await db.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [user.id, hashedToken, expiresAt]
    );

    // ATENÇÃO: Altere 'http://localhost:3000' para o URL do seu front-end
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    const emailHtml = `<p>Você solicitou uma redefinição de senha. Por favor, clique no link a seguir para redefinir sua senha: <a href="${resetUrl}">${resetUrl}</a></p>`;

    await sendEmail({
      to: user.email,
      subject: "Redefinição de Senha - MerQAdo Livre",
      html: emailHtml,
    });

    res.status(200).json({
      message:
        "Se um utilizador com este e-mail existir, um link de redefinição foi enviado.",
    });
  } catch (error) {
    console.error("Erro no processo de forgotPassword:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "A nova senha e a confirmação são obrigatórias." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem." });
  }
  if (!isPasswordStrong(password)) {
    return res
      .status(400)
      .json({ message: "A nova senha não atende aos critérios de segurança." });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const [tokens] = await db.query(
      "SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > NOW()",
      [hashedToken]
    );

    if (tokens.length === 0) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }
    const tokenData = tokens[0];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      tokenData.user_id,
    ]);

    // Deleta o token para que não possa ser reutilizado
    await db.query("DELETE FROM password_reset_tokens WHERE id = ?", [
      tokenData.id,
    ]);

    res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro no processo de resetPassword:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const getProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, age, city, state, username, role, created_at FROM users WHERE id = ?",
      [req.user.id]
    );
    if (users.length === 0)
      return res.status(404).json({ message: "Usuário não encontrado." });
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, username, role FROM users"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários." });
  }
};
const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role || (role !== "admin" && role !== "customer")) {
    return res.status(400).json({ message: "Papel (role) inválido." });
  }
  try {
    await db.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    logAudit({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "USER_ROLE_UPDATED",
      details: { targetUserId: id, newRole: role },
    });
    res
      .status(200)
      .json({ message: "Papel do usuário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar papel do usuário." });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  // Impede que um admin exclua a si mesmo
  if (parseInt(id, 10) === req.user.id) {
    return res
      .status(403)
      .json({ message: "Administradores não podem excluir a própria conta." });
  }
  try {
    // Verifica se o usuário tem pedidos associados
    const [orders] = await db.query("SELECT id FROM orders WHERE user_id = ?", [
      id,
    ]);
    if (orders.length > 0) {
      return res.status(400).json({
        message: "Não é possível excluir usuário com histórico de pedidos.",
      });
    }
    await db.query("DELETE FROM favorites WHERE user_id = ?", [id]); // Limpa favoritos primeiro
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    logAudit({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "USER_DELETED",
      details: { targetUserId: id },
    });
    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir usuário." });
  }
};
const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Todos os campos de senha são obrigatórios." });
  }
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "A nova senha e a confirmação não correspondem." });
  }

  try {
    const [users] = await db.query("SELECT password FROM users WHERE id = ?", [
      userId,
    ]);
    if (users.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    const user = users[0];

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "A senha antiga está incorreta." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      userId,
    ]);
    logAudit({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "USER_PASSWORD_CHANGED",
      details: { userId: req.user.id },
    });

    res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
resetPasswordByAdmin = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  // CORREÇÃO: Aplica a validação de senha forte
  if (!newPassword || !isPasswordStrong(newPassword)) {
    return res.status(400).json({
      error: {
        code: "WEAK_PASSWORD",
        message:
          "A nova senha é obrigatória e deve atender aos critérios de segurança.",
      },
    });
  }

  try {
    const [targetUsers] = await db.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );
    if (targetUsers.length === 0) {
      return res.status(404).json({ message: "Usuário alvo não encontrado." });
    }
    if (targetUsers[0].role === "admin") {
      return res.status(403).json({
        message: "Não é permitido redefinir a senha de outro administrador.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);
    logAudit({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "ADMIN_PASSWORD_RESET",
      details: { targetUserId: req.params.userId },
    });
    res.status(200).json({
      message: "Senha do usuário redefinida com sucesso pelo administrador.",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha pelo admin:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  getAllUsers,
  updateUserRole,
  changePassword,
  resetPasswordByAdmin,
  deleteUser,
};
