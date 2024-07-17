// routes/listRoutes.js

const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.post('/lists', listController.createList);
router.get('/lists/:userId', listController.getListsByUserId);
// Define routes for fetching list tasks, updating lists, etc.

module.exports = router;
