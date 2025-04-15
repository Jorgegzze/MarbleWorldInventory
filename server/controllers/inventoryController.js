
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.getInventory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inventory' });
  }
};

exports.uploadInventory = async (req, res) => {
  try {
    console.log('FILE RECEIVED:', req.file);
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = path.join(__dirname, '..', req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });

    for (const row of data) {
      const {
        'Material ID': material_id,
        Name: name,
        Category: category,
        Finish: finish,
        Presentation: presentation,
        Dimensions: dimensions,
        Price: price,
        Quantity: quantity,
        Image: image
      } = row;

      const status = parseInt(quantity) === 0 ? 'Out of Stock' : 'Available';

      await pool.query(
        'INSERT INTO inventory (material_id, name, category, finish, presentation, dimensions, price, quantity, image, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [material_id, name, category, finish, presentation, dimensions, price, quantity, image, status]
      );
    }

    fs.unlinkSync(filePath);
    res.json({ message: 'Inventory uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading inventory' });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids)) return res.status(400).json({ error: 'Invalid data' });

    await pool.query('DELETE FROM inventory WHERE id = ANY($1)', [ids]);
    res.json({ message: 'Items deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting inventory' });
  }
};

exports.uploadSingleMaterial = async (req, res) => {
  try {
    const {
      material_id,
      name,
      category,
      finish,
      presentation,
      dimensions,
      price,
      quantity
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const status = parseInt(quantity) === 0 ? 'Out of Stock' : 'Available';

    await pool.query(
      'INSERT INTO inventory (material_id, name, category, finish, presentation, dimensions, price, quantity, image, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [material_id, name, category, finish, presentation, dimensions, price, quantity, image, status]
    );

    res.json({ message: 'Material uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading material' });
  }
};
