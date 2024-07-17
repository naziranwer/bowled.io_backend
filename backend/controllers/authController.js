// controllers/authController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');

async function signup(req, res) {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = await User.createUser(name, username, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username,name:user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, login };
