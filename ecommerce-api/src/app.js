const express_app = require("express");
const cors_app = require("cors");
const { graphqlHTTP } = require("express-graphql");
const userRoutes = require("./routes/userRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const {
  authMiddleware,
  adminMiddleware,
} = require("./middleware/authMiddleware");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const jwt_app = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app_main = express_app();
app_main.use(cors_app());
app_main.use(express_app.json());

/// Configuração do Swagger (NOVO)
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "3.0.0",
      description:
        "API completa para a plataforma de e-commerce, com suporte a REST e GraphQL.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3005",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  // Caminho para os arquivos que contêm as anotações do Swagger
  apis: ["./src/app.js", "./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app_main.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// GraphQL Endpoint
app_main.use(
  "/graphql",
  graphqlHTTP((req) => {
    const authHeader = req.headers.authorization;
    let user = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        user = jwt_app.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        console.log("Token GraphQL inválido");
      }
    }
    return {
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: true,
      context: { user },
    };
  })
);

// REST API Routes
app_main.use("/api/products", productRoutes);
app_main.use("/api/users", userRoutes);
app_main.use("/api/orders", authMiddleware, orderRoutes);
app_main.use("/api/favorites", authMiddleware, favoritesRoutes);
app_main.use(
  "/api/categories",
  authMiddleware,
  adminMiddleware,
  categoryRoutes
);

module.exports = app_main;

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Autenticação e gerenciamento de perfis de usuários
 *   - name: Products
 *     description: Operações de produtos
 *   - name: Orders
 *     description: Criação e consulta de pedidos
 *   - name: Favorites
 *     description: Gerenciamento de favoritos
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
