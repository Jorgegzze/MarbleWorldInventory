import './AdminLayout.css';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const AdminLayout = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-container">
      {/* Top bar */}
      <div className="top-bar-admin">
        <div className="nav-title" onClick={() => navigate('/')}>
          Inventory System
        </div>
        <div className="nav-label">Admin Panel</div>
      </div>

      {/* Body */}
      <div className="admin-body">
        {/* Sidebar */}
        <div className="sidebar">
          <button className={location.pathname === '/admin' ? 'active' : ''} onClick={() => handleNavigation('/admin')}>Dashboard</button>
          <button className={location.pathname === '/inventory' ? 'active' : ''} onClick={() => handleNavigation('/inventory')}>Inventory</button>
          <button className={location.pathname === '/reserved' ? 'active' : ''} onClick={() => handleNavigation('/reserved')}>Reserved Items</button>
          <button className={location.pathname === '/users' ? 'active' : ''} onClick={() => handleNavigation('/users')}>Users Management</button>
          <button className="signout-btn" onClick={onLogout}>Sign Out</button>
        </div>

        {/* Main content */}
        <div className="main-content">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
