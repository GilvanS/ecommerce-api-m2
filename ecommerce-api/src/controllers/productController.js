const db_product = require("../config/database");

const getProducts = async (req, res) => {
  try {
    const [products] = await db_product.query("SELECT * FROM products");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl, category_id } = req.body;
  try {
    const sql =
      "INSERT INTO products (name, description, price, stock, imageUrl, category_id) VALUES (?, ?, ?, ?, ?, ?)";
    await db_product.query(sql, [
      name,
      description,
      price,
      stock,
      imageUrl,
      category_id,
    ]);
    res.status(201).json({ message: "Produto criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto." });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl, category_id } = req.body;
  try {
    const sql =
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, imageUrl = ?, category_id = ? WHERE id = ?";
    await db_product.query(sql, [
      name,
      description,
      price,
      stock,
      imageUrl,
      category_id,
      id,
    ]);
    res.status(200).json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db_product.query("DELETE FROM products WHERE id = ?", [id]);
    res.status(200).json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir produto." });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
