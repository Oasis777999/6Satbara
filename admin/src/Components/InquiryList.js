import React, { useEffect, useState } from 'react';
import api from '../api/api';

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/inquiry/list')
      .then(res => {
        setInquiries(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch inquiries:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Inquiry List</h2>

      {inquiries.length === 0 ? (
        <div className="alert alert-warning">No inquiries found.</div>
      ) : (
        <div className="row">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{inquiry.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {inquiry.email}</p>
                  <p className="card-text"><strong>Phone:</strong> {inquiry.phone}</p>
                  <p className="card-text"><strong>Property:</strong> {inquiry.propertyName}</p>
                  <p className="card-text text-muted">
                    <small>Submitted on: {new Date(inquiry.createdAt).toLocaleString()}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiryList;
