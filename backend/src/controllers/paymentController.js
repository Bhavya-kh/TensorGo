const sendEmail = require('../utils/emailService');
const stripe = require('../config/stripe');
const Plan = require('../models/plan');
const dotenv = require('dotenv');
dotenv.config();

const createCheckoutSession = async (req, res) => {
    const { planId, userCount, email } = req.body;

    try {
        const plan = await Plan.findById(planId);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: plan.name,
                            description: plan.description,
                        },
                        unit_amount: plan.price * 100 * userCount, // Amount in paise
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment-success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        });

        // Send payment confirmation email
        const htmlContent = `
            <h1>Payment Successful</h1>
            <p>Dear Customer,</p>
            <p>Thank you for purchasing the ${plan.name} plan.</p>
            <p>Details:</p>
            <ul>
                <li>Plan: ${plan.name}</li>
                <li>Price: INR ${plan.price} per user</li>
                <li>User Count: ${userCount}</li>
            </ul>
            <p>We appreciate your business!</p>
        `;
        await sendEmail(email, 'Payment Confirmation', htmlContent);

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createCheckoutSession };
