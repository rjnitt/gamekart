// src/server.js
const express = require('express');
const app = express();
require('dotenv').config();

const questionRoutes = require('./routes/questionRoutes');
const db = require('./config/db'); // Importing db to ensure the connection is initialized


// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to GameKart API');
});

// Routes for handling questions
app.use('/api', questionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // Test MySQL connection using promises
  try {
    const connection = await db; // Await the connection promise
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
  }
});
