const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const inventoryController = require('../controllers/inventoryController');

// Upload inventory Excel file
router.post('/upload', upload.single('file'), inventoryController.uploadInventory);

// Get all materials
router.get('/', inventoryController.getAllInventory);

// Add new material
router.post('/', inventoryController.addMaterial);

// Delete selected materials
router.delete('/', inventoryController.deleteMaterials);

module.exports = router;