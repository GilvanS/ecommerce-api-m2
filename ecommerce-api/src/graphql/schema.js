const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    scalar JSON
    
    type User { id: ID!, name: String, age: Int, city: String, state: String, username: String!, role: String, created_at: String }
    type Product { id: ID!, name: String!, description: String, price: Float!, stock: Int!, imageUrl: String, category_id: Int, is_new: Boolean, is_trending: Boolean, category: Category }
    type OrderItem { product: Product!, quantity: Int!, price_at_purchase: Float! }
    type Order { id: ID!, total_price: Float!, payment_method: String!, shipping_address: JSON!, created_at: String, items: [OrderItem!]! }
    type Category { id: ID!, name: String!, image_url: String, products: [Product] }

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
        products(search: String, page: Int, limit: Int): PaginatedProducts
        categories(page: Int, limit: Int): PaginatedCategories
        users(page: Int, limit: Int): PaginatedUsers
        profile: User
        orders(page: Int, limit: Int): PaginatedOrders
        favorites: [Product]
    }

    type Mutation { _empty: String }
`);
