import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const PremiumPropertyCarousel = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/property/list")
      .then((res) => setProperties(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const premiumProperties = properties.filter((property) => property.isPremium==true && property.verified==true);

  // Group the flats into chunks of 3
  const chunkProperties = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const groupedProperties = chunkProperties(premiumProperties, 3);

  if (premiumProperties.length === 0) {
    return <p className="text-center mt-4"></p>;
  }

  return (
    <div className="container my-5 rounded shadow p-3">
      <h2 className="text-center mb-4">Premium Properties</h2>

      <div
        id="premiumPropertyCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000" // auto-slide every 4 seconds
      >
        <div className="carousel-inner">
          {groupedProperties.map((group, groupIndex) => (
            <div
              className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
              key={groupIndex}
            >
              <div className="row">
                {group.map((property, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card shadow-sm mb-4">
                      {property.images && property.images.length > 0 && (
                        <img
                          src={property.images[0]}
                          className="card-img-top"
                          alt={`Flat ${property.flatNumber}`}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">
                          {property.apartmentName} - {property.socity}
                        </h5>
                        <p className="card-text">
                          <strong>Flat:</strong> {property.flatNumber}, Floor{" "}
                          {property.floor}/{property.totalFloors}
                          <br />
                          <strong>Bedrooms:</strong> {property.bedrooms} |{" "}
                          <strong>Bathrooms:</strong> {property.bathrooms}
                          <br />
                          <strong>Furnishing:</strong> {property.furnishing}
                          <br />
                          <strong>Carpet Area:</strong> {property.carpetArea} sq.ft
                          <br />
                          <strong>Price:</strong> ₹
                          {property.price?.toLocaleString()}{" "}
                          {property.isNegociable && "(Negotiable)"}
                          <br />
                          <strong>Location:</strong> {property.address}, {property.city}
                          , {property.state} - {property.pincode}
                        </p>
                        <p className="text-muted">
                          {property.about?.slice(0, 80)}...
                        </p>
                        <button
                          className="btn btn-success mt-2"
                          onClick={() => navigate(`/flat/${property._id}`)}
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
          data-bs-target="#premiumPropertyCarousel"
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
          data-bs-target="#premiumPropertyCarousel"
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

export default PremiumPropertyCarousel;
