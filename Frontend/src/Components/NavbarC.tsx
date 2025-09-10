import { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Assets/MS PROPERTY LOGO.png";

const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [plotsDropdownOpen, setPlotsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Add Property dropdown ref
  const plotsDropdownRef = useRef(null); // Plots / Flats dropdown ref

  // Toggle Add Property dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Toggle Plots / Flats dropdown
  const togglePlotsDropdown = () => setPlotsDropdownOpen(!plotsDropdownOpen);

  // Close dropdowns when clicking outside
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
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          SATBARAA.COM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto fw-semibold text-center text-lg-start">
            <Nav.Link as={Link} to="/" className="mx-lg-2 mx-1">
              Home
            </Nav.Link>

            {/* Plots / Flats Dropdown */}
            <div className="nav-item dropdown" ref={plotsDropdownRef}>
              <button
                className="nav-link"
                onClick={togglePlotsDropdown}
                aria-expanded={plotsDropdownOpen ? "true" : "false"}
              >
                Plots / Flats
              </button>

              {plotsDropdownOpen && (
                <div className="dropdown-menu show">
                  <Link to="/Residential" className="dropdown-item">
                    Residential
                  </Link>
                  <Link to="/Commercial" className="dropdown-item">
                    Commercial
                  </Link>
                  <Link to="/Agriculture" className="dropdown-item">
                    Agriculture
                  </Link>
                  <NavDropdown.Divider />
                  <Link to="/flat" className="dropdown-item">
                    Flats
                  </Link>
                </div>
              )}
            </div>

            <Nav.Link as={Link} to="/about" className="mx-lg-2 mx-1">
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/contactus" className="mx-lg-2 mx-1">
              Contact
            </Nav.Link>

            {/* Add Property Dropdown */}
            <div className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="nav-link btn-add-property"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen ? "true" : "false"}
              >
                Add Your Property
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu show">
                  <Link to="/addproperty" className="dropdown-item">
                    Add Plot
                  </Link>
                  <Link to="/addflat" className="dropdown-item">
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
