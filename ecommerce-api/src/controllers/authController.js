const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Usuário e senha são obrigatórios." });
  }

  try {
    // Verifica se o usuário já existe
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Usuário já cadastrado." });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Salva o novo usuário no banco
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Usuário e senha são obrigatórios." });
  }

  try {
    // Busca o usuário no banco
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." }); // Usuário não encontrado
    }
    const user = users[0];

    // Compara a senha enviada com a senha criptografada no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." }); // Senha incorreta
    }

    // Gera o token JWT
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10m" } // Token expira em 10 minutos
    );

    res.status(200).json({
      message: "Login bem-sucedido!",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
