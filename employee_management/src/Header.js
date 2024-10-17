import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import logo from "./image/logo.png";

const Header = ({ profilePhoto }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);  // Clear any existing timeout
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    // Set a delay to keep the dropdown open momentarily
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 500);  // Adjust delay as needed (500ms here)
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Profile Icon with Dropdown */}
      <div
        className="header__profile"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar
          src={profilePhoto}  // Show uploaded photo if available
          icon={!profilePhoto && <FaUserCircle />} // Fallback to icon if no photo
          className="profile__icon"
          size={40}  // Adjust size as needed
        />
        {showDropdown && (
          <div className="profile__dropdown">
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              {/* Add other dropdown items as needed */}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
