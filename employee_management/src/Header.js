// Header.js

import React, { useState } from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from "./image/logo.png";
// import MyProfile from "./MyProfile";
// import settings from "./Settings";
import { Link } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Search Bar
      <div className="header__search">
        <input type="text" placeholder="Search..." />
      </div> */}

      {/* Profile Icon with Dropdown */}
      <div className="header__profile">
        <FaUserCircle className="profile__icon" onClick={toggleDropdown} />
        {showDropdown && (
          <div className="profile__dropdown">
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
                </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
