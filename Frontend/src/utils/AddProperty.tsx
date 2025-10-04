import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const AddProperty = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Toggle Add Property dropdown
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close navbar on nav link click (mobile)
  const handleNavLinkClick = () => {
    setDropdownOpen(false);
  };
  return (
    <>
      {/* Add Property Dropdown */}
      <div className="nav-item dropdown d-md-none" ref={dropdownRef}>
        <span
          className="nav-link blinking-button text-dark"
          onClick={toggleDropdown}
          role="button"
          aria-expanded={dropdownOpen}
          style={{ cursor: "pointer" }}
        >
          Post Property
        </span>
        {dropdownOpen && (
          <div className="dropdown-menu show">
            <Link
              to="/addproperty"
              className="dropdown-item"
              onClick={handleNavLinkClick}
            >
              Add Plot
            </Link>
            <Link
              to="/addflat"
              className="dropdown-item"
              onClick={handleNavLinkClick}
            >
              Add Flat
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AddProperty;
