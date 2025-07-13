# API de Carrinho de Compras para E-commerce

Esta é uma API de exemplo construída com Node.js, Express, MySQL e GraphQL. Ela fornece funcionalidades RESTful e GraphQL para gerenciar um carrinho de compras e foi desenvolvida para fins de estudo, especialmente para a prática de testes de software.

## ✨ Funcionalidades

- **API REST & GraphQL:** Suporte duplo para manipulação de dados.
- **Gerenciamento de Carrinho:** Adicionar, remover, atualizar e listar itens.
- **Documentação:** API REST documentada com Swagger (OpenAPI).
- **Estrutura Modular:** Código organizado para fácil entendimento e manutenção.

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [GraphQL](https://graphql.org/)
- [Swagger](https://swagger.io/) para documentação da API REST.
- [dotenv](https://www.npmjs.com/package/dotenv) para gerenciamento de variáveis de ambiente.
- [mysql2](https://www.npmjs.com/package/mysql2) como driver do MySQL.

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto em execução na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn
- Uma instância do MySQL em execução

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd e-commerce-cart-api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo de `.env.example`, e preencha com suas credenciais do MySQL.

    ```
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=ecommerce_cart_db
    ```

4.  **Configure o Banco de Dados:**
    Execute o script SQL localizado em `database/schema.sql` no seu cliente MySQL para criar as tabelas e popular com dados de exemplo.

5.  **Inicie o servidor:**
    ```bash
    npm start
    ```
    O servidor estará em execução em `http://localhost:3000`.

## 🕹️ Como Usar

### API REST (com Swagger)

A documentação interativa do Swagger está disponível para testar os endpoints REST.

- **URL do Swagger:** `http://localhost:3000/api-docs`

**Exemplos com cURL:**

- **Listar itens do carrinho `cart-test-123`:**

  ```bash
  curl -X GET http://localhost:3000/api/carts/cart-test-123
  ```

- **Adicionar um produto ao carrinho:**
  ```bash
  curl -X POST http://localhost:3000/api/carts/cart-test-123/items \
  -H "Content-Type: application/json" \
  -d '{ "productId": 4, "quantity": 1 }'
  ```

### API GraphQL

Use um cliente GraphQL (como Insomnia, Postman ou o GraphiQL embutido) para interagir com o endpoint.

- **URL do GraphQL Playground:** `http://localhost:3000/graphql`

**Exemplo de Query:**

```graphql
query GetCart {
  cart(id: "cart-test-123") {
    id
    total
    items {
      id
      quantity
      product {
        name
        price
      }
    }
  }
}
```

**Exemplo de Mutation:**

```graphql
mutation AddItem {
  addItemToCart(cartId: "cart-test-123", productId: 2, quantity: 1) {
    id
    total
    items {
      product {
        name
      }
      quantity
    }
  }
}
```
