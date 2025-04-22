// src/pages/SignInPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const validEmail = "jge@marbleworld.com";
  const validPassword = "Marble1947!";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === validEmail && password === validPassword) {
      setError('');
      navigate('/admin');
    } else {
      setError('Wrong email or password. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    setMessage('An email has been sent to jge@marbleworld.com with your password.');
    setError('');
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signin-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signin-input"
        />
        <button type="submit" className="signin-button">Sign In</button>
        {error && <div className="signin-error">{error}</div>}
        {message && <div className="signin-message">{message}</div>}
      </form>
      <div className="forgot-password" onClick={handleForgotPassword}>
        Forgot password? <span className="click-here">Click here</span>
      </div>
    </div>
  );
};

export default SignInPage;
