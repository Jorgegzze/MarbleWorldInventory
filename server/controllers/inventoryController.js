// server/controllers/inventoryController.js

const pool = require('../db');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function generateRandomMaterialId() {
  return 'MAT-' + Math.floor(100000 + Math.random() * 900000);
}

exports.uploadInventory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, `../uploads/${req.file.filename}`);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const item of data) {
      const {
        name,
        category,
        finish,
        presentation,
        dimensions,
        price,
        quantity,
        status
      } = item;

      const material_id = generateRandomMaterialId();

      await pool.query(
        `INSERT INTO inventory (material_id, name, category, finish, presentation, dimensions, price, quantity, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          material_id,
          name || '',
          category || '',
          finish || '',
          presentation || '',
          dimensions || '',
          price || 0,
          quantity || 0,
          status || 'Out of Stock'
        ]
      );
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'Inventory uploaded successfully' });
  } catch (error) {
    console.error('Error uploading inventory:', error);
    res.status(500).json({ error: 'Failed to upload inventory' });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

exports.addMaterial = async (req, res) => {
  const { name, category, finish, presentation, dimensions, price, quantity, status } = req.body;
  try {
    const material_id = generateRandomMaterialId();
    await pool.query(
      `INSERT INTO inventory (material_id, name, category, finish, presentation, dimensions, price, quantity, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [material_id, name, category, finish, presentation, dimensions, price, quantity, status]
    );
    res.status(201).json({ message: 'Material added successfully' });
  } catch (error) {
    console.error('Error adding material:', error);
    res.status(500).json({ error: 'Error adding material' });
  }
};

exports.deleteMaterials = async (req, res) => {
  const { ids } = req.body;
  try {
    const intIds = ids.map(id => parseInt(id));
    await pool.query(`DELETE FROM inventory WHERE id = ANY($1)`, [intIds]);
    res.status(200).json({ message: 'Materials deleted successfully' });
  } catch (error) {
    console.error('Error deleting materials:', error);
    res.status(500).json({ error: 'Error deleting materials' });
  }
};
