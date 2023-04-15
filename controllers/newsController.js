const NewsSchema = require("../models/news");
const { validationResult } = require("express-validator");

const errorConfig = require("../utils/error.config");

class NewsController {
  create = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "news error",
          error: errors.errors[0].msg,
        });
      }
      const newsData = {
        ...req.body,
      };

      const news = await NewsSchema.create(newsData);
      res.json(news);
    } catch (err) {
      return res.status(404).json(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Registration error",
          error: errors.errors[0].msg,
        });
      }
      const news = await NewsSchema.findOne({
        _id: req.params.id,
      });
      if (!news) throw errorConfig.newsNotFound;

      const { title, description, image } = req.body;
      title && (news.title = title);
      description && (news.description = description);
      image && (news.image = image);

      await news.save();
      res.json(news.toObject());
    } catch (err) {
      return res.status(404).json(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const news = await NewsSchema.findOneAndDelete({
        _id: req.params.id,
      });

      if (!news) throw errorConfig.newsNotFound;
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  getBatch = async (req, res, next) => {
    try {
      const news = await NewsSchema.find({}).sort({ createdAt: 1 });
      res.json(news);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new NewsController();
