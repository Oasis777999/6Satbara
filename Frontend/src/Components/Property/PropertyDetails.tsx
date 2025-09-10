// PropertyDetails.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../../api/api";
import { useParams } from "react-router-dom";
import PropertyInquiryForm from "../PropertyInquiryForm";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await api.get(`/property/single/${id}`);
        setProperty(result.data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
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

  console.log(mapLocation);
  

  return (
    <section className="py-5">
      <Container>
        <h3>Detailed information</h3>
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
            <h3 className="fw-bold mb-3">
              {socity || "Unnamed Property"}
              {verified && (
                <Badge bg="success" className="ms-2">
                  Verified
                </Badge>
              )}
            </h3>

            <Row className="mb-3">
              <Col md={8}>
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Property Type : </strong>
                      {propertyType}
                    </p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Minimun Size:</strong> {minSize} Sq.Ft.
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Maximum Size : </strong>
                      { maxSize} Sq. Ft.
                    </p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Price:</strong> ₹ {price} per Sq.Ft.
                      {isNegociable && <span> (Negotiable) </span>}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Open Sides:</strong> {openSide}
                    </p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Facing:</strong> {facing}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Corner Property:</strong>{" "}
                      {cornerProperty ? "Yes" : "No"}
                    </p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Gated Society:</strong>{" "}
                      {gatedSocity ? "Yes" : "No"}
                    </p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Address:</strong>
                      <br />
                      {address}, <br /> {city}, {taluka},<br />
                      {district}, <br /> {state} - {pincode}
                    </p>
                  </Col>
                </Row>
                {/* IMAGES GRID */}
                {images.length > 0 && (
                  <>
                    <h5 className="mb-3 fw-bold">Property Images</h5>
                    <Row className="mb-4">
                      {images.map((imgUrl, idx) => (
                        <Col
                          key={idx}
                          xs={12}
                          sm={6}
                          md={6}
                          lg={4}
                          className="mb-3"
                        >
                          <Card className="h-100 shadow-sm">
                            <Card.Img
                              variant="top"
                              src={imgUrl}
                              alt={`Property Image ${idx + 1}`}
                              style={{ height: "100%", objectFit: "cover" }}
                            />
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                <hr />

                {description && (
                  <p className="mb-4">
                    <strong>About:</strong> <br />
                    {description}
                  </p>
                )}

                {user && (
                  <p>
                    <strong>Posted By:</strong> {user.name}
                  </p>
                )}
              </Col>

              <Col md={4}>
                <Row className="mb-2">
                  <Col md={12}>
                    <PropertyInquiryForm propertyName={socity} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={12}>
                    <strong>Location:</strong>
                    <div
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

            <p className="text-muted small">
              <strong>Posted on: </strong>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default PropertyDetails;
