import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const result = await api.get(`/property/single/${id}`);
      setProperty(result.data);
    } catch (error) {
      console.error("Failed to fetch property:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (!property) {
    return (
      <Container className="mt-5 text-center">
        <h5>Property not found.</h5>
      </Container>
    );
  }

  const {
    user,
    socity,
    city,
    state,
    district,
    taluka,
    pincode,
    facing,
    cornerProperty,
    gatedSocity,
    minSize,
    maxSize,
    openSide,
    price,
    reraStatus,
    reraNumber,
    verified,
    description,
    images,
    createdAt,
    updatedAt,
    address,
  } = property;

  return (
    <Container className="mt-5">
      {/* User Details */}
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5" className="bg-primary text-white">
          Owner Details
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <strong> Name : </strong> {user?.name}
            </Col>
            <Col md={6}>
              <strong> Contact:</strong> {user?.phone}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Property Details */}
      <Card className="shadow-sm">
        <Card.Header as="h5" className="bg-success text-white">
          Property Details
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Society:</strong> {socity}
            </Col>
            <Col md={6}>
              <strong>City:</strong> {city}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Address:</strong> {address}
            </Col>
            <Col md={6}>
              <strong>State:</strong> {state}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>District:</strong> {district}
            </Col>
            <Col md={6}>
              <strong>Taluka:</strong> {taluka}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Pincode:</strong> {pincode}
            </Col>
            <Col md={6}>
              <strong>Facing:</strong> {facing}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Corner Property:</strong> {cornerProperty ? "Yes" : "No"}
            </Col>
            <Col md={6}>
              <strong>Gated Society:</strong> {gatedSocity ? "Yes" : "No"}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Min. Size:</strong> {minSize} ft
            </Col>
            <Col md={6}>
              <strong>Max. Size:</strong> {maxSize} ft
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Open Sides:</strong> {openSide}
            </Col>
            <Col md={6}>
              <strong>Price:</strong> ₹{price} Per Sq.Ft.
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>RERA Status:</strong>{" "}
              {reraStatus ? "Registered" : "Not Registered"}
            </Col>
            <Col md={6}>
              <strong>RERA Number:</strong> {reraNumber || "N/A"}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Verified:</strong>{" "}
              {verified ? (
                <Badge bg="success">Verified</Badge>
              ) : (
                <Badge bg="warning text-dark">Not Verified</Badge>
              )}
            </Col>
            <Col md={6}>
              <strong>Description:</strong> {description}
            </Col>
          </Row>

          {/* Photo display */}
          {images?.length > 0 && (
            <Row className="mb-3">
              <Col>
                <strong>Photos:</strong>
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {images.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Property ${index}`}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              </Col>
            </Row>
          )}

          <Row className="mt-3">
            <Col md={6}>
              <strong>Registered On:</strong>{" "}
              {new Date(createdAt).toLocaleString()}
            </Col>
            <Col md={6}>
              <strong>Last Updated:</strong>{" "}
              {new Date(updatedAt).toLocaleString()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PropertyDetails;
