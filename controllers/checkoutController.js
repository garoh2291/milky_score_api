const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecret);

class CheckoutController {
  toCheckout = async (req, res) => {
    try {
      const { pId } = req;
      const { priceId } = req.body;
      const session = await stripe.checkout.sessions.create({
        customer: pId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId, // Replace with your actual price ID
            quantity: 1,
          },
        ],

        mode: "subscription",
        success_url: "http://localhost:3000/",
        cancel_url: "http://localhost:3000/",
      });

      res.json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new CheckoutController();
