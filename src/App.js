// App.js
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import AdminPanel from './pages/AdminPanel';
import InventoryPage from './pages/InventoryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  );
}

export default App;

