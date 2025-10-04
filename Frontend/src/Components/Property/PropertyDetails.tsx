// PropertyDetails.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../../api/api";
import { useParams } from "react-router-dom";
import PropertyInquiryForm from "../PropertyInquiryForm";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await api.get(`/property/single/${id}`);
        setProperty(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  const {
    socity,
    propertyType,
    verified,
    minSize,
    maxSize,
    price,
    isNegociable,
    openSide,
    facing,
    cornerProperty,
    gatedSocity,
    address,
    city,
    taluka,
    district,
    state,
    pincode,
    mapLocation,
    description,
    user,
    createdAt,
    images = [],
  } = property;

  if (loading) {
    return (
      <div
        className="container mt-5 py-5 text-center d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="py-5 my-5">
      <Container>
        <h3>Property Details</h3>
        <Card className="shadow-sm border-0">
          {images.length > 0 && (
            <Card.Img
              variant="top"
              src={images[0]}
              style={{ height: "300px", objectFit: "cover" }}
              alt="Main Property"
            />
          )}

          <Card.Body>
            <h4 className="fw-bold">
              {socity || "Unnamed Property"}
              {verified && (
                <Badge bg="success" className="ms-2">
                  Verified
                </Badge>
              )}
            </h4>

            <p className="mb-3 text-muted">Type: {propertyType || "N/A"}</p>

            <Row className="mb-3">
              <Col md={8}>
                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Minimum Size:</strong> {minSize} Sq.Ft.
                  </Col>
                  <Col md={6}>
                    <strong>Maximum Size:</strong> {maxSize} Sq.Ft.
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Price:</strong> ₹ {price} per Sq.Ft.
                    {isNegociable && <span> (Negotiable)</span>}
                  </Col>
                  <Col md={6}>
                    <strong>Open Sides:</strong> {openSide}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Facing:</strong> {facing}
                  </Col>
                  <Col md={6}>
                    <strong>Corner Property:</strong>{" "}
                    {cornerProperty ? "Yes" : "No"}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Gated Society:</strong> {gatedSocity ? "Yes" : "No"}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <strong>Address:</strong>
                    <p>
                      {address}, <br /> {city}, {taluka}, {district}, <br />{" "}
                      {state} - {pincode}
                    </p>
                  </Col>
                </Row>

                {description && (
                  <Row className="mb-3">
                    <Col>
                      <strong>About:</strong>
                      <p>{description}</p>
                    </Col>
                  </Row>
                )}

                {user && (
                  <p>
                    <strong>Posted By:</strong> {user.name}
                  </p>
                )}

                <p className="text-muted small">
                  Posted on: {new Date(createdAt).toLocaleDateString()}
                </p>
              </Col>

              <Col md={4}>
                <Row className="mb-3">
                  <Col md={12}>
                    <PropertyInquiryForm propertyName={socity} />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <strong>Location:</strong>
                    <div
                      className="border"
                      style={{
                        width: "100%",
                        height: "250px",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <iframe
                        title="Google Map"
                        src={mapLocation}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Additional Images Grid */}
            {images.length > 0 && (
              <>
                <hr />
                <h5 className="mb-3 fw-bold">Property Images</h5>
                <Row className="g-3">
                  {images.map((img, idx) => (
                    <Col key={idx} xs={12} sm={6} md={6} lg={4}>
                      <Card className="h-100 shadow-sm border-0">
                        <div style={{ height: "100%", overflow: "hidden" }}>
                          <Card.Img
                            variant="top"
                            src={img}
                            alt={`Property Image ${idx + 1}`}
                            className="img-fluid"
                            style={{
                              objectFit: "cover",
                              height: "100%",
                              width: "100%",
                            }}
                          />
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default PropertyDetails;
