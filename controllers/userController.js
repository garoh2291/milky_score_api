const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const errorConfig = require("../utils/error.config");

const hash = process.env.HASH_LENGTH;
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecret);
const { generateAccessToken } = require("../utils/helpers");

class UserController {
  signUp = async (req, res) => {
    try {
      //check validation for required fields
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Registration error",
          error: errors.errors[0].msg,
        });
      }

      const { email, name, surname, country, password } = req.body;

      const candidate = await User.findOne({ email });
      //check if candidate is exist
      if (candidate) {
        return res.status(401).json(errorConfig.userExists);
      }

      const newCustomer = await stripe.customers.create({
        email,
        name,
      });

      const hashPassword = await bcrypt.hash(password, +hash);

      const user = new User({
        email,
        name,
        surname,
        country,
        password: hashPassword,
        pId: newCustomer.id,
      });

      await user.save();
      res.json({ success: true });
    } catch (e) {
      return res.status(404).json(e);
    }
  };

  signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      console.log(candidate);
      if (!candidate) {
        return res.status(404).json(errorConfig.userNotFound);
      }

      const validPassword = bcrypt.compareSync(password, candidate.password);

      if (!validPassword) {
        return res.status(404).json(errorConfig.wrongPasswordError);
      }

      const token = generateAccessToken(
        candidate._id,
        candidate.pId,
        candidate.createdAt
      );

      res.json({
        token,
      });
    } catch (e) {
      return res.status(404).json(e);
    }
  };

  getInfo = async (req, res) => {
    const { pId } = req;
    const current = await User.findOne({ pId }).select({
      password: 0,
      _id: 0,
      SelectedEvents: 0,
      __v: 0,
    });

    const subscriptions1 = await stripe.subscriptions.list({
      customer: pId,
    });
    console.log(subscriptions1.data[0]);

    res.json({ subscription: true, current });
  };
}

module.exports = new UserController();
