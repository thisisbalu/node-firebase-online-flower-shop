const express = require('express');
const router = express.Router();
const mongoos = require('mongoose');
const Orders = require('../models/Orders');
const Order = require('../models/Orders');

router.post('/', async (req, res) => {
	const body = req.body;
	const payment = body.payment;
    const products = body.products;
    const shipping = body.shipping
	const order = new Order({
		userName: body.userName,
			shipping: {
				name: shipping.name,
				address: shipping.address,
				province: shipping.province,
				country: shipping.country,
				postalCode: shipping.postalCode
			},
			payment: {
				cardNumber: payment.cardNumber,
				expiry: payment.expiry,
				cvv: payment.cvv,
				cardName: payment.cardName
			},
			cost: body.cost,
			products: products
	});
	try {
		const savedOrder = await order.save();
		res.status(200).json(savedOrder);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.get('/:userName', async (req, res) => {
    try {
        const orders = await Orders.find({
            userName: req.params.userName
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err });
    } 
});

module.exports = router;