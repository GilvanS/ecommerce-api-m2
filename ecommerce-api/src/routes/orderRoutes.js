const express_order = require("express");
const router_order = express_order.Router();
const orderController = require("../controllers/orderController");

router_order.get("/", orderController.getOrders);
router_order.post("/", orderController.createOrder);

module.exports = router_order;
