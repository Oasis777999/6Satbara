import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MapPin, Home, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="py-5">
      <section id="services" className="py-5 bg-light">
        <Container>
          {/* Heading */}
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-primary mb-3">
                Available Plots
              </h2>
              <p className="lead text-muted">
                Premium plots for every need – sold by gunta
              </p>
            </Col>
          </Row>

          {/* Cards */}
          <Row className="g-4">
            {[
              {
                title: "Residential Plots",
                desc: "Premium residential plots perfect for building your dream home. Available in various sizes from 5 guntas to 50 guntas with clear titles.",
                img: "https://propjinni.com/wp-content/uploads/2024/10/Golden-Meadows-Plots-1-584x438.jpg",
                icon: <Home size={48} className="text-primary" />,
                selectedType:"Residential"
              },
              {
                title: "Commercial Plots",
                desc: "Strategic commercial plots on main roads and business districts. Ideal for shops, offices, and commercial complexes. Starting from 10 guntas.",
                img: "https://rcspl.co.in/images/services7.jpg",
                icon: <MapPin size={48} className="text-primary" />,
                selectedType:"Commercial"
              },
              {
                title: "Agricultural Plots",
                desc: "Fertile agricultural land with water access and proper irrigation facilities. Available in large plots from 1 acre (40 guntas) onwards.",
                img: "https://godrejmundhwa.in/images/factors-to-consider-before-buying-a-plot-in-mundhwa-pune.jpg",
                icon: <Map size={48} className="text-primary" />,
                selectedType:"Agriculture"
              },
            ].map((item, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={item.img}
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column text-center">
                    <div className="mb-3">{item.icon}</div>
                    <Card.Title className="fs-4">{item.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {item.desc}
                    </Card.Text>
                    <Button variant="outline-primary" className="mt-auto" onClick={()=>navigate(`/${item.selectedType}`)}>
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

export default Services;
