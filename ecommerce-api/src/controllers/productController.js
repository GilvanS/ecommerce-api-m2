/*
================================================================================
ARQUIVO: src/controllers/productController.js (ATUALIZADO)
================================================================================
*/
const db = require("../config/database");
const { logAudit: logAuditProduct } = require("../utils/logger");

exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({
      error: {
        code: "PRODUCT_FETCH_FAILED",
        message: "Erro de servidor ao buscar produtos.",
      },
    });
  }
};

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
    return res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: "Campos essenciais são obrigatórios.",
      },
    });
  }

  try {
    const sql = `
      INSERT INTO products 
      (name, description, price, discount_price, stock, imageUrl, category_id, is_new, is_trending) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const finalDiscountPrice =
      discount_price && parseFloat(discount_price) > 0
        ? parseFloat(discount_price)
        : null;

    const [result] = await db.query(sql, [
      name,
      description,
      parseFloat(price),
      finalDiscountPrice,
      parseInt(stock),
      imageUrl,
      parseInt(category_id),
      !!is_new,
      !!is_trending,
    ]);
    logAuditProduct({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "PRODUCT_CREATED",
      details: { productId: result.insertId, productName: req.body.name },
    });
    res.status(201).json({ message: "Produto criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({
      error: {
        code: "PRODUCT_CREATE_FAILED",
        message: "Erro de servidor ao criar o produto.",
      },
    });
  }
};

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
    return res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: "Campos essenciais são obrigatórios.",
      },
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

    const [result] = await db.query(sql, [
      name,
      description,
      parseFloat(price),
      finalDiscountPrice,
      parseInt(stock),
      imageUrl,
      parseInt(category_id),
      !!is_new,
      !!is_trending,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Produto não encontrado.",
        },
      });
    }
    logAuditProduct({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "PRODUCT_UPDATED",
      details: { productId: req.params.id, updatedData: req.body },
    });
    res.status(200).json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({
      error: {
        code: "PRODUCT_UPDATE_FAILED",
        message: "Erro de servidor ao atualizar o produto.",
      },
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM favorites WHERE product_id = ?", [id]);
    await db.query("DELETE FROM order_items WHERE product_id = ?", [id]);

    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Produto não encontrado para exclusão.",
        },
      });
    }
    logAuditProduct({
      actorId: req.user.id,
      actorName: req.user.username,
      action: "PRODUCT_DELETED",
      details: { productId: id },
    });
    res.status(200).json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({
      error: {
        code: "PRODUCT_DELETE_FAILED",
        message: "Erro de servidor ao excluir o produto.",
      },
    });
  }
};
