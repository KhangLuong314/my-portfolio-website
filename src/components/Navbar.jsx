// Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../designs/Navbar.css';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
    setIsOpen(false); // Close mobile menu if open
  };

  const handleMobileMenuClose = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {!isOpen && (
          <div 
          className='logo logo-left' 
          style={{cursor: "pointer"}}
          onClick={() => navigate("/")}
          >
            KHANG LUONG
          </div>
        )}

        <div className={`nav-items ${isOpen ? 'open' : ''}`}>
          <button className='menu-toggle close-btn' onClick={handleMobileMenuClose}>
            <X size={24}/>
          </button>
          
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={() => setIsOpen(false)}
          >
            HOME
          </NavLink>

          <NavLink 
            to="/About" 
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={() => setIsOpen(false)}
          >
            ABOUT
          </NavLink>
          
          <NavLink 
            to="/Research" 
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={() => setIsOpen(false)}
          >
            RESEARCH
          </NavLink>

          <NavLink 
            to="/Connect" 
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={() => setIsOpen(false)}
          >
            CONNECT
          </NavLink>
        </div>
        
        {!isOpen && (
          <div 
          className='logo logo-right' 
          style={{cursor: "pointer"}}
          onClick={() => navigate("/")}
          >
            KHANG LUONG
          </div>
        )}

        {!isOpen && (
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;