// Task.js
const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ["To-Do", "In Progress", "Completed"],
    default: "To-Do",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Task", TaskSchema);
