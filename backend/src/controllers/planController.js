const Plan = require('../models/plan');
const dotenv = require('dotenv');
dotenv.config();

const createPlan = async (req, res) => {
    const { name, price, userLimit, description } = req.body;
    try {
        const plan = new Plan({ name, price, userLimit, description });
        await plan.save();
        res.status(201).json({ message: 'Plan created successfully', plan });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createPlan, getPlans };
