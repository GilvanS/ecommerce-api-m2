/*
================================================================================
ARQUIVO: src/controllers/productController.js (CORRIGIDO E FINALIZADO)
================================================================================
*/
const db = require("../config/database");

// A função getProducts não precisa de alterações.
exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

// --- FUNÇÃO CORRIGIDA ---
exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    imageUrl,
    category_id,
    discount_price,
    is_new,
    is_trending,
  } = req.body;

  if (!name || !price || !stock || !imageUrl || !category_id) {
    return res
      .status(400)
      .json({
        message:
          "Campos essenciais (nome, preço, estoque, imagem, categoria) são obrigatórios.",
      });
  }

  try {
    const sql = `
            INSERT INTO products 
            (name, description, price, discount_price, stock, imageUrl, category_id, is_new, is_trending) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    // Garante que o discount_price seja null se for vazio ou inválido
    const finalDiscountPrice =
      discount_price && parseFloat(discount_price) > 0
        ? parseFloat(discount_price)
        : null;

    await db.query(sql, [
      name,
      description,
      parseFloat(price),
      finalDiscountPrice,
      parseInt(stock),
      imageUrl,
      parseInt(category_id),
      is_new === true, // Converte para booleano
      is_trending === true, // Converte para booleano
    ]);

    res.status(201).json({ message: "Produto criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto." });
  }
};

// --- FUNÇÃO CORRIGIDA ---
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    stock,
    imageUrl,
    category_id,
    discount_price,
    is_new,
    is_trending,
  } = req.body;

  if (!name || !price || !stock || !imageUrl || !category_id) {
    return res
      .status(400)
      .json({
        message:
          "Campos essenciais (nome, preço, estoque, imagem, categoria) são obrigatórios.",
      });
  }

  try {
    const sql = `
            UPDATE products SET 
            name = ?, description = ?, price = ?, discount_price = ?, stock = ?, 
            imageUrl = ?, category_id = ?, is_new = ?, is_trending = ? 
            WHERE id = ?
        `;

    const finalDiscountPrice =
      discount_price && parseFloat(discount_price) > 0
        ? parseFloat(discount_price)
        : null;

    await db.query(sql, [
      name,
      description,
      parseFloat(price),
      finalDiscountPrice,
      parseInt(stock),
      imageUrl,
      parseInt(category_id),
      is_new === true, // Converte para booleano
      is_trending === true, // Converte para booleano
      id,
    ]);

    res.status(200).json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

// --- FUNÇÃO CORRIGIDA ---
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM favorites WHERE product_id = ?", [id]);
    await db.query("DELETE FROM order_items WHERE product_id = ?", [id]); // Garante que itens de pedido sejam removidos se necessário
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.status(200).json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto." });
  }
};
