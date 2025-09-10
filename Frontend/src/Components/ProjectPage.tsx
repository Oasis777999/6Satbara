import React from "react";
import data from "../Data/Project1.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProjectPage = () => {
  const { project, landmark, facilities, gallery } = data;

  return (
    <div className="container py-5 mt-5">
      {/* Project Info */}
      <section className="mb-5 text-center">
        <h2 className="fw-bold display-5">{project.name}</h2>
        <h4 className="text-primary fw-semibold mb-3">{project.phase}</h4>
        <p className="lead text-muted">{project.description}</p>
      </section>

      {/* Landmark & Facilities */}
      <section className="row align-items-start mb-5 gy-4">
        {/* Landmark */}
        <div className="col-md-6">
          <div className="p-4 border rounded bg-white h-100 shadow-sm">
            <h4 className="fw-bold text-primary mb-3">{landmark.title}</h4>
            <p className="fw-semibold text-secondary mb-0">
              {landmark.location}
            </p>
          </div>
        </div>

        {/* Facilities */}
        <div className="col-md-6">
          <div className="p-4 border rounded bg-white h-100 shadow-sm">
            <h4 className="fw-bold text-primary mb-3">{facilities.title}</h4>
            <ul className="list-unstyled mb-0">
              {facilities.items.map((item, index) => (
                <li key={index} className="mb-2 d-flex align-items-start">
                  <i className="bi bi-check2-circle me-2 text-success fs-5"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section>
        <h4 className="fw-bold text-center mb-4 text-primary">
          {gallery.title}
        </h4>
        <div className="row g-4">
          {gallery.images.map((img, index) => (
            <div className="col-sm-6 col-md-3" key={index}>
              <div className="card border-0 shadow-sm h-100">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="card-img-top img-fluid rounded"
                  style={{ objectFit: "cover", height: "200px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
