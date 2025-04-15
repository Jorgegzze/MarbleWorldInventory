
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ setIsAuthenticated }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'jge@marbleworld.com' && password === 'Marble1947!') {
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      setError('The username or password are incorrect');
      setMessage('');
    }
  };

  const handleForgotPassword = () => {
    setMessage('Password sent to jge@marbleworld.com: Marble1947!');
    setError('');
  };

  return (
    <>
      <header className="top-bar">
        <span className="left-text">Inventory System</span>
        <span className="right-text">Admin Panel</span>
      </header>

      <div className="sub-header">
        <h2>Inventory Management</h2>
        <button className="sign-in-btn" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? 'Close' : 'Sign In'}
        </button>
      </div>

      {showLogin && (
        <div className="login-form">
          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <p className="forgot" onClick={handleForgotPassword}>Forgot password?</p>
        </div>
      )}

      <div className="black-banner">
        <h1>Marble World</h1>
      </div>

      <div className="placeholder-section">
        <p>This section will display your product cards in the final version.</p>
      </div>

      <footer className="site-footer">
        <div className="footer-column">
          <p>www.marbleworld.com</p>
          <p>2da de Magnolia 1617</p>
          <p>Colonia Reforma, Monterrey, Nuevo León</p>
        </div>
        <div className="footer-column">
          <p><strong>Lunes – Viernes:</strong> 9:00 AM – 5:30 PM</p>
          <p><strong>Sábado:</strong> 10:00 AM – 1:00 PM</p>
          <p><strong>Domingo:</strong> Cerrado</p>
        </div>
        <div className="footer-column social-icons">
          <a href="https://facebook.com/marbleworldmex" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com/marbleworldmex" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/528126409202" target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
