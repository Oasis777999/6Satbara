// PropertyList.js
import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { FcApproval } from "react-icons/fc"; // if using verified badge

const PropertyList = () => {
  const { selectedType } = useParams();
  const [allProperties, setAllProperties] = useState([]);
  const [taluka, setTaluka] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const propertiesPerPage = 5;

  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedTaluka = event.target.value;
    setTaluka(selectedTaluka);
  };

  const getData = async () => {
    try {
      const result = await api.get("/property/list");
      const fetchedProperties = result.data.data;

      // Filter by selected type if present
      let filtered = selectedType
        ? fetchedProperties.filter(
            (property) => property.propertyType === selectedType
          )
        : fetchedProperties;

      // Only verified property will show

      filtered = filtered.filter((property) => property.verified === true);

      setAllProperties(filtered);

      if (taluka) {
        filtered = filtered.filter((property) => property.taluka === taluka);
      }

      setProperties(filtered);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset page when filter changes
    getData();
  }, [selectedType, taluka]);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

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

  const handleNextPage = () => {
    if (indexOfLastProperty < properties.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="py-5 my-5 bg-light">
      <Container>
        <div className="row align-items-center">
          {/* Heading */}
          <div className="col-md-6 col-12 mb-2 mb-md-0">
            <h3 className="fw-bold mb-0">Recommended Properties</h3>
          </div>

          {/* Select Dropdown */}
          <div className="col-md-6 col-12">
            <div className="d-flex justify-content-end">
              <select
                id="talukaSelect"
                className="form-select w-auto"
                value={taluka}
                onChange={handleChange}
              >
                <option value="">-- Choose a Location --</option>
                {[
                  ...new Set(allProperties.map((property) => property.taluka)),
                ].map((uniqueTaluka, index) => (
                  <option key={index} value={uniqueTaluka}>
                    {uniqueTaluka}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Row className="g-4 py-3">
          {currentProperties.length === 0 && (
            <p className="text-center text-muted">No properties found.</p>
          )}

          {currentProperties.map((property, idx) => (
            <Col key={idx} xs={12}>
              <Card className="border-0 shadow-sm h-100 px-lg-5">
                <Row className="g-0 align-items-center">
                  {/* Left: Image */}
                  <Col md={4}>
                    <div className="position-relative w-100 h-100">
                      <Card.Img
                        src={
                          property.images?.[0] ||
                          "https://via.placeholder.com/300x200"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt="Property"
                      />
                      <div className="position-absolute top-0 end-0 p-2">
                        <span role="img" aria-label="like">
                          ♡
                        </span>
                      </div>
                    </div>
                  </Col>

                  {/* Right: Details */}
                  <Col md={8} className="p-3">
                    <Card.Body>
                      <Card.Title className="fs-5 mb-2 fw-bold">
                        {property.socity || "Untitled Property"}
                        {property.verified && <FcApproval />}
                      </Card.Title>

                      <p className="mb-2">
                        <strong>Price:</strong> ₹ {property.price} Per Sq.Ft.
                      </p>
                      <p className="mb-2">
                        <strong>Location:</strong> {property.taluka}
                      </p>
                      <p className="small text-muted mb-1">
                        Posted by {property.user?.firstName || "Unknown"}
                      </p>
                      <p className="small text-muted">
                        {new Date(property.updatedAt).toLocaleDateString() ||
                          "Just now"}
                      </p>
                      <button
                        className="btn btn-success mt-2"
                        onClick={() => navigate(`/property/${property._id}`)}
                      >
                        View
                      </button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Controls */}
        {properties.length > propertiesPerPage && (
          <div className="d-flex justify-content-center mt-4 gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleNextPage}
              disabled={indexOfLastProperty >= properties.length}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default PropertyList;
