const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  SelectedEvents: {
    items: [
      {
        cf: {
          type: Number,
          required: true,
        },
        eventId: {
          type: Schema.Types.ObjectId,
          ref: "Express",
          required: true,
        },
      },
    ],
  },
});

module.exports = model("User", userSchema);
