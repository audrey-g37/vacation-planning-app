//! SUB SCHEMA USE ONLY
const { Schema } = require('mongoose');
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

module.exports = AddressSchema;
