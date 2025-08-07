import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../components/admin/LoginPage';
import Dashboard from '../components/admin/Dashboard';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ggu-btech-form-b.vercel.app/";



const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token with backend
      fetch(`${API_BASE_URL}/api/admin/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
        }
      })
      .catch(() => {
        localStorage.removeItem('adminToken');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Routes>
        <Route 
          path="login" 
          element={
            isAuthenticated ? 
            <Navigate to="/admin/dashboard" replace /> : 
            <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard onLogout={handleLogout} /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="" 
          element={<Navigate to="/admin/login" replace />} 
        />
      </Routes>
    </div>
  );
};

export default AdminPage;
