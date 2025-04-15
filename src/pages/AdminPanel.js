import React, { useState } from 'react';
import InventoryPage from './InventoryPage';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const stats = {
    totalMaterials: 98,
    outOfStock: 20,
    inStockValue: '$4,570,996.50',
    reservedValue: '$288,800.00',
  };

  const categories = [
    {
      name: 'Cuarzo',
      total: 30,
      inStock: 30,
      reserved: 0,
      inStockValue: '$414,000.00',
      reservedValue: '$0.00',
    },
    {
      name: 'Piedra Tecnologica',
      total: 288,
      inStock: 269,
      reserved: 19,
      inStockValue: '$4,122,000.00',
      reservedValue: '$288,800.00',
    },
  ];

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li
              className={activePage === 'dashboard' ? 'active' : ''}
              onClick={() => setActivePage('dashboard')}
            >
              Dashboard
            </li>
            <li
              className={activePage === 'inventory' ? 'active' : ''}
              onClick={() => setActivePage('inventory')}
            >
              Inventory
            </li>
            <li>Reserved Items</li>
            <li>Users Management</li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activePage === 'dashboard' ? 'Dashboard' : 'Materials Management'}</h1>
          <button className="signout-btn">Sign Out</button>
        </header>

        {activePage === 'dashboard' ? (
          <>
            <section className="dashboard-cards">
              <div className="card">
                <p>Total Materials</p>
                <h2>{stats.totalMaterials}</h2>
              </div>
              <div className="card">
                <p>Out of Stock</p>
                <h2>{stats.outOfStock}</h2>
              </div>
              <div className="card">
                <p>InStock Value</p>
                <h2>{stats.inStockValue}</h2>
              </div>
              <div className="card">
                <p>Reserved Value</p>
                <h2>{stats.reservedValue}</h2>
              </div>
            </section>

            <section className="category-table">
              <h2>Category Statistics</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Total Quantity</th>
                    <th>InStock Quantity</th>
                    <th>Reserved Quantity</th>
                    <th>InStock Value</th>
                    <th>Reserved Value</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, index) => (
                    <tr key={index}>
                      <td>{cat.name}</td>
                      <td>{cat.total}</td>
                      <td>{cat.inStock}</td>
                      <td>{cat.reserved}</td>
                      <td>{cat.inStockValue}</td>
                      <td>{cat.reservedValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <InventoryPage />
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
