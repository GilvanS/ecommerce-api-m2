const { expect } = require("chai");
const apiHelper = require("../helpers/api.helper");
const dbHelper = require("../helpers/db.helper");
const { buildUser } = require("../helpers/user.factory");

describe("Cadastro de Usuário", () => {
  let testUser;

  beforeEach(() => {
    testUser = buildUser();
  });

  afterEach(async () => {
    if (testUser) {
      await dbHelper.cleanupUserByUsername(testUser.username);
    }
  });

  it("deve registrar um usuário com dados válidos", async () => {
    const res = await apiHelper.registerUser(testUser);
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal("Usuário registrado com sucesso!");
  });

  it("deve impedir o registro com um username já existente", async () => {
    await apiHelper.registerUser(testUser);
    const res = await apiHelper.registerUser(testUser);
    expect(res.statusCode).to.be.oneOf([400, 409]);
    expect(res.body.message).to.equal("Usuário ou e‑mail já cadastrado.");
  });

  it("deve impedir o registro com um e-mail inválido", async () => {
    const userWithInvalidEmail = buildUser({ email: "email-invalido" });
    testUser = userWithInvalidEmail;
    const res = await apiHelper.registerUser(userWithInvalidEmail);
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal("E‑mail inválido.");
  });

  it("deve impedir o registro com uma senha fraca", async () => {
    const userWithWeakPassword = buildUser({ password: "senha" });
    testUser = userWithWeakPassword;
    const res = await apiHelper.registerUser(userWithWeakPassword);
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.match(/senha.*critérios/i);
  });

  describe("Cadastro de Usuário - Campos Obrigatórios", () => {
    const requiredFields = [
      "name",
      "email",
      "age",
      "city",
      "state",
      "username",
      "password",
    ];

    requiredFields.forEach((field) => {
      it(`deve retornar 400 se o campo '${field}' estiver faltando`, async () => {
        const user = buildUser({ [field]: undefined });
        testUser = user;
        const res = await apiHelper.registerUser(user);
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal("Todos os campos são obrigatórios.");
      });
    });
  });
});
