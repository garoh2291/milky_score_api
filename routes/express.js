const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/authMiddleware");
const sub = require("../middlewares/activeSub");
const validator = require("../middlewares/validator.middleware");
const expressController = require("../controllers/expressController");

//for admin
router.post("/", validator("express-create"), expressController.create);

//for user
router.get("/daily", expressController.getBatchActual);

//for admin
router.get("/:id", expressController.getSingle);

// get batch games
router.get("/", expressController.getBatch);

// update game
router.put("/:id", validator("express-update"), expressController.update);

// delete single game
router.delete("/:id", expressController.delete);

module.exports = router;
