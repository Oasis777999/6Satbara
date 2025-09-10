import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AvailableProperties = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Available Plots */}
      <section id="projects" className="py-5 bg-light">
        <Container>
          {/* Section Title */}
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-primary mb-3">
                Recommended Properties
              </h2>
              <p className="lead text-muted">
                Premium flats ready for immediate sale
              </p>
            </Col>
          </Row>

          {/* Plot Cards */}
          <Row className="g-4">
            {[
              {
                title: "Luxury 1, 2 & 3 BHK Apartments",
                desc: "Spacious 1, 2 & 3 BHK flats with modern interiors, modular kitchen, and balconies. Located in a gated society with clubhouse, pool, and 24/7 security.",
                img: "https://ik.imagekit.io/sjnshacs8/propertygallery/67765f6f904f3_1.webp",
                path: "flat",
              },
              {
                title: "Premium Agriculture, Commercial & Residential Plots",
                desc: "Discover prime land for farming, business, or your dream home. Clear titles, great locations, and excellent investment potential.",
                img: "https://vtp-khadakwasla-plots.newlaunchproject.in/assets/images/slider/plotsimg.jpg",
                path: "property",
              },
            ].map((plot, index) => (
              <Col lg={6} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={plot.img}
                    alt={plot.title}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-4 fw-semibold">
                      {plot.title}
                    </Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {plot.desc}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={() => navigate(`/${plot.path}`)}
                    >
                      See More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AvailableProperties;
