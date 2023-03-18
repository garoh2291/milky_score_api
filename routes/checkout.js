const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/authMiddleware");
const checkoutController = require("../controllers/checkoutController.js");

router.post("/to", auth, checkoutController.toCheckout);

module.exports = router;
