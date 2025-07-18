const { expect } = require("chai");
const request = require("supertest");
const app = require("../../app");
const apiHelper = require("../helpers/api.helper");
require("dotenv").config();

describe("API Routes - Method Not Allowed", () => {
  let adminToken;

  before(async () => {
    const res = await apiHelper.loginUser({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASSWORD,
    });
    if (res.body.token) {
      adminToken = `${res.body.token}`;
    }
  });

  const testCases = [
    // User Endpoints
    { method: "get", path: "/api/users/register" },
    { method: "put", path: "/api/users/register" },
    { method: "delete", path: "/api/users/register" },
    { method: "get", path: "/api/users/login" },
    { method: "put", path: "/api/users/login" },
    { method: "delete", path: "/api/users/login" },
    // Categories Endpoints
    { method: "get", path: "/api/categories" },
    { method: "put", path: "/api/categories" },
    { method: "delete", path: "/api/categories" },
    { method: "post", path: "/api/categories/1" },
    { method: "get", path: "/api/categories/1" },
    // Favorites Endpoints
    { method: "get", path: "/api/favorites/1" },
    { method: "put", path: "/api/favorites/1" },
    { method: "delete", path: "/api/favorites/1" },
    // Order Endpoints
    { method: "put", path: "/api/orders" },
    { method: "delete", path: "/api/orders" },
    // Products Endpoints
    { method: "put", path: "/api/products" },
    { method: "delete", path: "/api/products" },
    { method: "get", path: "/api/products/1" },
    { method: "post", path: "/api/products/1" },
  ];

  testCases.forEach(({ method, path }) => {
    it(`deve retornar 405 para ${method.toUpperCase()} em ${path}`, async () => {
      const res = await request(app)
        [method](path)
        .set("Authorization", adminToken || "");
      expect(res.statusCode).to.equal(405);
      expect(res.body.error.code).to.equal("METHOD_NOT_ALLOWED");
    });
  });
});
