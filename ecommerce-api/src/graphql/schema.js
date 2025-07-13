const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    scalar JSON
    type User { id: ID!, name: String!, age: Int!, city: String!, state: String!, username: String!, role: String, created_at: String }
    type Product { id: ID!, name: String!, description: String, price: Float!, stock: Int!, imageUrl: String, category_id: Int }
    type OrderItem { product: Product!, quantity: Int!, price_at_purchase: Float! }
    type Order { id: ID!, total_price: Float!, payment_method: String!, shipping_address: JSON!, created_at: String, items: [OrderItem!]! }
    
    type Category {
        id: ID!
        name: String!
        image_url: String
    }

    type Query {
        "Retorna produtos. Pode filtrar por um termo de busca."
        products(search: String): [Product]
        
        "Retorna todas as categorias de produtos."
        categories: [Category]

        "Retorna o perfil do usuário autenticado"
        profile: User
        
        "Retorna o histórico de pedidos do usuário autenticado"
        orders: [Order]
        
        "Retorna os favoritos de produtos do usuário autenticado"
        favorites: [Product]
    }

    # As mutações permanecem em endpoints REST e não são definidas aqui.
    type Mutation {
        _empty: String
    }
`);
