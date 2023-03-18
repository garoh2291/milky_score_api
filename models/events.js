const mongoose = require("mongoose"),
  mongoosePaginate = require("mongoose-paginate"),
  Schema = mongoose.Schema;

const ExpressSchema = new Schema({
  games: {
    type: Array,
    required: true,
  },
  totalCoeff: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["win", "loose", "pending", "returned"],
    required: true,
  },
  date: {
    type: Date,
  },
});

ExpressSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Express", ExpressSchema);
