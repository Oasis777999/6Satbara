import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const InquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your real API endpoint
    axios.get('http://localhost:5000/contact/list')
      .then(res => {
        setInquiries(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching inquiries:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Inquiry Table</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Interested</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry, index) => (
              <tr key={inquiry._id || index}>
                <td>{index + 1}</td>
                <td>{inquiry.firstName}</td>
                <td>{inquiry.lastName}</td>
                <td>{inquiry.mobile}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.intersted}</td>
                <td>{inquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryTable;
