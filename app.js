// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv/config');
// Import Routes
const userRoutes = require('./routes/users');
const { options } = require('./routes/users');

const itemRoutes = require('./routes/items');
const { options } = require('./routes/items');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/items', itemRoutes)
app.use(express.static("web", options));
router.get('/', function (req, res) {
    res.render('./index.html');
    //__dirname : It will resolve to your project folder.
});
// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));
// server created, now listen with particular port.
app.use('/', router);
app.listen(3000);   