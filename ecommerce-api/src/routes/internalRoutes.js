// routes/internalRoutes.js
const express = require("express");
const router = express.Router();
const internalController = require("../controllers/internalController");
const authInternal = require("../middleware/authInternal");

const methodNotAllowed = (req, res) =>
  res.status(405).json({ error: { code: "METHOD_NOT_ALLOWED" } });

router
  .route("/test-results")
  .post(authInternal, internalController.saveTestResult)
  .all(methodNotAllowed);

module.exports = router;
