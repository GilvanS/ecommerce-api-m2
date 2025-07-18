const { expect } = require("chai");
const apiHelper = require("../helpers/api.helper");
const dbHelper = require("../helpers/db.helper");
const { buildUser } = require("../helpers/user.factory");
const sinon = require("sinon");
const crypto = require("crypto");
const allure = require("allure-js-commons");

describe("Autenticação", () => {
  let testUser;

  before(async () => {
    testUser = buildUser();
    await dbHelper.cleanupUserByUsername(testUser.username);
    await apiHelper.registerUser(testUser);
  });

  after(async () => {
    await dbHelper.cleanupUserByUsername(testUser.username);
  });

  describe("User Login - Dados válidos", () => {
    it("deve autenticar com sucesso com credenciais válidas", async () => {
      allure.description(
        "Este teste verifica se um usuário com credenciais corretas consegue se autenticar e receber um token JWT."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      const res = await apiHelper.loginUser({
        username: testUser.username,
        password: testUser.password,
      });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("token");
    });
  });

  describe("User Login - Dados inválidos", () => {
    it("deve rejeitar login com senha incorreta", async () => {
      allure.description(
        "Este teste verifica se um usuário com credenciais inválidas consegue se autenticar e receber um token JWT."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      const res = await apiHelper.loginUser({
        username: testUser.username,
        password: "Wrong@123",
      });
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal("Credenciais inválidas.");
    });

    it("deve retornar erro quando o usuário não existe", async () => {
      allure.description(
        "Este teste verifica se um usuário inexistente consegue se autenticar e receber um token JWT."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");
      const res = await apiHelper.loginUser({
        username: "nonexistentuser",
        password: "anypassword",
      });
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal("Credenciais inválidas.");
    });

    it("deve retornar 400 quando 'username' não for enviado", async () => {
      allure.description(
        "Este teste verifica a obrigatoriedade do campo username quando submetido ao login."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      const res = await apiHelper.loginUser({ password: testUser.password });
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.include("Usuário e senha são obrigatórios.");
    });

    it("deve retornar 400 quando 'password' não for enviado", async () => {
      allure.description(
        "Este teste verifica a obrigatoriedade do campo password quando submetido ao login."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      const res = await apiHelper.loginUser({ username: testUser.username });
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.include("Usuário e senha são obrigatórios.");
    });
  });

  describe("User Login - Bloqueio de Conta", () => {
    let tempUser;
    beforeEach(async () => {
      tempUser = buildUser();
      await dbHelper.cleanupUserByUsername(tempUser.username);
      await apiHelper.registerUser(tempUser);
    });

    afterEach(async () => {
      await dbHelper.cleanupUserByUsername(tempUser.username);
    });

    it("deve bloquear a conta após 3 tentativas de login falhas", async () => {
      allure.description(
        "Este teste verifica se um usuário é bloqueado ao falhar 3 vezes a tentativa de login."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      for (let i = 0; i < 3; i++) {
        await apiHelper.loginUser({
          username: tempUser.username,
          password: "Wrong@123",
        });
      }
      const resLocked = await apiHelper.loginUser({
        username: tempUser.username,
        password: tempUser.password,
      });
      expect(resLocked.statusCode).to.equal(403);
      expect(resLocked.body.error.code).to.equal("ACCOUNT_LOCKED");
    });
  });

  describe("User Login - SQL Injection", () => {
    it("deve prevenir tentativas de SQL injection", async () => {
      allure.description(
        "Este teste verifica se um usuário consegue se autenticar e receber um token JWT utilizando comandos SQL."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      const res = await apiHelper.loginUser({
        username: "' OR '1'='1",
        password: "' OR '1'='1",
      });
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal("Credenciais inválidas.");
    });
  });

  describe("Password Recovery", () => {
    // Hooks para limpar os stubs do sinon após cada teste, garantindo o isolamento
    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar uma mensagem genérica ao solicitar recuperação de senha", async () => {
      allure.description(
        "Este teste verifica se um usuário recebe uma mensagem genérica ao solicitar redefinição de senha."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      // Este teste não precisa de stub, pois valida o comportamento padrão de segurança da API.
      const res = await apiHelper.forgotPassword("qualquer-email@teste.com");
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal(
        "Se um utilizador com este e-mail existir, um link de redefinição foi enviado."
      );
    });

    it("deve permitir redefinição de senha com token válido", async () => {
      allure.description(
        "Este teste verifica se um usuário consegue redifinir com sucesso sua senha."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      // --- INÍCIO DO STUB ---
      // 1. Criamos um utilizador real para o fluxo completo
      const testUser = buildUser();
      await dbHelper.cleanupUserByUsername(testUser.username);
      await apiHelper.registerUser(testUser);

      // 2. Definimos um token previsível que será gerado
      const knownRawToken = "token_previsivel_e_seguro_para_o_teste_123";

      // 3. Criamos o stub: quando a aplicação chamar `crypto.randomBytes`,
      //    ela receberá o nosso token previsível em vez de um aleatório.
      sinon.stub(crypto, "randomBytes").returns(Buffer.from(knownRawToken));

      // 4. Chamamos a função de esqueci a senha. A aplicação agora usará nosso token previsível.
      await apiHelper.forgotPassword(testUser.email);
      // --- FIM DO STUB ---

      // 5. Preparamos o token para a chamada à API (geralmente em formato hexadecimal)
      const tokenForApi = Buffer.from(knownRawToken).toString("hex");
      const newPassword = "NewPassword@123";

      // 6. Executamos a redefinição de senha com o nosso token agora válido
      const res = await apiHelper.resetPassword(tokenForApi, newPassword);

      expect(
        res.statusCode,
        `A redefinição falhou: ${res.body.message}`
      ).to.equal(200);
      expect(res.body.message).to.include("Senha redefinida com sucesso.");

      // 7. Verificação final: tentamos fazer login com a nova senha
      const loginRes = await apiHelper.loginUser({
        username: testUser.username,
        password: newPassword,
      });

      expect(
        loginRes.statusCode,
        `Login falhou: ${loginRes.body.message}`
      ).to.equal(200);
      expect(loginRes.body).to.have.property("token");

      // Limpeza do utilizador criado
      await dbHelper.cleanupUserByUsername(testUser.username);
    });

    it("deve rejeitar redefinição de senha com token inválido", async () => {
      allure.description(
        "Este teste verifica se um usuário é impedido de redefinir a senha com um token de recuperação de senha inválido."
      );
      allure.owner("QA - Chris C. Santos");
      allure.tag("Segurança", "Login");

      // Este teste não precisa de stub, pois valida a rejeição de um token заведомо inválido.
      const res = await apiHelper.resetPassword(
        "invalid-token",
        "NewPassword@123"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Token inválido ou expirado.");
    });
  });
});
