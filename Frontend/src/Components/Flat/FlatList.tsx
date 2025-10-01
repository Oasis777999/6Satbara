// flatList.js
import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { FcApproval } from "react-icons/fc"; // if using verified badge

const FlatList = () => {
  const [allFlats, setAllFlats] = useState([]);
  const [flats, setFlats] = useState([]);
  const [taluka, setTaluka] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const flatsPerPage = 5;

  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedTaluka = event.target.value;
    setTaluka(selectedTaluka);
  };

  const getData = async () => {
    try {
      const result = await api.get("/flat/list");
      let fetchedFlats = result.data.data;

      // List only the verified flats
      fetchedFlats = fetchedFlats.filter((flat) =>
        flat.verified == true
      );

      setAllFlats(fetchedFlats);

      if (taluka) {
        fetchedFlats = fetchedFlats.filter((flat) => flat.taluka === taluka);
      }

      setFlats(fetchedFlats);
    } catch (error) {
      console.error("Error fetching flats:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filter changes
    getData();
  }, [taluka]);

  // Pagination logic
  const indexOfLastFlat = currentPage * flatsPerPage;
  const indexOfFirstFlat = indexOfLastFlat - flatsPerPage;
  const currentFlats = flats.slice(indexOfFirstFlat, indexOfLastFlat);

  const handleNextPage = () => {
    if (indexOfLastFlat < flats.length) {
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
        <div className="row align-items-center py-2">
          {/* Heading */}
          <div className="col-md-6 col-12 mb-2 mb-md-0">
            <h3 className="fw-bold mb-0">Recommended Flats</h3>
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
                {[...new Set(allFlats.map((flat) => flat.taluka))].map(
                  (uniqueTaluka, index) => (
                    <option key={index} value={uniqueTaluka}>
                      {uniqueTaluka}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        <Row className="g-4 py-3">
          {currentFlats.length === 0 && (
            <p className="text-center text-muted">No flats found.</p>
          )}

          {currentFlats.map((flat, idx) => (
            <Col key={idx} xs={12}>
              <Card className="border-0 shadow-sm h-100 px-lg-5">
                <Row className="g-0 align-items-center">
                  {/* Left: Image */}
                  <Col md={4}>
                    <div className="position-relative w-100 h-100">
                      <Card.Img
                        src={
                          flat.images?.[0] ||
                          "https://via.placeholder.com/300x200"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt="Flat"
                      />
                      <div className="position-absolute bottom-0 start-0 bg-white px-2 py-1 m-2 fw-bold rounded">
                        ₹ {flat.price} L
                      </div>
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
                        {flat.socity || "Untitled Flat"}{" "}
                        {flat.verified && <FcApproval />}
                      </Card.Title>

                      <p className="mb-2">
                        <strong>Price:</strong> ₹ {flat.price} L
                      </p>
                      <p className="mb-2">
                        <strong>Area:</strong> {flat.builtupArea} Sq. Ft.
                      </p>
                      <p className="mb-2">
                        <strong>Location:</strong> {flat.taluka}
                      </p>
                      <p className="small text-muted mb-1">
                        Posted by {flat.user?.firstName || "Unknown"}
                      </p>
                      <p className="small text-muted">
                        {new Date(flat.updatedAt).toLocaleDateString() ||
                          "Just now"}
                      </p>
                      <button
                        className="btn btn-success mt-2"
                        onClick={() => navigate(`/flat/${flat._id}`)}
                      >
                        See More
                      </button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Buttons */}
        {flats.length > flatsPerPage && (
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
              disabled={indexOfLastFlat >= flats.length}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FlatList;
