const db = require("../config/database");

exports.createCategory = async (req, res) => {
  const { name, image_url } = req.body;
  if (!name || !image_url) {
    return res
      .status(400)
      .json({ message: "Nome e URL da imagem são obrigatórios." });
  }
  try {
    const sql = "INSERT INTO categories (name, image_url) VALUES (?, ?)";
    await db.query(sql, [name, image_url]);
    res.status(201).json({ message: "Categoria criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar categoria." });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image_url } = req.body;
  if (!name || !image_url) {
    return res
      .status(400)
      .json({ message: "Nome e URL da imagem são obrigatórios." });
  }
  try {
    const sql = "UPDATE categories SET name = ?, image_url = ? WHERE id = ?";
    await db.query(sql, [name, image_url, id]);
    res.status(200).json({ message: "Categoria atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar categoria." });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // Opcional: Verificar se a categoria não está sendo usada por produtos antes de excluir
    const [products] = await db.query(
      "SELECT id FROM products WHERE category_id = ?",
      [id]
    );
    if (products.length > 0) {
      return res
        .status(400)
        .json({
          message:
            "Não é possível excluir. Esta categoria está em uso por produtos existentes.",
        });
    }
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
    res.status(200).json({ message: "Categoria excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir categoria." });
  }
};
