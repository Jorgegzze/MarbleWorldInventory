
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getInventory,
  uploadInventory,
  deleteInventory,
  uploadSingleMaterial
} = require('../controllers/inventoryController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', getInventory);
router.post('/upload', upload.single('file'), uploadInventory);
router.delete('/', deleteInventory);
router.post('/upload-material', upload.single('image'), uploadSingleMaterial);

module.exports = router;
