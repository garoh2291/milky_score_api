const { Router } = require("express");
const router = Router();
const eventController = require("../controllers/eventController");
const auth = require("../middlewares/authMiddleware");
const sub = require("../middlewares/activeSub");

router.post("/actual", auth, sub, eventController.getBatchActual);
router.get("/getall", auth, sub, eventController.getBatchUser);
module.exports = router;
