// controllers/taskController.js

const Task = require('../models/task');

async function createTask(req, res) {
  const {  taskName } = req.body;
  const {listId} =req.params;

  try {
    const newTask = await Task.createTask(listId, taskName);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function moveTaskToList(req, res) {
  const { taskId } = req.params;
  const { newListId } = req.body;

  try {
    const updatedTask = await Task.updateTaskList(taskId, newListId);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function completeTask(req, res) {
  const { taskId } = req.params;

  try {
    const completedTask = await Task.completeTask(taskId);
    res.json(completedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Other task controller functions...
async function getTasksByListId(req, res) {
  const { listId } = req.params;

  try {
    const tasks = await Task.getTasksByListId(listId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createTask, moveTaskToList, completeTask ,getTasksByListId/*, other task controller functions...*/ };
