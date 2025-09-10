import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import api from "../api/api"; // Adjust the path to your API config

const PropertyInquiryForm = ({ propertyName = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyName: propertyName,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Update property name if prop changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      propertyName: propertyName,
    }));
  }, [propertyName]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    if (!formData.name || !formData.phone || !formData.email || !formData.propertyName) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await api.post("/inquiry/add", formData);
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          propertyName: propertyName, // preserve initial propertyName
        });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Submission failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <Container className="py-4 shadow rounded p-2">
      <h4 className="mb-4">Inquiry Form for <br/> <span className="text-primary shadow fw-bold rounded p-1">{propertyName || "Property"}</span></h4>
      <p className="text-muted">Please share your contact</p>

      {success && <Alert variant="success">Form submitted successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Property Name</Form.Label>
          <Form.Control
            type="text"
            name="propertyName"
            placeholder="Property name"
            value={formData.propertyName}
            onChange={handleChange}
            readOnly // optional, remove if you want user to edit it
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit Inquiry
        </Button>
      </Form>
    </Container>
  );
};

export default PropertyInquiryForm;
