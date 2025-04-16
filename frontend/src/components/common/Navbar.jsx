import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">School Management System</Link>
      </div>
      
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/classes" className="navbar-item">Classes</Link>
            {isAdmin && (
              <>
                <Link to="/users" className="navbar-item">Users</Link>
                <Link to="/admin" className="navbar-item">Admin Panel</Link>
              </>
            )}
            <div className="navbar-item">
              Welcome, {user.name}
            </div>
            <button onClick={handleLogout} className="button is-light">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-item">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
