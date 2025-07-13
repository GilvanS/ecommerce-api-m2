const express_app = require("express");
const cors_app = require("cors");
const { graphqlHTTP } = require("express-graphql");
const userRoutes = require("./routes/userRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const jwt_app = require("jsonwebtoken");

const app_main = express_app();
app_main.use(cors_app());
app_main.use(express_app.json());

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

module.exports = app_main;

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Autenticação e gerenciamento de perfis de usuários
 *   - name: Orders
 *     description: Criação e consulta de pedidos
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Registra um novo usuário com perfil completo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - city
 *               - state
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               age:
 *                 type: integer
 *                 example: 30
 *               city:
 *                 type: string
 *                 example: "São Paulo"
 *               state:
 *                 type: string
 *                 example: "SP"
 *               username:
 *                 type: string
 *                 example: "joao123"
 *               password:
 *                 type: string
 *                 example: "Senha@123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados incompletos
 *       409:
 *         description: Usuário já existe
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Autentica um usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "joao123"
 *               password:
 *                 type: string
 *                 example: "Senha@123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Retorna o perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Retorna o histórico de pedidos do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Cria um novo pedido a partir do carrinho
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cart, paymentMethod, shippingAddress]
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [id, quantity, price]
 *                   properties:
 *                     id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *               paymentMethod:
 *                 type: string
 *                 example: credit_card
 *               shippingAddress:
 *                 type: object
 *                 required: [cpf, address, number, cep, city]
 *                 properties:
 *                   cpf:
 *                     type: string
 *                   address:
 *                     type: string
 *                   number:
 *                     type: string
 *                   cep:
 *                     type: string
 *                   city:
 *                     type: string
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados do pedido incompletos
 */

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operações públicas para visualização de produtos
 *   - name: Users
 *     description: Autenticação e gerenciamento de perfis de usuários
 *   - name: Orders
 *     description: Criação e consulta de pedidos (requer autenticação)
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Retorna uma lista de todos os produtos disponíveis
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
