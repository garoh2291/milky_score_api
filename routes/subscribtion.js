const { Router } = require("express");
const router = Router();
const subController = require("../controllers/subscriptionController");
const auth = require("../middlewares/authMiddleware");
const sub = require("../middlewares/activeSub");

router.get("/plans", auth, subController.getAlctivePackages);
router.get("/active", auth, sub, subController.getUserSubscribtion);
router.post("/cancel_sub", auth, sub, subController.cancelSub);

module.exports = router;
