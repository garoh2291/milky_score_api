const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    am: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  description: {
    am: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("News", NewsSchema);
