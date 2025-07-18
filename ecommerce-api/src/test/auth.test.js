const { expect } = require("chai");
const sinon = require("sinon");
const apiHelper = require("./helpers/api.helper");
const dbHelper = require("./helpers/db.helper");
const { describe } = require("mocha");
const request = require("supertest");
const app = require("../app");
const { getUserToken } = require("./helpers/auth.helper");

describe("Authentication Endpoints", () => {
  let adminToken;
  const testUser = {
    name: "Test User",
    email: "test.user@example.com",
    age: 30,
    city: "Testville",
    state: "TS",
    username: "testuser",
    password: "Password@123",
  };

  before(async () => {
    await dbHelper.cleanupUserByUsername(testUser.username);
    await apiHelper.registerUser(testUser);
    adminToken = await apiHelper.loginUser({
      username: "admin",
      password: "Admin@123",
    });
  });

  after(async () => {
    await dbHelper.cleanupUserByUsername(testUser.username);
  });

  describe("User Login - Successo", () => {
    it("deve autenticar com sucesso com credenciais válidas", async () => {
      const res = await apiHelper.loginUser({
        username: testUser.username,
        password: testUser.password,
      });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("token");
    });
  });

  describe("User Login - Credenciais Inválidas", () => {
    it("deve rejeitar login com senha incorreta", async () => {
      const res = await apiHelper.loginUser({
        username: testUser.username,
        password: "Wrong@123",
      });

      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal("Credenciais inválidas.");
    });

    it("deve retornar erro quando o usuário não existe", async () => {
      const res = await apiHelper.loginUser({
        username: "nonexistent",
        password: testUser.password,
      });
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal("Credenciais inválidas.");
    });

    it("deve retornar 400 quando 'username' não for enviado", async () => {
      const res = await apiHelper.loginUser({
        password: testUser.password,
      });

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.include("Usuário e senha são obrigatórios.");
    });

    it("deve retornar 400 quando 'password' não for enviado", async () => {
      const res = await apiHelper.loginUser({
        username: testUser.username,
      });

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.include("Usuário e senha são obrigatórios.");
    });
  });

  describe("User Login - Bloqueio de conta", () => {
    beforeEach(async () => {
      await dbHelper.cleanupUserByUsername(testUser.username);
      await apiHelper.registerUser(testUser);
    });
    it("deve bloquear a conta após 3 tentativas de login falhas", async () => {
      // Três primeiras falhas retornam 401
      for (let i = 0; i < 3; i++) {
        const resFail = await apiHelper.loginUser({
          username: testUser.username,
          password: "Wrong@123",
        });
        expect(resFail.statusCode).to.equal(401);
        expect(resFail.body.message).to.equal("Credenciais inválidas.");
      }

      // Quarta tentativa indica conta bloqueada
      const resLocked = await apiHelper.loginUser({
        username: testUser.username,
        password: testUser.password,
      });
      expect(resLocked.statusCode).to.equal(403);
      expect(resLocked.body.error.code).to.equal("ACCOUNT_LOCKED");
      expect(resLocked.body.error.message).to.include("Conta bloqueada");
    });
  });

  describe("User Login - SQL Injection", () => {
    it("deve prevenir tentativas de SQL injection", async () => {
      const res = await apiHelper.loginUser({
        username: "' OR '1'='1",
        password: "' OR '1'='1",
      });
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal("Credenciais inválidas.");
    });
  });

  describe("User Endpoints - Method Not Allowed", () => {
    it("deve retornar 405 para GET em /api/users/register", async () => {
      const res = await request(app).get("/api/users/register");
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para PUT em /api/users/register", async () => {
      const res = await request(app)
        .put("/api/users/register")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para DELETE em /api/users/register", async () => {
      const res = await request(app)
        .delete("/api/users/register")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para GET em /api/users/login", async () => {
      const res = await request(app)
        .get("/api/users/login")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para PUT em /api/users/login", async () => {
      const res = await request(app)
        .put("/api/users/login")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para DELETE em /api/users/login", async () => {
      const res = await request(app)
        .delete("/api/users/login")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });
  });

  describe("Categories Endpoints - Method Not Allowed", () => {
    it("deve retornar 405 para GET em /api/categories", async () => {
      const res = await request(app)
        .get("/api/categories")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para PUT em /api/categories", async () => {
      const res = await request(app)
        .put("/api/categories")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para DELETE em /api/categories", async () => {
      const res = await request(app)
        .delete("/api/categories")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para POST em /api/categories/:id", async () => {
      const res = await request(app)
        .post("/api/categories/1")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para GET em /api/categories/:id", async () => {
      const res = await request(app)
        .get("/api/categories/1")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });
  });

  describe("Favorites Endpoints - Method Not Allowed", () => {
    it("deve retornar 405 para GET em /api/favorites/:productId", async () => {
      const res = await request(app)
        .get("/api/favorites/1")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para PUT em /api/favorites/:productId", async () => {
      const res = await request(app)
        .put("/api/favorites/1")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para DELETE em /api/favorites/:productId", async () => {
      const res = await request(app)
        .delete("/api/favorites/1")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });
  });

  describe("Order Endpoints - Method Not Allowed", () => {
    it("deve retornar 405 para PUT em /api/orders", async () => {
      const res = await request(app)
        .put("/api/orders")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para DELETE em /api/orders", async () => {
      const res = await request(app)
        .delete("/api/orders")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });
  });

  describe("Product Endpoints - Method Not Allowed", () => {
    it("deve retornar 405 para PUT em /api/products", async () => {
      const res = await request(app)
        .put("/api/products")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para DELETE em /api/products", async () => {
      const res = await request(app)
        .delete("/api/products")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para GET em /api/products/:id", async () => {
      const res = await request(app)
        .get("/api/products/1")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });

    it("deve retornar 405 para POST em /api/products/:id", async () => {
      const res = await request(app)
        .post("/api/products/1")
        .set("Authorization", `${adminToken.body.token}`);
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });
  });

  describe("Recuperação de Senha", () => {
    it("deve retornar uma mensagem genérica ao solicitar recuperação de senha", async () => {
      const res = await apiHelper.forgotPassword(testUser.email);
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal(
        "Se um utilizador com este e-mail existir, um link de redefinição foi enviado."
      );
    });

    it("deve retornar 400 quando 'email' não for enviado na recuperação de senha", async () => {
      const resEmpty = await apiHelper.forgotPassword("");
      expect(resEmpty.statusCode).to.equal(400);
      expect(resEmpty.body.message).to.include(
        "O campo de e-mail é obrigatório."
      );
    });
  });

  describe("Recuperação de Senha - Token", () => {
    let resetToken;
    let cryptoStub;

    before(() => {
      const crypto = require("crypto");
      cryptoStub = sinon
        .stub(crypto, "randomBytes")
        .returns(Buffer.alloc(32, 0));
    });

    before(async () => {
      await apiHelper.forgotPassword(testUser.email);
      resetToken = Buffer.alloc(32, 0).toString("hex");
    });

    after(() => {
      cryptoStub.restore();
    });

    it("deve rejeitar redefinição de senha com token inválido", async () => {
      const res = await apiHelper.resetPassword(
        "invalid.token",
        "NewPassword@123"
      );
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Token inválido ou expirado.");
    });

    it("deve permitir redefinição de senha com token válido", async () => {
      const res = await apiHelper.resetPassword(resetToken, "NewPassword@123");
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.include("Senha redefinida com sucesso.");
    });
  });
});
