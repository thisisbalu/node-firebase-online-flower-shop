const express = require('express');
const router = express.Router();
const mongoos = require('mongoose');
const Item = require('../models/FlowerItem');

router.get('/', async (req, res) => {
	try {
			const users = await FlowerItem.find();
			res.status(200).json(users);
	} catch (err) {
			res.status(500).json({ message: err });
	}
});

router.get('/:title', async (req, res) => {
	try {
			const user = await FlowerItem.find({
					title: req.params.title
			});
			res.status(200).json(item);
	} catch (err) {
			res.status(500).json({ message: err });
	}
});

router.post('/', async (req, res) => {
	const item = new FlowerItem({
		  _id: req.body.id,
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			isAvailable: req.body.isAvailable
	});


	try {
			const savedItem = await item.save();
			res.status(200).json(savedItem);
	} catch (err) {
			res.status(500).json({ message: err });
	}
});

module.exports = router;