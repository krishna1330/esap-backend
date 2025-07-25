// src/controllers/users.controller.js
const usersHelper = require('../database/helpers/users.helper');

exports.getAdmins = async (req, res) => {
    try {
        const result = await usersHelper.getAdmins();
        res.json(result);
    } catch (err) {
        console.error('❌ Error fetching admins:', err);
        res.status(err.status || 500).json({ message: err.message || 'Failed to fetch admins' });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const admin = await usersHelper.createAdmin(req.body);
        res.status(201).json(admin);
    } catch (err) {
        console.error('❌ Error creating admin:', err);
        res.status(err.status || 500).json({ message: err.message || 'Failed to create admin' });
    }
};
