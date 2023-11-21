//! SUB SCHEMA USE ONLY
const { Schema, model } = require('mongoose');
const AddressSchema = new Schema({
	street1: {
		type: String
	},
	street2: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	country: {
		type: String
	},
	zipCode: {
		type: String
	}
});

const Address = model('Address', AddressSchema);

module.exports = Address;
