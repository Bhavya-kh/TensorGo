const express = require('express');
const { createUser, getUsersByOrganization } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/', authenticate, authorize(['Admin']), createUser);
router.get('/:organizationId', authenticate, authorize(['Admin']), getUsersByOrganization);

module.exports = router;
