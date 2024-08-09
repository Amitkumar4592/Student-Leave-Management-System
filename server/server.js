const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Hardcoded configurations
const port = 5000; // Port number
const mongoURI = 'mongodb://localhost:27017/slms'; // MongoDB connection string

app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Student Leave Management System Backend');
});

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
