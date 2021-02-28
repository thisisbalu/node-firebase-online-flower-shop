// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
// Import Routes
const userRoutes = require('./routes/users')
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));
// server created, now listen with particular port.
app.listen(3000);   