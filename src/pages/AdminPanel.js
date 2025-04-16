
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => navigate('/')}>🏠 Home</button>
        <button onClick={() => navigate('/inventory')}>Inventory</button>
        <button onClick={() => alert('Reserved Items not implemented yet')}>Reserved Items</button>
        <button onClick={() => window.location.href = '/'}>Sign Out</button>
      </div>
      <div className="panel-content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Select a section from the left panel.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
