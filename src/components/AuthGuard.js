import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }) {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}