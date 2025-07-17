/*
================================================================================
ARQUIVO: src/server.js (ATUALIZADO E CORRIGIDO)
================================================================================
*/
require("dotenv").config();
const app = require("./app");
const db = require("./config/database");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 3005;

// Função para garantir que o usuário admin exista com a senha correta
const ensureAdminExists = async () => {
  try {
    const adminUsername = "admin";
    const adminPassword = "Admin@123"; // A senha em texto plano

    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      adminUsername,
    ]);

    if (users.length === 0) {
      console.log(
        "Usuário admin não encontrado. Criando novo usuário admin..."
      );
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const sql =
        "INSERT INTO users (name, age, city, state, username, password, role, email) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
      await db.query(sql, [
        "Admin Principal",
        99,
        "Sistema",
        "SP",
        adminUsername,
        hashedPassword,
        "admin",
        "chriscsantos.qa@gmail.com",
      ]);
      console.log("Usuário admin criado com sucesso!");
    } else {
      // Opcional, mas recomendado: Verifica se a senha do admin existente está correta e a atualiza se não estiver
      const adminUser = users[0];
      const isMatch = await bcrypt.compare(adminPassword, adminUser.password);
      if (!isMatch) {
        console.log("Senha do admin está desatualizada. Atualizando...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        // CORREÇÃO: Usando a variável correta 'hashedPassword'
        await db.query("UPDATE users SET password = ? WHERE id = ?", [
          hashedPassword,
          adminUser.id,
        ]);
        console.log("Senha do admin atualizada com sucesso!");
      }
    }
  } catch (error) {
    console.error("Erro ao verificar/criar usuário admin:", error);
    // Encerra o processo se não conseguir garantir o admin, pois é crítico
    process.exit(1);
  }
};

const startServer = async () => {
  // Garante que o admin exista antes de o servidor começar a aceitar conexões
  await ensureAdminExists();

  app.listen(PORT, () => {
    console.log(`Servidor back-end v3.1 rodando na porta ${PORT}`);
    console.log(`GraphQL Playground em http://localhost:${PORT}/graphql`);
  });
};

startServer();
