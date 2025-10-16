import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import AddProperty from "../utils/AddProperty";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
        <Container>
          <Row className="gy-4">
            {/* Brand Info */}
            <Col md={3}>
              <h5 className="text-uppercase fw-bold">Prime Land Dealers</h5>
              <p className="text-white-50 small mb-0">
                Trusted land partner since 2015. We offer legal, verified land
                plots with complete documentation and full support for your
                investment.
              </p>
            </Col>

            {/* Main Links */}
            <Col md={3}>
              <h6 className="text-uppercase fw-semibold mb-3">Main Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/property"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactus"
                    className="text-white text-decoration-none d-block"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Property Categories */}
            <Col md={3}>
              <h6 className="text-uppercase fw-semibold mb-3">
                Property Types
              </h6>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/Residential"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    Residential Plots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Commercial"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    Commercial Plots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Agriculture"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    Agriculture Plots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/flat"
                    className="text-white text-decoration-none d-block"
                  >
                    Flats / Apartment
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Contact & Social */}
            <Col md={3}>
              <h6 className="text-uppercase fw-semibold mb-3">
                Connect With Us
              </h6>
              <div className="d-flex justify-content-start gap-3 mb-3">
                <a
                  href="https://www.youtube.com/@msproperty7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <FaYoutube size={20} />
                </a>
                <a
                  href="https://www.facebook.com/share/16DyFpJ8Av/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/msproperty136/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://wa.me/919175982712"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </Col>
          </Row>

          <hr className="border-secondary my-4" />

          {/* Bottom Bar */}
          <Row>
            <Col className="text-center">
              <small className="text-white-50">
                &copy; {new Date().getFullYear()}{" "}
                <strong className="text-primary">
                  ADVAIT TELESERVICES PVT. LTD.
                </strong>{" "}
                All rights reserved.
              </small>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Floating Contact Buttons */}
      <div className="floating-btn-group">
        {/* Add Property */}
        <AddProperty />

        {/* WhatsApp Contact */}
        <a
          href="https://wa.me/919175982712"
          className="floating-btn btn-contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        {/* Call Button */}
        <a href="tel:+919175982712" className="floating-btn btn-call">
          <i className="bi bi-telephone-fill"></i>
        </a>
      </div>
    </>
  );
};

export default Footer;
