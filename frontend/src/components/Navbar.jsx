import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css'; // CSS file import

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = (
    <>
      <Link to="/" className="nav-link" onClick={() => setMobileOpen(false)}>
        Home
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/create-post" className="nav-link" onClick={() => setMobileOpen(false)}>
            Create Post
          </Link>
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link" onClick={() => setMobileOpen(false)}>
            Login
          </Link>
          <Link to="/register" className="nav-link" onClick={() => setMobileOpen(false)}>
            Register
          </Link>
        </>
      )}
    </>
  );

  const drawer = (
    <div className="drawer-container">
      <div className="drawer-header">
        <button className="close-button" onClick={handleDrawerToggle}>
          <CloseIcon />
        </button>
      </div>
      <div className="divider"></div>
      <div className="drawer-list">
        {[
          { name: 'Home', path: '/' },
          isAuthenticated && { name: 'Create Post', path: '/create-post' },
          !isAuthenticated && { name: 'Login', path: '/login' },
          !isAuthenticated && { name: 'Register', path: '/register' },
          isAuthenticated && { name: 'Logout', action: handleLogout }
        ]
          .filter(Boolean)
          .map((item) => (
            <div
              key={item.name}
              className="drawer-item"
              onClick={item.action || (() => setMobileOpen(false))}
            >
              {item.action ? (
                <button className="drawer-link">{item.name}</button>
              ) : (
                <Link to={item.path} className="drawer-link">
                  {item.name}
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            My Blog
          </Link>
        </div>
        
        <div className="navbar-links">
          {navItems}
        </div>

        <button className="mobile-menu-button" onClick={handleDrawerToggle}>
          <MenuIcon />
        </button>

        {mobileOpen && (
          <div className="mobile-drawer">
            {drawer}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;