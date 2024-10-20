// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');


// Create a single database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  ssl: {
    ca: fs.readFileSync(__dirname + '/ca.pem')  // Load SSL certificate
  },
  connectTimeout: 30000  // Set the connection timeout to 30 seconds
});

module.exports = connection;
