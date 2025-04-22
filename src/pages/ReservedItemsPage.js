// ReservedItemsPage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ReservedItemsPage.css';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function ReservedItemsPage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('signedIn');
    navigate('/');
  };

  return (
    <div className="reserved-items-page">
      <div className="sidebar">
        <h2>Inventory System</h2>
        <div className="nav-links">
          <Link to="/admin">Dashboard</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/reserved">Reserved Items</Link>
          <Link to="/users">Users Management</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Reserved Materials Page</h1>
        </div>

        <div className="reserved-placeholder">
          Coming Soon!
        </div>

        <div className="footer">
          <div className="footer-left">
            📍 2da de Magnolia 1617<br />
            Colonia Reforma<br />
            Monterrey, Nuevo Leon, MX
          </div>
          <div className="footer-center">
            🕐 Lunes-Viernes 9:30am - 5:30pm<br />
            Sabado 9:30am - 1:00pm<br />
            Domingo Cerrado
          </div>
          <div className="footer-right">
            <a href="https://www.facebook.com/marbleworldmex" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={22} />
            </a>
            <a href="https://www.instagram.com/marbleworldmex/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={22} />
            </a>
            <a href="https://wa.me/15625596536" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservedItemsPage;
