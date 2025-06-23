import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mosqueToken');

    const checkAuthentication = async () => {
      try {
        await axios.get('/api/v1/auth/validate', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('mosqueToken');
        navigate('/', { state: { from: window.location.pathname } });
        return;
      }
    };

    checkAuthentication();
  }, []);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
