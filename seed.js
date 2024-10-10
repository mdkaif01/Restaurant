const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem'); // Adjust the path if necessary

// Connect to MongoDB
const uri = 'mongodb+srv://mdkaif01:arisha1234@cluster0.tlwyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Seed data
const menuItems = [
    { name: "Pizza", description: "Cheese and tomato pizza", price: 12.99, category: "dinner", image: "https://happymuncher.com/wp-content/uploads/2022/02/Italian-Salad-Pizza-1.png" },
    { name: "Pasta", description: "Creamy Alfredo pasta", price: 10.99, category: "dinner", image: "https://s23209.pcdn.co/wp-content/uploads/2018/04/One-Pot-Creamy-Chicken-AlfredoIMG_4986.jpg" },
    { name: "Salad", description: "Fresh garden salad", price: 8.99, category: "lunch", image: "https://veenaazmanov.com/wp-content/uploads/2022/04/Garden-Salad-Recipe23.jpg" },
    { name: "Burger", description: "Juicy beef burger", price: 11.99, category: "dinner", image: "https://img.freepik.com/premium-photo/closeup-juicy-burger-with-fries-it-look-very-delicious-big-sandwich-hamburger-with-juicy-beef-burger-cheese-tomato-red-onion_620624-6883.jpg" },
    { name: "Breakfast Burrito", description: "Eggs, cheese, and sausage in a tortilla", price: 9.99, category: "breakfast", image: "https://img.freepik.com/premium-photo/sausage-egg-breakfast-burrito-wrapped-warm-tortilla-with-salsa-cheese_118124-114764.jpg" },
];

// Insert menu items
async function seedMenu() {
    await MenuItem.deleteMany({});
    try {
        console.log("Seeding menu items:", menuItems);
        await MenuItem.insertMany(menuItems);
        console.log('Menu items seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedMenu();
