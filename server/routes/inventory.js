
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/inventoryController');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.get('/', controller.getInventory);
router.post('/upload', upload.single('file'), controller.uploadInventory);
router.post('/upload-material', upload.single('image'), controller.uploadSingleMaterial);
router.delete('/', controller.deleteMaterials);

module.exports = router;
