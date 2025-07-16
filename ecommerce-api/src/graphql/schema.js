const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    scalar JSON
    type User { id: ID!, name: String, age: Int, city: String, state: String, username: String!, role: String, created_at: String }
    
    type Category {
        id: ID!
        name: String!
        image_url: String
        products: [Product]
    }

    type Product { 
        id: ID!
        name: String!
        description: String
        price: Float!
        discount_price: Float
        rating: Float
        stock: Int!
        imageUrl: String
        category_id: Int
        is_new: Boolean
        is_trending: Boolean
        category: Category
    }

    type OrderItem { product: Product!, quantity: Int!, price_at_purchase: Float! }
    type Order { id: ID!, total_price: Float!, payment_method: String!, shipping_address: JSON!, created_at: String, items: [OrderItem!]! }
    
    type PaginatedProducts {
        products: [Product]
        totalPages: Int
    }
    type PaginatedCategories {
        categories: [Category]
        totalPages: Int
    }
    type PaginatedUsers {
        users: [User]
        totalPages: Int
    }
    type PaginatedOrders {
        orders: [Order]
        totalPages: Int
    }

    type Query {
        product(id: ID!): Product
        "Retorna produtos. Pode filtrar por busca, categoria, ofertas ou ordenar."
        products(search: String, categoryId: ID, onSale: Boolean, sortBy: String, is_trending: Boolean, is_new: Boolean, page: Int, limit: Int): PaginatedProducts
        categories(page: Int, limit: Int): PaginatedCategories
        users(page: Int, limit: Int): PaginatedUsers
        profile: User
        orders(page: Int, limit: Int): PaginatedOrders
        favorites: [Product]
    }

    type Mutation {
        _empty: String
    }
`);
