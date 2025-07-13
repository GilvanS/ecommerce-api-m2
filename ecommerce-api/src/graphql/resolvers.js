const db_gql = require("../config/database");
const jwt_gql = require("jsonwebtoken");

module.exports = {
  products: async ({ search }) => {
    let sql = "SELECT * FROM products WHERE stock > 0";
    const params = [];
    if (search) {
      sql += " AND name LIKE ?";
      params.push(`%${search}%`);
    }
    const [products] = await db_gql.query(sql, params);
    return products;
  },

  categories: async () => {
    const [categories] = await db_gql.query("SELECT * FROM categories");
    return categories;
  },

  profile: async (args, context) => {
    if (!context.user) throw new Error("Não autenticado.");
    const [users] = await db_gql.query(
      "SELECT id, name, age, city, state, username, role, created_at FROM users WHERE id = ?",
      [context.user.id]
    );
    if (users.length === 0) throw new Error("Usuário não encontrado.");
    return users[0];
  },

  orders: async (args, context) => {
    if (!context.user) throw new Error("Não autenticado.");
    const userId = context.user.id;
    const sql = `
            SELECT o.id, o.total_price, o.payment_method, o.shipping_address, o.created_at,
                   oi.quantity, oi.price as price_at_purchase,
                   p.id as product_id, p.name as product_name, p.imageUrl as product_imageUrl
            FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ? ORDER BY o.created_at DESC;
        `;
    const [rows] = await db_gql.query(sql, [userId]);
    if (rows.length === 0) return [];

    const orders = rows.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          total_price: row.total_price,
          payment_method: row.payment_method,
          shipping_address: JSON.parse(row.shipping_address),
          created_at: row.created_at,
          items: [],
        };
      }
      acc[row.id].items.push({
        quantity: row.quantity,
        price_at_purchase: row.price_at_purchase,
        product: {
          id: row.product_id,
          name: row.product_name,
          imageUrl: row.product_imageUrl,
        },
      });
      return acc;
    }, {});
    return Object.values(orders);
  },
  favorites: async (args, context) => {
    if (!context.user) throw new Error("Não autenticado.");
    const userId = context.user.id;
    const sql = `
            SELECT p.* FROM products p 
            JOIN favorites f ON p.id = f.product_id 
            WHERE f.user_id = ?`;
    const [products] = await db_gql.query(sql, [userId]);
    return products;
  },
};
