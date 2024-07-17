// models/list.js

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: 'localhost',
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

class List {
  async createList(userId, listName) {
    try {
      const query = 'INSERT INTO lists (user_id, list_name) VALUES ($1, $2) RETURNING *';
      const values = [userId, listName];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getListsByUserId(userId) {
    try {
      const query = 'SELECT * FROM lists WHERE user_id = $1';
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getListTasks(listId) {
    try {
      const query = 'SELECT * FROM tasks WHERE list_id = $1';
      const { rows } = await pool.query(query, [listId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async updateList(listId, newListName) {
    try {
      const query = 'UPDATE lists SET list_name = $1 WHERE id = $2 RETURNING *';
      const values = [newListName, listId];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new List();
