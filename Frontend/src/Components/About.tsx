import { Container, Row, Col } from "react-bootstrap";
import { Award, Users, Map } from "react-feather"; // or lucide-react
import Features from "./Features";
import { BsCheckCircle } from "react-icons/bs";

const About = () => {
  const services = [
    "Verified legal documentation",
    "Clear title ownership",
    "Transparent pricing",
    "Support with registration and government processes",
  ];
  return (
    <div>
      {/* About image and content */}
      <section id="about" className="py-6 bg-primary text-white mt-5">
        <Container>
          <Row className="align-items-center gy-4">
            {/* Left Column */}
            <Col lg={6}>
              <h2 className="display-5 fw-bold mb-4">
                15+ Years in Land Dealing
              </h2>
              <p className="lead text-white-75 mb-4">
                Prime Land Dealers has been helping families and businesses find
                their perfect plot since 2008. Our expertise in land
                documentation, legal clearances, and fair pricing has made us
                the most trusted name in land dealing.
              </p>

              {/* Stats */}
              <Row className="text-center g-4">
                <Col sm={4}>
                  <div className="d-flex flex-column align-items-center">
                    <Award size={36} className="mb-2" />
                    <h4 className="fw-bold mb-0">500+</h4>
                    <small className="text-white-50">Plots Sold</small>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="d-flex flex-column align-items-center">
                    <Users size={36} className="mb-2" />
                    <h4 className="fw-bold mb-0">1000+</h4>
                    <small className="text-white-50">Happy Customers</small>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="d-flex flex-column align-items-center">
                    <Map size={36} className="mb-2" />
                    <h4 className="fw-bold mb-0">15+</h4>
                    <small className="text-white-50">Years Experience</small>
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Right Column */}
            <Col lg={6}>
              <img
                src="https://www.wisdomproperties.com/web/assets/images/residental-plots-chennai.webp"
                alt="Land survey team"
                className="img-fluid rounded shadow"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "400px",
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-4">
            <Col md={10} lg={8}>
              <h2 className="fw-bold mb-3">📍 What We Do</h2>
              <p className="lead text-muted">
                Whether you’re looking to buy a residential plot, expand your
                commercial investments, or secure land for agriculture or
                development, we offer:
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <ul className="list-unstyled">
                {services.map((item, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <BsCheckCircle
                      className="text-primary me-2 mt-1"
                      size={20}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-muted">
                Our deep understanding of local land laws, zoning, and market
                trends enables us to guide our clients every step of the way.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
