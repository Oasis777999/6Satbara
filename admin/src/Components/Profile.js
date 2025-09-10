import React from 'react';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h5>User not found. Please log in again.</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header as="h5" className="bg-primary text-white text-center">
              User Profile
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xs={5} md={4}><strong>First Name:</strong></Col>
                <Col xs={7} md={8}>{user.firstName}</Col>
              </Row>
              <Row className="mb-3">
                <Col xs={5} md={4}><strong>Last Name:</strong></Col>
                <Col xs={7} md={8}>{user.lastName}</Col>
              </Row>
              <Row className="mb-3">
                <Col xs={5} md={4}><strong>Phone:</strong></Col>
                <Col xs={7} md={8}>{user.phone}</Col>
              </Row>
              <Row className="mb-3">
                <Col xs={5} md={4}><strong>Email:</strong></Col>
                <Col xs={7} md={8}>
                  {user.email}
                  <Badge bg="success" className="ms-2">Verified</Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
