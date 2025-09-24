import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const PremiumFlatsCarousel = () => {
  const [flats, setFlats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/flat/list")
      .then((res) => setFlats(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const premiumFlats = flats.filter((flat) => flat.isPremium);

  // Group the flats into chunks of 3
  const chunkFlats = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const groupedFlats = chunkFlats(premiumFlats, 3);

  if (premiumFlats.length === 0) {
    return <p className="text-center mt-4">No premium flats available.</p>;
  }

  return (
    <div className="container my-5 rounded shadow p-3">
      <h2 className="text-center mb-4">Premium Flats</h2>

      <div
        id="premiumFlatsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000" // auto-slide every 4 seconds
      >
        <div className="carousel-inner">
          {groupedFlats.map((group, groupIndex) => (
            <div
              className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
              key={groupIndex}
            >
              <div className="row">
                {group.map((flat, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card shadow-sm mb-4">
                      {flat.images && flat.images.length > 0 && (
                        <img
                          src={flat.images[0]}
                          className="card-img-top"
                          alt={`Flat ${flat.flatNumber}`}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">
                          {flat.apartmentName} - {flat.socity}
                        </h5>
                        <p className="card-text">
                          <strong>Flat:</strong> {flat.flatNumber}, Floor{" "}
                          {flat.floor}/{flat.totalFloors}
                          <br />
                          <strong>Bedrooms:</strong> {flat.bedrooms} |{" "}
                          <strong>Bathrooms:</strong> {flat.bathrooms}
                          <br />
                          <strong>Furnishing:</strong> {flat.furnishing}
                          <br />
                          <strong>Carpet Area:</strong> {flat.carpetArea} sq.ft
                          <br />
                          <strong>Price:</strong> ₹
                          {flat.price?.toLocaleString()}{" "}
                          {flat.isNegociable && "(Negotiable)"}
                          <br />
                          <strong>Location:</strong> {flat.address}, {flat.city}
                          , {flat.state} - {flat.pincode}
                        </p>
                        <p className="text-muted">
                          {flat.about?.slice(0, 80)}...
                        </p>
                        <button
                          className="btn btn-success mt-2"
                          onClick={() => navigate(`/flat/${flat._id}`)}
                        >
                          See More...
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#premiumFlatsCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-dark"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#premiumFlatsCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-dark"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  );
};

export default PremiumFlatsCarousel;
