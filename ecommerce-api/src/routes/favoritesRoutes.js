const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

// Este endpoint único adiciona se não existir, ou remove se já existir.
router.post("/toggle", favoritesController.toggleFavorite);

module.exports = router;
