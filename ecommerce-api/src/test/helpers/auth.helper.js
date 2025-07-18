const request = require("supertest");
const app = require("../../app"); // ajuste o caminho conforme seu projeto

async function getUserToken(username, password) {
  const res = await request(app)
    .post("/api/users/login")
    .send({ username, password });
  return res.body.token;
}
module.exports = { getUserToken };
