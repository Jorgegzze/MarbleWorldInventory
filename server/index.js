
const express = require('express');
const cors = require('cors');
const path = require('path');

const inventoryRoutes = require('./routes/inventory');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // added this line

const uploadRoutes = require('./routes/upload');

// ROUTES
app.use('/api/inventory', inventoryRoutes);
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
