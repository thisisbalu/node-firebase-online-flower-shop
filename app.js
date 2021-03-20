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
const productRoutes = require('./routes/products');
//const { options } = require('./routes/items');

// Middleware
app.use(cors());
app.use(bodyParser.json());
// configure the app to use bodyParser() to extract body from request.
// parse urlencoded types to JSON
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
app.use('/users', userRoutes);
app.use('/products', productRoutes);
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