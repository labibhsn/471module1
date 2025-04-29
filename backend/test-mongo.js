const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://labibhasan:12345678%40@cluster0.osz11yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
