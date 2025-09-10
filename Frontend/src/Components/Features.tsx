// src/components/FeaturesSection.jsx

import React from 'react';

const features = [
  {
    icon: 'bi-search',
    text: '100% Transparency and safe transactions',
  },
  {
    icon: 'bi-handshake',
    text: 'Satisfied client Base Pan India',
  },
  {
    icon: 'bi-chat-dots',
    text: 'Lower rate comparison to other developers',
  },
  {
    icon: 'bi-layers',
    text: 'Legally secured and clear land',
  },
  {
    icon: 'bi-arrow-repeat',
    text: 'Well known Pune and near by Market',
  },
];

const Features = () => {
  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h2 className="mb-5 fw-bold text-dark">FEATURES</h2>
        <div className="row g-4 justify-content-center">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="feature-icon mb-3">
                <i className={`bi ${feature.icon} fs-1 text-primary`}></i>
              </div>
              <h5 className="fw-semibold">{feature.text}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
