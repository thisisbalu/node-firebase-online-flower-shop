const express = require('express');
const router = express.Router();
const mongoos = require('mongoose');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
	try {
		const users = await Product.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.get('/:title', async (req, res) => {
	try {
		const user = await Product.find({
			title: req.params.title
		});
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.post('/', async (req, res) => {
	const body = req.body;
	const shippingDetails = body.shippingDetails;
	const item = new Product({
		sku: body.sku,
		title: body.title,
		description: body.description,
		price: body.price,
		quantity: body.quantity,
		image: body.image,
		shippingDetails: {
			weight: shippingDetails.weight,
			width: shippingDetails.width,
			height: shippingDetails.height,
			depth: shippingDetails.depth
		}
	});
	try {
		const savedItem = await item.save();
		res.status(200).json(savedItem);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;