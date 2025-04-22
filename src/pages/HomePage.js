import React from 'react';
import './HomePage.css';

function HomePage() {
  // Simulate whether the user is signed in or not
  const isAuthenticated = false; // <<< Set to false by default

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-left">Welcome to Marble World</div>
        <div className="header-right">
          {isAuthenticated ? (
            <>
              <a href="/inventory" className="admin-link">Admin Panel</a>
              <a href="/signout" className="signout-link">Sign Out</a>
            </>
          ) : (
            <a href="/signin" className="signin-link">Sign In</a>
          )}
        </div>
      </header>

      <main className="main-content">
        <h1 className="title">Marble World</h1>
        <p className="subtitle">Please sign in to manage inventory and reservations.</p>
      </main>

      <footer className="footer">
        <div className="footer-section">
          <b>www.marbleworld.com</b>
          <p>2da de Magnolia 1617,<br />Colonia Reforma,<br />Monterrey, Nuevo León, México</p>
        </div>

        <div className="footer-section">
          <p><b>Monday - Friday:</b> 9:30 AM - 5:30 PM</p>
          <p><b>Saturday:</b> 10:00 AM - 1:00 PM</p>
          <p><b>Sunday:</b> Closed</p>
        </div>

        <div className="footer-section social-links">
          <a href="https://www.facebook.com/marbleworldmex" target="_blank" rel="noreferrer">
            <img src="/facebook-icon.png" alt="Facebook" className="icon" /> @marbleworldmex
          </a>
          <a href="https://www.instagram.com/marbleworldmex" target="_blank" rel="noreferrer">
            <img src="/instagram-icon.png" alt="Instagram" className="icon" /> marbleworldmex
          </a>
          <a href="https://wa.me/528140488845" target="_blank" rel="noreferrer">
            <img src="/whatsapp-icon.png" alt="WhatsApp" className="icon" /> +52 81 4048 8845
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
