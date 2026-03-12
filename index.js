require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.error(`Make sure to replace <db_password> in your .env file with your actual database password.`);
        process.exit(1);
    }
};
connectDB();

// Routes
app.use('/books', bookRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Library Management System API is running');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
