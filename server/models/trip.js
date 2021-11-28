const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },

  startDate: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
  },

  endDate: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  budget: [
    {
      type: Schema.Types.ObjectId,
      ref: "Budget",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
