import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import api from "../../api/api";

const FlatDetails = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const res = await api.get(`/flat/single/${id}`);
        setFlat(res.data);
      } catch (err) {
        console.error("Error fetching flat:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlat();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!flat) {
    return (
      <Container className="mt-5 text-center">
        <h5>Flat not found.</h5>
      </Container>
    );
  }

  const {
    socity,
    apartmentName,
    flatNumber,
    floor,
    totalFloors,
    bedrooms,
    bathrooms,
    balconies,
    furnishing,
    carpetArea,
    builtupArea,
    possession,
    facing,
    price,
    isNegociable,
    maintenanceCost,
    gatedSocity,
    parking,
    reraStatus,
    reraNumber,
    address,
    city,
    taluka,
    district,
    state,
    pincode,
    about,
    images,
    user,
    verified,
    createdAt,
    updatedAt,
  } = flat;

  const getPossessionLabel = (possessionDate) => {
    if (!possessionDate) return "";

    const today = new Date();
    const possession = new Date(possessionDate);

    // Normalize both dates to avoid time issues
    today.setHours(0, 0, 0, 0);
    possession.setHours(0, 0, 0, 0);

    if (possession <= today) {
      return "Immediate";
    }

    const monthsDiff =
      (possession.getFullYear() - today.getFullYear()) * 12 +
      (possession.getMonth() - today.getMonth());

    if (monthsDiff <= 4) {
      return `In ${monthsDiff} month${monthsDiff > 1 ? "s" : ""}`;
    }

    const currentYear = today.getFullYear();
    const possessionYear = possession.getFullYear();

    if (possessionYear === currentYear) {
      return "This Year";
    }

    if (possessionYear > currentYear && possessionYear <= currentYear + 3) {
      return `${possessionYear-currentYear} Year`;
    }

    return "Beyond 3 Years";
  };

  return (
    <Container className="mt-5">
      {/* User Info */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          Customer Info
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <strong>Name:</strong> {user?.name}
            </Col>
            <Col md={6}>
              <strong>Last Name:</strong> {user?.phone}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Flat Info */}
      <Card className="shadow-sm">
        <Card.Header className="bg-success text-white">
          Flat Details
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <strong>Society:</strong> {socity}
            </Col>
            <Col md={6}>
              <strong>Apartment Name:</strong> {apartmentName}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Flat Number:</strong> {flatNumber}
            </Col>
            <Col md={6}>
              <strong>Floor:</strong> {floor} / {totalFloors}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Bedrooms:</strong> {bedrooms}
            </Col>
            <Col md={6}>
              <strong>Bathrooms:</strong> {bathrooms}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Balconies:</strong> {balconies}
            </Col>
            <Col md={6}>
              <strong>Furnishing:</strong> {furnishing}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Carpet Area :</strong> {carpetArea} Sq.Ft.
            </Col>
            <Col md={6}>
              <strong>Built Up Area:</strong> {builtupArea} Sq.Ft.
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Facing:</strong> {facing}
            </Col>
            <Col md={6}>
              <strong>Price:</strong> ₹{price?.toLocaleString()} L
              {isNegociable && "(Negotiable)"}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Maintenance:</strong> {maintenanceCost}
            </Col>
            <Col md={6}>
              <strong>Parking:</strong> {parking}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Gated Society:</strong> {gatedSocity ? "Yes" : "No"}
            </Col>
            <Col md={6}>
              <strong>RERA:</strong> {reraStatus ? `Yes (${reraNumber})` : "No"}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Address:</strong> {address}, {city}, {taluka}
            </Col>
            <Col md={6}>
              <strong>
                {district}, {state} - {pincode}
              </strong>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <strong>Verified:</strong>{" "}
              {verified ? (
                <Badge bg="success">Verified</Badge>
              ) : (
                <Badge bg="warning text-dark">Not Verified</Badge>
              )}
            </Col>
            <Col md={6}>
              <strong>Possession In : </strong> <span>{getPossessionLabel(possession)}</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <strong>About:</strong>
              <br />
              {about}
            </Col>
          </Row>

          {/* Images */}
          {images?.length > 0 && (
            <Row className="mt-4">
              <Col>
                <strong>Flat Images:</strong>
                <Row className="mt-3">
                  {images.map((img, idx) => (
                    <Col
                      key={idx}
                      xs={6} // 2 per row on extra-small screens (<576px)
                      sm={4} // 3 per row on small screens (≥576px)
                      md={3} // 4 per row on medium screens (≥768px)
                      lg={2} // 6 per row on large screens (≥992px)
                      className="mb-3"
                    >
                      <div className="border rounded overflow-hidden shadow-sm">
                        <img
                          src={img}
                          alt={`Flat Image ${idx}`}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          )}

          {/* Timestamps */}
          <Row className="mt-4">
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

export default FlatDetails;
