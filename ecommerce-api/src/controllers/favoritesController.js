const db = require("../config/database");
exports.toggleFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!productId) {
    return res.status(400).json({ message: "ID do produto é obrigatório." });
  }

  try {
    const [existing] = await db.query(
      "SELECT id FROM favorites WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (existing.length > 0) {
      // Se já existe, remove
      await db.query("DELETE FROM favorites WHERE id = ?", [existing[0].id]);
      res
        .status(200)
        .json({ message: "Removido dos favoritos.", favorited: false });
    } else {
      // Se não existe, adiciona
      await db.query(
        "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)",
        [userId, productId]
      );
      res
        .status(201)
        .json({ message: "Adicionado aos favoritos.", favorited: true });
    }
  } catch (error) {
    console.error("Erro ao alternar favorito:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
