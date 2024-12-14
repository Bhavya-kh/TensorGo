const User = require('../models/user');
const Organization = require('../models/Organization');
const dotenv = require('dotenv');
dotenv.config();

const createUser = async (req, res) => {
    const { name, email, password, organizationId } = req.body;

    try {
        const organization = await Organization.findById(organizationId);
        if (!organization) return res.status(404).json({ message: 'Organization not found' });

        if (organization.users.length >= organization.plan.userLimit) {
            return res.status(400).json({ message: 'User limit exceeded for this plan.' });
        }

        const user = new User({ name, email, password, organization: organizationId });
        await user.save();

        organization.users.push(user._id);
        await organization.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getUsersByOrganization = async (req, res) => {
    const { organizationId } = req.params;

    try {
        const users = await User.find({ organization: organizationId });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createUser, getUsersByOrganization };
