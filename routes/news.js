const { Router } = require("express");
const router = Router();
//import newsValidator and add to post and put
const { newsValidator } = require("../utils/validators");
//controller import newsController
const newsController = require("../controllers/newsController");

//get all news
router.get("/", newsController.getBatch);

//get single news
router.get("/:id", newsController.getSingle);

//create news
router.post("/create-single/", newsValidator, newsController.create);

//update news
router.put("/update-single/:id", newsValidator, newsController.update);

//delete news
router.delete("/delete-single/:id", newsController.delete);

module.exports = router;
