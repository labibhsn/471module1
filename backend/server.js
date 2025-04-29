require('dotenv').config({ path: './backend/.env' });

console.log('Loaded env MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string from environment variable
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/auctiondb';

console.log('MongoDB connection string:', mongoURI);

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import admin routes
const adminRoutes = require('./routes/admin');

app.use('/admin', adminRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Admin Dashboard Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
