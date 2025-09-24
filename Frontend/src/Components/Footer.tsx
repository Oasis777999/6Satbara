import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLinkedin, FaWhatsapp, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
        <Container>
          <Row className="gy-4">
            {/* Brand Info */}
            <Col md={3}>
              <h5 className="text-uppercase fw-bold">Prime Land Dealers</h5>
              <p className="text-white-50 small">
                Trusted land partner since 2008. We offer legal, verified land
                plots with complete documentation and full support for your
                investment.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={3}>
              <h6 className="text-uppercase fw-semibold mb-3">Quick Links</h6>
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

            {/* Quick Links */}
            <Col md={3}>
              <h6 className="text-uppercase fw-semibold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/residential"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    Residential Plots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/commercial"
                    className="text-white text-decoration-none d-block mb-1"
                  >
                    Commercial Plots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agriculture"
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
              <div className="d-flex  justify-content-start gap-3 mb-3">
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://facebook.com/yourusername" // replace with your Facebook page/profile URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://wa.me/919876543210" // replace with your number
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
              <small className="text-muted text-primary">
                &copy; {new Date().getFullYear()}{" "}
                <strong>ADVAIT TELESERVICES PVT. LTD.</strong> All rights
                reserved.
              </small>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Contact Us */}
      <div className="floating-btn-group">
        {/* WhatsApp Contact */}
        <a
          href="https://wa.me/918317272136"
          className="floating-btn btn-contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        {/* Call */}
        <a href="tel:+918317272136" className="floating-btn btn-call">
          <i className="bi bi-telephone-fill"></i>
        </a>
      </div>
    </>
  );
};

export default Footer;
