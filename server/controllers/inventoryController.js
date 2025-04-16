
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const pool = require('../db');

// Get inventory
exports.getInventory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');
    res.json(result.rows);
  } catch (err) {
    console.error('Get inventory error:', err);
    res.status(500).send('Server error');
  }
};

// Upload Excel file
exports.uploadInventory = async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const workbook = xlsx.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

  console.log('Parsed Excel Rows:', rows);
  if (rows.length === 0) return res.status(400).send('Excel file is empty');

  try {
    for (const row of rows) {
      const {
        'Material ID': material_id,
        'Name': name,
        'Category': category,
        'Finish': finish,
        'Presentation': presentation,
        'Dimensions': dimensions,
        'Price': price,
        'Quantity': quantity,
        'Image': image
      } = row;

      const status = quantity > 0 ? 'Available' : 'Out of Stock';

      await pool.query(
        'INSERT INTO inventory (material_id, name, category, finish, presentation, dimensions, price, quantity, image, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [material_id, name, category, finish, presentation, dimensions, price, quantity, image || '', status]
      );
    }

    res.send('Inventory uploaded successfully!');
  } catch (err) {
    console.error('Upload Inventory Error:', err);
    res.status(500).send('Upload failed');
  } finally {
    fs.unlinkSync(req.file.path);
  }
};

// Upload single material
exports.uploadSingleMaterial = async (req, res) => {
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

  const filePath = req.file ? '/uploads/' + req.file.filename : '';
  const status = quantity > 0 ? 'Available' : 'Out of Stock';

  try {
    await pool.query(
      'INSERT INTO inventory (material_id, name, category, finish, presentation, dimensions, price, quantity, image, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [material_id, name, category, finish, presentation, dimensions, price, quantity, filePath, status]
    );

    res.send('Material uploaded successfully');
  } catch (err) {
    console.error('Upload Single Material Error:', err);
    res.status(500).send('Upload failed');
  }
};

// Delete materials
exports.deleteMaterials = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !ids.length) return res.status(400).send('No IDs provided');

  try {
    await pool.query('DELETE FROM inventory WHERE id = ANY($1::int[])', [ids]);
    res.send('Materials deleted successfully');
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Delete failed');
  }
};
