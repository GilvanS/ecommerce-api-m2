/*
================================================================================
ARQUIVO: src/controllers/favoritesController.js (ATUALIZADO E CORRIGIDO)
================================================================================
*/
const db = require("../config/database");

exports.toggleFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  // CORREÇÃO: Valida se o productId é um número válido, independentemente de ser string ou number.
  if (!productId || isNaN(parseInt(productId, 10))) {
    return res.status(400).json({
      error: {
        code: "INVALID_PRODUCT_ID",
        message: "ID do produto inválido ou em falta.",
      },
    });
  }

  const parsedProductId = parseInt(productId, 10);

  try {
    // Valida se o produto existe
    const [product] = await db.query("SELECT id FROM products WHERE id = ?", [
      parsedProductId,
    ]);
    if (product.length === 0) {
      return res
        .status(404)
        .json({
          error: {
            code: "PRODUCT_NOT_FOUND",
            message: "Produto não encontrado.",
          },
        });
    }

    const [existing] = await db.query(
      "SELECT id FROM favorites WHERE user_id = ? AND product_id = ?",
      [userId, parsedProductId]
    );

    if (existing.length > 0) {
      await db.query("DELETE FROM favorites WHERE id = ?", [existing[0].id]);
      res
        .status(200)
        .json({ message: "Removido dos favoritos.", favorited: false });
    } else {
      await db.query(
        "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)",
        [userId, parsedProductId]
      );
      res
        .status(201)
        .json({ message: "Adicionado aos favoritos.", favorited: true });
    }
  } catch (error) {
    console.error("Erro ao alternar favorito:", error);
    res
      .status(500)
      .json({
        error: {
          code: "FAVORITE_TOGGLE_FAILED",
          message: "Erro de servidor ao gerenciar favoritos.",
        },
      });
  }
};
