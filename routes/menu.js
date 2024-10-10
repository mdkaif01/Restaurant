const express = require('express');
const MenuItem = require('../models/MenuItem'); // Import the MenuItem model

const router = express.Router();

// Get menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetch menu items from the database
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
