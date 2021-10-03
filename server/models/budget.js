const { Schema, model } = require("mongoose");

const budgetSchema = new Schema({
  name: {
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
  },
  purchasedBy: {
    type: String,
    required: true,
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
  },
  //   member: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Member",
  //   },
});

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
