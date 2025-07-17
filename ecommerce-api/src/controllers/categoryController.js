/*
================================================================================
ARQUIVO: src/controllers/categoryController.js (ATUALIZADO E CORRIGIDO)
================================================================================
*/
const db = require("../config/database");
const { logAudit } = require("../utils/logger");

exports.createCategory = async (req, res) => {
  const { name, image_url } = req.body;
  if (!name || !image_url) {
    return res
      .status(400)
      .json({
        error: {
          code: "INVALID_INPUT",
          message: "Nome e URL da imagem são obrigatórios.",
        },
      });
  }
  try {
    const sql = "INSERT INTO categories (name, image_url) VALUES (?, ?)";
    const [result] = await db.query(sql, [name, image_url]);

    logAudit({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "CATEGORY_CREATED",
      details: { categoryId: result.insertId, categoryName: name },
    });

    res.status(201).json({ message: "Categoria criada com sucesso!" });
  } catch (error) {
    // Tratamento de erro para nome de categoria duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({
          error: {
            code: "DUPLICATE_CATEGORY_NAME",
            message: "Já existe uma categoria com este nome.",
          },
        });
    }
    console.error("Erro ao criar categoria:", error);
    res
      .status(500)
      .json({
        error: {
          code: "CATEGORY_CREATE_FAILED",
          message: "Erro de servidor ao criar a categoria.",
        },
      });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image_url } = req.body;
  if (!name || !image_url) {
    return res
      .status(400)
      .json({
        error: {
          code: "INVALID_INPUT",
          message: "Nome e URL da imagem são obrigatórios.",
        },
      });
  }
  try {
    const sql = "UPDATE categories SET name = ?, image_url = ? WHERE id = ?";
    const [result] = await db.query(sql, [name, image_url, id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          error: {
            code: "CATEGORY_NOT_FOUND",
            message: "Categoria não encontrada.",
          },
        });
    }

    logAudit({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "CATEGORY_UPDATED",
      details: { categoryId: id, updatedData: { name, image_url } },
    });

    res.status(200).json({ message: "Categoria atualizada com sucesso!" });
  } catch (error) {
    // CORREÇÃO: Tratamento específico para nome de categoria duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({
          error: {
            code: "DUPLICATE_CATEGORY_NAME",
            message: "Já existe uma categoria com este nome.",
          },
        });
    }
    console.error("Erro ao atualizar categoria:", error);
    res
      .status(500)
      .json({
        error: {
          code: "CATEGORY_UPDATE_FAILED",
          message: "Erro de servidor ao atualizar a categoria.",
        },
      });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const [products] = await db.query(
      "SELECT id FROM products WHERE category_id = ?",
      [id]
    );
    if (products.length > 0) {
      return res
        .status(400)
        .json({
          error: {
            code: "CATEGORY_IN_USE",
            message:
              "Não é possível excluir. Esta categoria está em uso por produtos existentes.",
          },
        });
    }
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          error: {
            code: "CATEGORY_NOT_FOUND",
            message: "Categoria não encontrada.",
          },
        });
    }

    logAudit({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "CATEGORY_DELETED",
      details: { categoryId: id },
    });

    res.status(200).json({ message: "Categoria excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    res
      .status(500)
      .json({
        error: {
          code: "CATEGORY_DELETE_FAILED",
          message: "Erro de servidor ao excluir a categoria.",
        },
      });
  }
};
