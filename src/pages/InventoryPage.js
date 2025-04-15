import React from 'react';
import './InventoryPage.css';

const materials = [
  {
    id: 'M3',
    name: 'Arabescato',
    category: 'Piedra Tecnologica',
    finish: 'Seda/Silk',
    presentation: 'Placa',
    dimensions: '3.20 x 1.60 x .12 mm',
    price: 15200,
    quantity: 2,
    status: 'Available',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 'M6',
    name: 'Basaltina',
    category: 'Piedra Tecnologica',
    finish: 'Natural',
    presentation: 'Placa',
    dimensions: '3.20 x 1.60 x .12 mm',
    price: 15200,
    quantity: 12,
    status: 'Available',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 'M4',
    name: 'Belvedere',
    category: 'Piedra Tecnologica',
    finish: 'Seda/Silk',
    presentation: 'Placa',
    dimensions: '3.20 x 1.60 x .12 mm',
    price: 15200,
    quantity: 0,
    status: 'Out of stock',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 'M5',
    name: 'Bianco',
    category: 'Piedra Tecnologica',
    finish: 'Seda/Silk',
    presentation: 'Placa',
    dimensions: '3.20 x 1.60 x .12 mm',
    price: 15200,
    quantity: 0,
    status: 'Out of stock',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: 'M9',
    name: 'Borghini',
    category: 'Piedra Tecnologica',
    finish: 'Pulido',
    presentation: 'Placa',
    dimensions: '3.20 x 1.60 x .12 mm',
    price: 15200,
    quantity: 0,
    status: 'Out of stock',
    image: 'https://via.placeholder.com/50',
  },
];

const InventoryPage = () => {
  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h2>Materials Management</h2>
        <div className="button-group">
          <button>⬇️ Download Template</button>
          <button>⬆️ Upload Materials</button>
          <button className="add-btn">+ Add New Material</button>
        </div>
      </div>

      <div className="filters">
        {[
          'Material ID',
          'Name',
          'Category',
          'Finish',
          'Presentation',
          'Dimensions',
          'Price',
          'Quantity',
          'Status',
        ].map((label, i) => (
          <input key={i} placeholder={`Filter by ${label}`} />
        ))}
      </div>

      <table className="materials-table">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Material ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Finish</th>
            <th>Presentation</th>
            <th>Dimensions</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat, idx) => (
            <tr key={idx}>
              <td><input type="checkbox" /></td>
              <td><img src={mat.image} alt={mat.name} /></td>
              <td>{mat.id}</td>
              <td>{mat.name}</td>
              <td>{mat.category}</td>
              <td>{mat.finish}</td>
              <td>{mat.presentation}</td>
              <td>{mat.dimensions}</td>
              <td>{mat.price}</td>
              <td>{mat.quantity}</td>
              <td>
                <span className={mat.status === 'Available' ? 'badge-available' : 'badge-out'}>
                  {mat.status}
                </span>
              </td>
              <td className="actions">
                <button>✏️</button>
                <button>🗑️</button>
                <button>💲</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
