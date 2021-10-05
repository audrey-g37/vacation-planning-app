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
  //   member: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Member",
  //   },
});

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
