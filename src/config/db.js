// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');


// Create a single database connection
const connection = mysql.createConnection({
  host: 'gamekart-mysql-rjnitt-2216.l.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_jHUhlicu4vJ5LozEre9',
  database: 'gamekart_db',
  port: 17088,
  ssl: {
    ca: fs.readFileSync(__dirname + '/ca.pem')  // Load SSL certificate
  },
  connectTimeout: 30000  // Set the connection timeout to 30 seconds
});

module.exports = connection;
