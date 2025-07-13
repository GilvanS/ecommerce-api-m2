const db = require("../config/database");

// Função auxiliar para calcular o total do carrinho
const calculateTotal = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Lógica para obter um carrinho e seus itens
exports.getCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const [items] = await db.query(
      `SELECT ci.id, ci.quantity, p.id as productId, p.name, p.price 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = ?`,
      [cartId]
    );

    const total = calculateTotal(items);

    res.status(200).json({
      id: cartId,
      items,
      total: parseFloat(total.toFixed(2)),
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lógica para adicionar um item ao carrinho
exports.addItem = async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Product ID and a valid quantity are required." });
  }

  try {
    const sql = `
      INSERT INTO cart_items (cart_id, product_id, quantity) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
    `;
    await db.query(sql, [cartId, productId, quantity]);

    const [items] = await db.query(
      `SELECT ci.id, ci.quantity, p.name, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?`,
      [cartId]
    );
    const total = calculateTotal(items);

    res.status(201).json({
      message: "Item added successfully.",
      cart: { id: cartId, items, total: parseFloat(total.toFixed(2)) },
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lógica para atualizar a quantidade de um item
exports.updateItemQuantity = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "A valid quantity is required." });
  }

  try {
    const [result] = await db.query(
      "UPDATE cart_items SET quantity = ? WHERE id = ?",
      [quantity, itemId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    res.status(200).json({ message: "Item quantity updated successfully." });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lógica para remover um item do carrinho
exports.removeItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const [result] = await db.query("DELETE FROM cart_items WHERE id = ?", [
      itemId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    res.status(200).json({ message: "Item removed successfully." });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
