const mongoose = require('mongoose');
const uniqid = require('uniqid');

const ProductSchema = mongoose.Schema({
	sku: {
		type: String,
		default: uniqid().toUpperCase()
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true 
	},
	quantity: {
		type: Number
	},
	image: {
		type: String
	},
	shippingDetails: {
		weight: Number,
		width: Number,
		height: Number,
		depth: Number
	}
});

module.exports = mongoose.model('Products', ProductSchema);