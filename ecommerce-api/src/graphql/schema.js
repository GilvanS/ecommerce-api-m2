const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    scalar JSON
    type User { id: ID!, name: String!, age: Int!, city: String!, state: String!, username: String!, role: String, created_at: String }
    type Product { 
        id: ID!, 
        name: String!, 
        description: String, 
        price: Float!,
        stock: Int!, 
        imageUrl: String, 
        category_id: Int,
        is_new: Boolean,
        is_trending: Boolean,
        category: Category
    }
    type OrderItem { product: Product!, quantity: Int!, price_at_purchase: Float! }
    type Order { id: ID!, total_price: Float!, payment_method: String!, shipping_address: JSON!, created_at: String, items: [OrderItem!]! }
    type Category { id: ID!, name: String!, image_url: String, products: [Product] }

    "Estrutura para respostas paginadas"
    type PaginatedOrders {
        orders: [Order]
        totalCount: Int
        totalPages: Int
    }

    type Query {
        products(search: String): [Product]
        categories: [Category]
        profile: User
        "Retorna o histórico de pedidos paginado do usuário autenticado"
        orders(page: Int, limit: Int): PaginatedOrders
        favorites: [Product]
                "Retorna todos os usuários (apenas para administradores)"
        getAllUsers: [User]
    }

    type Mutation { _empty: String }
`);
