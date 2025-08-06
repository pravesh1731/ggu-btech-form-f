import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../App.css";

const Header = () => {
  const location = useLocation();
  const isStudentPage = location.pathname.startsWith('/student');
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <header className="app-header">
      <nav className="nav-container">
        <div className="logo">
          <h2>GGU Admission System</h2>
        </div>
        <div className="nav-links">
          <Link 
            to="/student" 
            className={`nav-link ${isStudentPage ? 'active' : ''}`}
          >
            Student Application
          </Link>
          <Link 
            to="/admin" 
            className={`nav-link ${isAdminPage ? 'active' : ''}`}
          >
            Admin Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
