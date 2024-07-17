// models/task.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: 'localhost',
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

class Task {
  async createTask(listId, taskName) {
    try {
      const query = 'INSERT INTO tasks (list_id, task_name) VALUES ($1, $2) RETURNING *';
      const values = [listId, taskName];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateTaskList(taskId, newListId) {
    try {
      const query = 'UPDATE tasks SET list_id = $1 WHERE id = $2 RETURNING *';
      const values = [newListId, taskId];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async completeTask(taskId) {
    try {
      const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [taskId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Other task-related methods...
  async getTasksByListId(listId) {
    try {
      const query = 'SELECT * FROM tasks WHERE list_id = $1';
      const { rows } = await pool.query(query, [listId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Task();
