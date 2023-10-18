const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'postgres',
  // host: 'localhost',
  host: '172.17.0.2',
  database: 'movies',
  password: 'postgres',
  port: 5432, // PostgreSQL default port
});

app.get('/', (req, res) => {
  // Serve the HTML file
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/users', async (req, res) => {
  console.log('1')
  try {
    console.log('2')
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM movietable');
    const users = result.rows;
    client.release(); // Release the connection back to the pool
    res.json(users);
  } catch (error) {
    console.log('3')
    console.log('error --> ', error)
    console.log('4')
    res.status(500).send('Error fetching users from the database');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// \l;
// \dt;
// \c <database-name>

// CREATE TABLE movietable ( id SERIAL PRIMARY KEY, name VARCHAR(100));
// select * from movietable;
// INSERT INTO movietable (name) VALUES ('Movie 1'), ('Movie 2'), ('Movie 3');