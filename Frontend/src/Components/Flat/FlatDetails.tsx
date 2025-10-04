import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../../api/api"; // adjust the path as needed
import PropertyInquiryForm from "../PropertyInquiryForm";

const FlatDetails = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const res = await api.get(`/flat/single/${id}`);
        setFlat(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch flat details:", err);
        setLoading(false);
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
    <section className="py-5 my-5 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Container>
        <div className="text-center mb-5">
          <h3 className="fw-bold text-3xl text-gray-800 tracking-wide">
            🏢 Flat Details
          </h3>
          <p className="text-gray-500 mt-2">
            Explore detailed insights about this premium flat
          </p>
        </div>

        <Card className="shadow-lg border-0 rounded-4 overflow-hidden bg-white/90 backdrop-blur-md transition-all hover:shadow-2xl">
          {images.length > 0 && (
            <Card.Img
              variant="top"
              src={images[0]}
              style={{
                height: "380px",
                objectFit: "cover",
                borderBottom: "4px solid #00b894",
              }}
              alt="Flat Main"
            />
          )}

          <Card.Body className="p-4">
            <h4 className="fw-bold text-gray-800 mb-1">
              {socity || "Unnamed Society"} - Flat {flatNumber}
              {verified && (
                <Badge bg="success" className="ms-2 rounded-pill px-3 py-1">
                  Verified
                </Badge>
              )}
            </h4>

            <p className="mb-3 text-muted">
              Apartment: {apartmentName || "N/A"} | Floor: {floor}/{totalFloors}
            </p>

            <Row>
              <Col md={8}>
                <div className="bg-gray-50 p-3 rounded-3 shadow-sm mb-4">
                  <Row className="gy-3">
                    <Col md={6}>
                      <strong>Build Up Area:</strong> {builtupArea} Sq.Ft.
                    </Col>
                    <Col md={6}>
                      <strong>Carpet Area:</strong> {carpetArea} Sq.Ft.
                    </Col>
                    <Col md={6}>
                      <strong>Bedrooms:</strong> {bedrooms}
                    </Col>
                    <Col md={6}>
                      <strong>Bathrooms:</strong> {bathrooms}
                    </Col>
                    <Col md={6}>
                      <strong>Price:</strong> ₹ {price} L{" "}
                      {isNegociable && <span>(Negotiable)</span>}
                    </Col>
                    <Col md={6}>
                      <strong>Maintenance:</strong> ₹ {maintenanceCost}
                    </Col>
                    <Col md={6}>
                      <strong>Parking:</strong> {parking}
                    </Col>
                    <Col md={6}>
                      <strong>Gated Society:</strong>{" "}
                      {gatedSocity ? "Yes" : "No"}
                    </Col>
                    <Col md={6}>
                      <strong>RERA Status:</strong>{" "}
                      {reraStatus ? "Approved" : "No"}
                    </Col>
                    <Col md={6}>
                      <strong>RERA No:</strong> {reraNumber || "N/A"}
                    </Col>
                    <Col md={6}>
                      <strong>Facing:</strong> {facing}
                    </Col>
                    <Col md={6}>
                      <strong>Furnishing:</strong> {furnishing}
                    </Col>
                    <Col md={6}>
                      <strong>Possession In:</strong>{" "}
                      <span>{getPossessionLabel(possession)}</span>
                    </Col>
                  </Row>
                </div>

                <div className="mb-4">
                  <strong>Address:</strong>
                  <p className="text-muted mt-1">
                    {address}, <br /> {city}, {taluka}, {district}, <br />{" "}
                    {state} - {pincode}
                  </p>
                </div>

                {about && (
                  <div className="mb-4">
                    <strong>About:</strong>
                    <p className="text-muted mt-1">{about}</p>
                  </div>
                )}

                {user && (
                  <p className="mb-2">
                    <strong>Posted By:</strong> {user.name}
                  </p>
                )}

                <p className="text-muted small">
                  Posted on: {new Date(createdAt).toLocaleDateString()}
                </p>
              </Col>

              {/* Right Side */}
              <Col md={4}>
                <div className="sticky-top" style={{ top: "100px" }}>
                  <Card className="shadow-sm border-0 mb-4 rounded-3">
                    <Card.Body>
                      <PropertyInquiryForm propertyName={socity} />
                    </Card.Body>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <strong>Location:</strong>
                      <div
                        className="mt-2 border rounded-3 overflow-hidden"
                        style={{ width: "100%", height: "250px" }}
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
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>

            {/* Flat Images */}
            {images.length > 0 && (
              <>
                <hr className="my-4" />
                <h5 className="fw-bold mb-3">Flat Images</h5>
                <Row className="g-3">
                  {images.map((img, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                      <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden transition-transform hover:scale-105">
                        <Card.Img
                          variant="top"
                          src={img}
                          alt={`Flat Image ${idx + 1}`}
                          style={{
                            objectFit: "cover",
                            height: "200px",
                            width: "100%",
                          }}
                        />
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
