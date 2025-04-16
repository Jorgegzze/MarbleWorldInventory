
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import InventoryPage from './pages/InventoryPage';
import HomePage from './pages/HomePage';
import ReservedItemsPage from './pages/ReservedItemsPage';
import UsersPage from './pages/UsersPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email, password) => {
    if (email === 'jge@marbleworld.com' && password === 'Marble1947!') {
      setIsAuthenticated(true);
    } else {
      alert('The username or password are incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage onLogin={handleLogin} />}
        />
        <Route
          path="/admin"
          element={isAuthenticated ? (
            <AdminPanel onLogout={handleLogout} />
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/inventory"
          element={isAuthenticated ? (
            <InventoryPage />
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/reserved"
          element={isAuthenticated ? (
            <ReservedItemsPage />
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/users"
          element={isAuthenticated ? (
            <UsersPage />
          ) : (
            <Navigate to="/" />
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
