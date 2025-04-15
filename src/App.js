import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminPanel />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
