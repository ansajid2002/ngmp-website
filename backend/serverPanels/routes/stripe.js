const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json())
app.post('/create-payment-intent', async (req, res) => {
    console.log(req.body);
    try {
        const customer = await stripe.customers.create({
            email: req.body.email, // Include customer email if available
            // Add more customer details as needed
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            customer: customer.id,
            setup_future_usage: 'on_session'
        });



        res.json({ paymentIntent: paymentIntent });
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
        console.log(e.message);
    }
});



module.exports = app