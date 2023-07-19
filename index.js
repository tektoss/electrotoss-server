const express = require("express");
const app = express();
const PORT = process.env.port || 3003;
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51NL0smEToS1NHjVdB8fqFPGQe82g7z4ST5AJgrfFeCQoLKIzL1lVJociwkWaWcNDy4aE9PwAaFMjJY8oIdppeKfO00eBOQb2PN');

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 4000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, ()=>{ 
    console.log(`listening to port ${PORT}!!`); 
  });