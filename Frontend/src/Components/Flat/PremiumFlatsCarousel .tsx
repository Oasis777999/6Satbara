import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const PremiumFlatsCarousel = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const res = await api.get("/flat/list");        
        setFlats(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching flats:", err);
        setLoading(false);
      }
    };

    fetchFlats();
  }, []);

  const premiumFlats = flats.filter(
    (flat) => flat.isPremium === true && flat.verified === true
  );

  // Group the flats into chunks of 3
  const chunkFlats = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const groupedFlats = chunkFlats(premiumFlats, 3);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p>Loading...</p>
      </div>
    );
  }

  if (premiumFlats.length === 0) {
    return <p className="text-center mt-4"></p>;
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
          🌟 Premium Flats
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Explore luxurious spaces crafted for modern living
        </p>
      </div>

      <div
        id="premiumFlatsCarousel"
        className="carousel slide rounded-4 overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 via-white to-gray-200"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          {groupedFlats.map((group, groupIndex) => (
            <div
              className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
              key={groupIndex}
            >
              <div className="row g-4 justify-content-center py-4">
                {group.map((flat, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card border-0 rounded-4 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl bg-white/70 backdrop-blur-md">
                      {flat.images && flat.images.length > 0 && (
                        <div className="relative">
                          <img
                            src={flat.images[0]}
                            alt={`Flat ${flat.flatNumber}`}
                            className="card-img-top rounded-top-4 object-cover"
                            style={{ height: "230px", objectFit: "cover" }}
                          />
                          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                            ₹{flat.price?.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="card-body">
                        <h5 className="card-title font-semibold text-lg text-gray-800">
                          {flat.apartmentName} - {flat.socity}
                        </h5>
                        <p className="text-sm text-gray-600 leading-relaxed">
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
                          <strong>Location:</strong> {flat.city}, {flat.state}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          {flat.about?.slice(0, 70)}...
                        </p>
                        <button
                          className="btn btn-primary w-100 mt-3 fw-semibold rounded-pill py-2 shadow-sm hover:bg-gray-900 transition-all"
                          onClick={() => navigate(`/flat/${flat._id}`)}
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
          data-bs-target="#premiumFlatsCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              padding: "10px",
            }}
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
            className="carousel-control-next-icon"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              padding: "10px",
            }}
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  );
};

export default PremiumFlatsCarousel;
