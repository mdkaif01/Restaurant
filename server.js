const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const menuRoutes = require('./routes/menu');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI || 'mongodb+srv://mdkaif01:arisha1234@cluster0.tlwyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the menu routes
app.use('/api/menu', menuRoutes);

// Define Mongoose schemas
const ReservationSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    people: Number
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

// API endpoint to create a reservation
app.post('/reservations', async (req, res) => {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
