
// AdminPanel.js (placeholder styled version)
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', padding: '10px', borderRight: '1px solid gray' }}>
        <h3>Admin Panel</h3>
        <button onClick={() => navigate('/')}>🏠 Home</button>
        <button onClick={() => navigate('/inventory')}>Inventory</button>
        <button onClick={() => navigate('/reserved')}>Reserved Items</button>
      </div>
      <div style={{ padding: '20px' }}>
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Select a section from the left panel.</p>
      </div>
    </div>
  );
}
