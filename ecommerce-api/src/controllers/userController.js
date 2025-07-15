const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, age, city, state, username, password } = req.body;
  if (!name || !age || !city || !state || !username || !password)
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });

  // Validação de senha forte
  const isPasswordStrong = (password = "") => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };
  if (!isPasswordStrong(password)) {
    return res
      .status(400)
      .json({ message: "A senha não atende aos critérios de segurança." });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT username FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0)
      return res.status(409).json({ message: "Usuário já cadastrado." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql =
      "INSERT INTO users (name, age, city, state, username, password) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(sql, [name, age, city, state, username, hashedPassword]);

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Usuário e senha são obrigatórios." });
  try {
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length === 0)
      return res.status(401).json({ message: "Credenciais inválidas." });
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Credenciais inválidas." });
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ message: "Login bem-sucedido!", token: `Bearer ${token}` });
  } catch (error) {
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

    res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
const resetPasswordByAdmin = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "A nova senha é obrigatória." });
  }

  try {
    const [targetUsers] = await db.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );
    if (targetUsers.length === 0) {
      return res.status(404).json({ message: "Usuário alvo não encontrado." });
    }
    // Impede que um admin redefina a senha de outro admin
    if (targetUsers[0].role === "admin") {
      return res.status(403).json({
        message: "Não é permitido redefinir a senha de outro administrador.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      userId,
    ]);

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
  getProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  changePassword,
  resetPasswordByAdmin,
};
