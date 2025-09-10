import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/data"); // Change port if needed
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <Container className="py-5">
        <h2 className="text-center mb-4 text-primary">User Inquiries</h2>

        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && <Alert variant="danger">Error: {error}</Alert>}

        {!loading && !error && (
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Interested In</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.mobile}</td>
                      <td>{user.email}</td>
                      <td>{user.intersted}</td>
                      <td>{user.message}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Data;
