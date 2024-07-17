// controllers/listController.js

const List = require('../models/list');

async function createList(req, res) {
  const { userId, listName } = req.body;

  try {
    const newList = await List.createList(userId, listName);
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getListsByUserId(req, res) {
  const { userId } = req.params;

  try {
    const userLists = await List.getListsByUserId(userId);
    res.status(200).json(userLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Other controller functions for fetching list tasks and updating lists...

module.exports = { createList, getListsByUserId /*, other controller functions...*/ };
