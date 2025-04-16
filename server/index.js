
const express = require('express') ;
const cors = require('cors');
const path = require('path');
const inventoryRoutes = require('./routes/inventory');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('public'));

app.use('/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('MarbleWorldInventory API is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
