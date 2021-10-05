const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  status: {
    type: Boolean,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  //   member: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Member",
  //   },
});

const Task = model("Task", taskSchema);

module.exports = Task;
