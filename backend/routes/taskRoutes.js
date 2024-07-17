// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/:listId/tasks', taskController.createTask);
router.put('/tasks/:taskId/move', taskController.moveTaskToList);
router.put('/tasks/:taskId/complete', taskController.completeTask);
router.get('/:listId/tasks', taskController.getTasksByListId);
// Define other task routes as needed...

module.exports = router;
