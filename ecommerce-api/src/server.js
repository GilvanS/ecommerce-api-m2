require("dotenv").config();
const server_app_main = require("./app");
const PORT = process.env.PORT || 3005;
server_app_main.listen(PORT, () => {
  console.log(`Servidor back-end v3 rodando na porta ${PORT}`);
  console.log(`GraphQL Playground em http://localhost:${PORT}/graphql`);
});
