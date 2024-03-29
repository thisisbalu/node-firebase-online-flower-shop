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

router.get('/:sku', async (req, res) => {
	try {
		const product = await Product.find({
			sku: req.params.sku
		});
		res.status(200).json(product);
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