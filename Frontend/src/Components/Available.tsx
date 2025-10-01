import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Available = () => {
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
                Available Flats
              </h2>
              <p className="lead text-muted">
                Premium flats  ready for immediate sale
              </p>
            </Col>
          </Row>

          {/* Plot Cards */}
          <Row className="g-4">
            {[
              {
                title: "Luxury 2 & 3 BHK Apartments",
                desc: "Spacious 2 & 3 BHK flats with modern interiors, modular kitchen, and balconies. ",
                img: "https://www.adarshdevelopers.com/wp-content/uploads/2025/06/premia_thumb.png",
              },
              {
                title: "Affordable Urban Flats",
                desc: "Well-planned 1, 2 BHK flats perfect for families and working professionals. ",
                img: "https://muppaprojects.com/wp-content/uploads/2022/02/premium-luxury-apartments-in-hyderabad-melody.jpg",
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
                    <Button variant="primary" className="mt-auto" onClick={()=>navigate("/flat")}>
                      Check Availability
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

export default Available;
