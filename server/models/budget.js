const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const budgetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  purchasedBy: {
    type: String,
    required: true,
  },
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
});

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
