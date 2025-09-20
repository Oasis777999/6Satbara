// Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ onClose, setUser }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="p-3 h-100 bg-dark text-white " onClick={onClose}>
      {/* Close Button for mobile */}
      <div className="d-flex justify-content-between align-items-center mb-3 d-md-none ">
        <h5 className="mb-0">Menu</h5>
        <button className="btn btn-sm btn-light" onClick={onClose}>
          ✕
        </button>
      </div>

      <div>
        <p className="h3 bg-white text-dark rounded p-2">Satbaraa Developers</p>
      </div>

      <ul className="nav flex-column">
        {user.isAdmin && (
          <>
            <li className="nav-item">
              <Link to="/propertylist" className="nav-link text-white">
                Property List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/flatlist" className="nav-link text-white">
                Flat List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customerlist" className="nav-link text-white">
                Customer List
              </Link>
            </li>
          </>
        )}
        <li className="nav-item">
          <Link to="/addproperty" className="nav-link text-white">
            Add Property
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/addflat" className="nav-link text-white">
            Add Flat
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/inquiry" className="nav-link text-white">
            Property Inquiries
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contactlist" className="nav-link text-white">
            Contact Us leads
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link text-white">
            Profile
          </Link>
        </li>
        <li className="nav-item mt-3">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
