import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../../api/api"; // adjust the path as needed
import PropertyInquiryForm from "../PropertyInquiryForm";

const FlatDetails = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const res = await api.get(`/flat/single/${id}`);
        setFlat(res.data);
      } catch (err) {
        console.error("Failed to fetch flat details:", err);
      }
    };

    fetchFlat();
  }, [id]);

  if (!flat) return <p>Loading flat data...</p>;

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
    facing,
    price,
    possession,
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
    images = [],
    user,
    verified,
    createdAt,
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
      return `${possessionYear - currentYear} Year`;
    }

    return "Beyond 3 Years";
  };

  return (
    <section className="py-5 my-5">
      <Container>
        <h3>Flat Details</h3>
        <Card className="shadow-sm border-0">
          {images.length > 0 && (
            <Card.Img
              variant="top"
              src={images[0]}
              style={{ height: "300px", objectFit: "cover" }}
              alt="Flat Main"
            />
          )}

          <Card.Body>
            <h4 className="fw-bold">
              {socity || "Unnamed Society"} - Flat {flatNumber}
              {verified && (
                <Badge bg="success" className="ms-2">
                  Verified
                </Badge>
              )}
            </h4>

            <p className="mb-3 text-muted">
              Apartment: {apartmentName || "N/A"} | Floor: {floor}/{totalFloors}
            </p>

            <Row className="mb-3">
              <Col md={8}>
                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Build Up Area:</strong> {builtupArea} Sq.Ft.
                  </Col>
                  <Col md={6}>
                    <strong>Carpet Area:</strong> {carpetArea} Sq. Ft.
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Bedrooms:</strong> {bedrooms}
                  </Col>
                  <Col md={6}>
                    <strong>Bathrooms:</strong> {bathrooms}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Price:</strong> ₹ {price} L
                    {isNegociable && <span>(Negotiable)</span>}
                  </Col>
                  <Col md={6}>
                    <strong>Maintenance:</strong> ₹ {maintenanceCost}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Parking:</strong> {parking}
                  </Col>
                  <Col md={6}>
                    <strong>Gated Society:</strong> {gatedSocity ? "Yes" : "No"}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>RERA Status:</strong>{" "}
                    {reraStatus ? "Approved" : "No"}
                  </Col>
                  <Col md={6}>
                    <strong>RERA No:</strong> {reraNumber || "N/A"}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Facing: </strong> {facing}
                  </Col>
                  <Col md={6}>
                    <strong>Furnishing:</strong> {furnishing}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Possession In : </strong>{" "}
                    <span>{getPossessionLabel(possession)}</span>
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

                {about && (
                  <Row className="mb-3">
                    <Col>
                      <strong>About:</strong>
                      <p>{about}</p>
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
                  </Col>{" "}
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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30260.159291440537!2d73.93324540373656!3d18.55058492844486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3342b7c65bf%3A0x8187e340a9c8ddd3!2sOne%20Tree%20Stays%20By%20One%20Tree!5e0!3m2!1sen!2sin!4v1756381523432!5m2!1sen!2sin"
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
                <h5 className="mb-3 fw-bold">Flat Images</h5>
                <Row className="g-3">
                  {images.map((img, idx) => (
                    <Col
                      key={idx}
                      xs={12} // 1 image per row on extra small
                      sm={6} // 2 images per row on small screens
                      md={6} // 3 images per row on medium screens
                      lg={4} // 4 images per row on large screens
                    >
                      <Card className="h-100 shadow-sm border-0">
                        <div style={{ height: "100%", overflow: "hidden" }}>
                          <Card.Img
                            variant="top"
                            src={img}
                            alt={`Flat Image ${idx + 1}`}
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

export default FlatDetails;
