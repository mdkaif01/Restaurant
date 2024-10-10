const mongoose = require('mongoose');

// Define the schema for a menu item
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'],
        required: true
    },
    image: {  // New field for image URL
        type: String,
        required: true
    }
});

// Create the model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;