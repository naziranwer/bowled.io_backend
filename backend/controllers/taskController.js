// taskController.js
const Task = require("../models/task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.status(200).json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const task = new Task({
    title,
    description,
    dueDate,
    status,
    user: req.userId,
  });
  await task.save();
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(204).send();
};
