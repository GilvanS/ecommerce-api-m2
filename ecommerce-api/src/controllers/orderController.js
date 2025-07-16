/*
================================================================================
ARQUIVO: src/controllers/orderController.js (ATUALIZADO)
================================================================================
*/
const db = require("../config/database");

exports.createOrder = async (req, res) => {
  const { cart, paymentMethod, shippingAddress } = req.body;
  const userId = req.user.id;

  if (
    !userId ||
    !cart ||
    cart.length === 0 ||
    !paymentMethod ||
    !shippingAddress
  ) {
    return res.status(400).json({ message: "Dados do pedido incompletos." });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Verificar estoque para todos os produtos no carrinho
    for (const item of cart) {
      const [rows] = await connection.query(
        "SELECT name, stock FROM products WHERE id = ?",
        [item.id]
      );
      if (rows.length === 0 || rows[0].stock < item.quantity) {
        await connection.rollback();
        return res
          .status(400)
          .json({
            message: `Estoque insuficiente para o produto: ${
              item.name
            }. Disponível: ${rows[0]?.stock || 0}.`,
          });
      }
    }

    // CORREÇÃO: O cálculo do total agora considera o preço com desconto
    const totalPrice = cart.reduce((total, item) => {
      const priceToUse =
        item.discount_price && parseFloat(item.discount_price) > 0
          ? item.discount_price
          : item.price;
      return total + parseFloat(priceToUse) * item.quantity;
    }, 0);

    const sanitizedAddress = {
      ...shippingAddress,
      cpf: shippingAddress.cpf?.replace(/\D/g, ""),
      cep: shippingAddress.cep?.replace(/\D/g, ""),
    };
    const orderSql =
      "INSERT INTO orders (user_id, total_price, payment_method, shipping_address) VALUES (?, ?, ?, ?)";
    const [orderResult] = await connection.query(orderSql, [
      userId,
      totalPrice,
      paymentMethod,
      JSON.stringify(sanitizedAddress),
    ]);
    const orderId = orderResult.insertId;

    // Inserir os itens do pedido, usando o preço que foi pago
    const orderItemsSql =
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
    const orderItemsValues = cart.map((item) => {
      const priceToUse =
        item.discount_price && parseFloat(item.discount_price) > 0
          ? item.discount_price
          : item.price;
      return [orderId, item.id, item.quantity, priceToUse];
    });
    await connection.query(orderItemsSql, [orderItemsValues]);

    // Atualizar o estoque para cada produto
    for (const item of cart) {
      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.id]
      );
    }

    await connection.commit();
    res.status(201).json({ message: "Pedido criado com sucesso!", orderId });
  } catch (error) {
    await connection.rollback();
    console.error("Erro ao criar pedido:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao criar pedido." });
  } finally {
    connection.release();
  }
};

exports.getOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const sql = `
            SELECT o.id, o.total_price, o.payment_method, o.shipping_address, o.created_at,
                   oi.quantity, oi.price as price_at_purchase,
                   p.id as product_id, p.name as product_name, p.imageUrl as product_imageUrl
            FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ? ORDER BY o.created_at DESC;
        `;
    const [rows] = await db.query(sql, [userId]);
    if (rows.length === 0) return res.status(200).json([]);

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

    res.status(200).json(Object.values(orders));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar pedidos." });
  }
};
