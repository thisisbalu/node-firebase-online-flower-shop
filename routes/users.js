const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/:userName', async (req, res) => {
    try {
        const user = await User.find({
            userName: req.params.userName
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    } 
});

router.post('/check', async (req, res) => {
    try {
        const user = await User.find({
            userName: req.body.userName,
            password: req.body.password
        });
        if(user.length > 0) {
            res.status(200).json(user[0]);
        } else {
            res.status(404).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        firstName: !!req.body.firstName ? req.body.firstName : "",
        lastName: !!req.body.lastName ? req.body.lastName : "",
        email: req.body.email,
        password: req.body.password,
        phone: !!req.body.phone ? req.body.phone : "",
        address: !!req.body.address ? req.body.address : "",
        userName: req.body.userName,
        role: req.body.role
    });

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;