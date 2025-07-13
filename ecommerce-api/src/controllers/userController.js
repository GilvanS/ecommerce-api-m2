const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, age, city, state, username, password } = req.body;
  if (!name || !age || !city || !state || !username || !password)
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
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

module.exports = {
  register,
  login,
  getProfile,
};
