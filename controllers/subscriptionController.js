const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecret);

class SubController {
  getAlctivePackages = async (req, res) => {
    console.log(req.pId);
    const products = await stripe.products.list({ active: true });

    res.json({ products, pId: req.pId });
  };

  getUserSubscribtion = async (req, res) => {
    const { pId } = req;
    const subscription = await stripe.subscriptions.list({
      customer: pId,
      status: "active",
    });
    const { product } = subscription.data[0].plan;

    const prodInfo = await stripe.products.retrieve(product);


    res.json({ subscription: subscription.data[0], prodInfo });
  };

  cancelSub = async (req, res) => {
    const { id } = req.body;

    const subscription = await stripe.subscriptions.update(id, {
      cancel_at_period_end: true,
    });
    res.json(subscription);
  };
}

module.exports = new SubController();
