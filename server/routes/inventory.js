const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getInventory,
  uploadInventory,
  deleteInventory
} = require('../controllers/inventoryController');

const upload = multer({ dest: 'uploads/' });

router.get('/', getInventory);
router.post('/upload', upload.single('file'), uploadInventory);
router.delete('/', deleteInventory);

module.exports = router;
