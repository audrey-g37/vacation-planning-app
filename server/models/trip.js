const { Schema, model } = require("mongoose");

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  dates: {
    type: String,
    required: true,
  },
  description: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
