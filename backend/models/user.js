const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: 'localhost',
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

class User {
  async createUser(name, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, username, hashedPassword];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async findUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  }
}

module.exports = new User();
