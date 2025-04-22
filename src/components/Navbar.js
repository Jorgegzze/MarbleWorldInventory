// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const handleAdminPanel = () => {
    navigate('/dashboard'); // Navigate to dashboard in same tab
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Inventory System
        </Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <button onClick={handleAdminPanel} className="admin-button">
              Admin Panel
            </button>
            <button onClick={handleLogout} className="signout-button">
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="signin-button">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
