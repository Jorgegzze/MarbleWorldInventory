// createTable.js
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/create-table', async (req, res) => {
  const query = `
    CREATE TABLE IF NOT EXISTS inventory (
      id SERIAL PRIMARY KEY,
      material_id VARCHAR(100),
      name VARCHAR(255),
      category VARCHAR(100),
      finish VARCHAR(100),
      presentation VARCHAR(100),
      dimensions VARCHAR(100),
      price NUMERIC,
      quantity INTEGER,
      image TEXT,
      status VARCHAR(50)
    );
  `;

  try {
    await pool.query(query);
    res.send('✅ Inventory table created successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to create inventory table.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
