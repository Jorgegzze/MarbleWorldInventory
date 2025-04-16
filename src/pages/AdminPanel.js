
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '220px',
        background: '#f5f5f5',
        padding: '20px',
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <h2>Admin Panel</h2>
        <button onClick={() => navigate('/admin')}>Dashboard</button>
        <button onClick={() => navigate('/inventory')}>Inventory</button>
        <button onClick={() => navigate('/reserved')}>Reserved Items</button>
        <button onClick={() => navigate('/users')}>Users Management</button>
        <button onClick={onLogout} style={{ marginTop: 'auto' }}>Sign Out</button>
      </div>

      {/* Content Panel */}
      <div style={{ flex: 1, padding: '30px' }}>
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Please select a section from the sidebar.</p>
      </div>
    </div>
  );
}
