import { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Assets/MS PROPERTY LOGO.png";

const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [plotsDropdownOpen, setPlotsDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const dropdownRef = useRef(null);
  const plotsDropdownRef = useRef(null);
  const navbarRef = useRef(null);

  // Toggle Add Property dropdown
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Toggle Plots / Flats dropdown
  const togglePlotsDropdown = () => setPlotsDropdownOpen((prev) => !prev);

  // Close dropdowns and navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        plotsDropdownRef.current &&
        !plotsDropdownRef.current.contains(event.target)
      ) {
        setPlotsDropdownOpen(false);
      }

      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close navbar on nav link click (mobile)
  const handleNavLinkClick = () => {
    setNavbarOpen(false);
    setDropdownOpen(false);
    setPlotsDropdownOpen(false);
  };

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 text-primary d-flex align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <img src={logo} alt="logo" height={60} width={100} />
          M.S. Properties
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setNavbarOpen(!navbarOpen)}
        />

        <Navbar.Collapse
          in={navbarOpen}
          id="navbar-nav"
          ref={navbarRef}
          className="justify-content-end"
        >
          <Nav className="fw-semibold text-center text-lg-start">
            <Nav.Link as={Link} to="/" onClick={handleNavLinkClick} className="mx-lg-2 mx-1">
              Home
            </Nav.Link>

            {/* Plots / Flats Dropdown */}
            <div className="nav-item dropdown" ref={plotsDropdownRef}>
              <span
                className="nav-link"
                onClick={togglePlotsDropdown}
                role="button"
                aria-expanded={plotsDropdownOpen}
                style={{ cursor: "pointer" }}
              >
                Plots / Flats
              </span>
              {plotsDropdownOpen && (
                <div className="dropdown-menu show">
                  <Link to="/Residential" className="dropdown-item" onClick={handleNavLinkClick}>
                    Residential
                  </Link>
                  <Link to="/Commercial" className="dropdown-item" onClick={handleNavLinkClick}>
                    Commercial
                  </Link>
                  <Link to="/Agriculture" className="dropdown-item" onClick={handleNavLinkClick}>
                    Agriculture
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/flat" className="dropdown-item" onClick={handleNavLinkClick}>
                    Flats
                  </Link>
                </div>
              )}
            </div>

            <Nav.Link as={Link} to="/about" onClick={handleNavLinkClick} className="mx-lg-2 mx-1">
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/contactus" onClick={handleNavLinkClick} className="mx-lg-2 mx-1">
              Contact
            </Nav.Link>

            {/* Add Property Dropdown */}
            <div className="nav-item dropdown" ref={dropdownRef}>
              <span
                className="nav-link blinking-button"
                onClick={toggleDropdown}
                role="button"
                aria-expanded={dropdownOpen}
                style={{ cursor: "pointer" }}
              >
                Add Your Property
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu show">
                  <Link to="/addproperty" className="dropdown-item" onClick={handleNavLinkClick}>
                    Add Plot
                  </Link>
                  <Link to="/addflat" className="dropdown-item" onClick={handleNavLinkClick}>
                    Add Flat
                  </Link>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
