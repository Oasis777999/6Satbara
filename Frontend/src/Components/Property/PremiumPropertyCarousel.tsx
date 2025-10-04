import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const PremiumPropertyCarousel = () => {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/property/list");
        setProperties(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const premiumProperties = properties.filter(
    (property) => property.isPremium == true && property.verified == true
  );

  // Group the flats into chunks of 3
  const chunkProperties = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const groupedProperties = chunkProperties(premiumProperties, 3);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
          🏙️ Premium Properties
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Discover luxurious spaces designed for your lifestyle
        </p>
      </div>

      <div
        id="premiumPropertyCarousel"
        className="carousel slide rounded-4 overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner py-4">
          {groupedProperties.map((group, groupIndex) => (
            <div
              className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
              key={groupIndex}
            >
              <div className="row justify-content-center g-4">
                {group.map((property, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card border-0 rounded-4 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl bg-white/80 backdrop-blur-md">
                      {property.images && property.images.length > 0 && (
                        <div className="relative">
                          <img
                            src={property.images[0]}
                            alt={`Property ${property.socity}`}
                            className="card-img-top rounded-top-4 object-cover"
                            style={{ height: "230px", objectFit: "cover" }}
                          />
                          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                            ₹{property.price?.toLocaleString()} /sq.ft
                          </span>
                        </div>
                      )}

                      <div className="card-body">
                        <h5 className="card-title font-semibold text-lg text-gray-800">
                          {property.socity}
                        </h5>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          <strong>Size:</strong> {property.minSize}–
                          {property.maxSize} Sq.Ft
                          <br />
                          <strong>Facing:</strong> {property.facing}
                          <br />
                          <strong>Location:</strong> {property.city},{" "}
                          {property.state}
                          <br />
                          <strong>Posted By:</strong> {property.user?.name}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          {property.description?.slice(0, 70)}...
                        </p>
                        <button
                          className="btn btn-primary w-100 mt-3 fw-semibold rounded-pill py-2 shadow-sm hover:bg-gray-900 transition-all"
                          onClick={() => navigate(`/property/${property._id}`)}
                        >
                          View Details
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
            className="carousel-control-prev-icon"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              padding: "12px",
            }}
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
            className="carousel-control-next-icon"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              padding: "12px",
            }}
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  );
};

export default PremiumPropertyCarousel;
