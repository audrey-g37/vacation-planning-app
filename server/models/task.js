const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: Text,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
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
