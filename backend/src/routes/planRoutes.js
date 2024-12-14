const express = require('express');
const { createPlan, getPlans } = require('../controllers/planController');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/', createPlan); // Protected by SuperAdmin Middleware
router.get('/', getPlans);

module.exports = router;
