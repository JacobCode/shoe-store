// Shoe Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
	brand: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	img_url: {
		type: String,
		required: true
	}
})

module.exports = Store = mongoose.model('store', ShoeSchema)