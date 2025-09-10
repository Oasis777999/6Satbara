import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { MapPin, Phone, Mail } from "lucide-react";
import api from "../api/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    intersted: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // For success or error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await api.post("/contact/add", formData,);
      
      if (response.status !== 201) {
        throw new Error("Failed to send inquiry");
      }

      setStatus({ type: "success", message: "Inquiry sent successfully!" });

      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        intersted: "",
        message: "",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setStatus({ type: "error", message: errorMessage });
    }
  };

  return (
    <div>
      <section id="contact" className="py-6 my-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-primary mb-3">
                Get In Touch
              </h2>
              <p className="lead text-muted">
                Ready to start your next project? Contact us today.
              </p>
            </Col>
          </Row>

          <Row>
            <Col lg={8} className="mx-auto">
              <Row className="mb-4">
                <Col md={4} className="text-center">
                  <Phone className="text-primary mb-2" size={40} />
                  <h6 className="fw-semibold">Call Us</h6>
                  <p className="text-muted mb-0">(555) 123-4567</p>
                </Col>
                <Col md={4} className="text-center">
                  <Mail className="text-primary mb-2" size={40} />
                  <h6 className="fw-semibold">Email Us</h6>
                  <p className="text-muted mb-0">info@primelanddealers.com</p>
                </Col>
                <Col md={4} className="text-center">
                  <MapPin className="text-primary mb-2" size={40} />
                  <h6 className="fw-semibold">Visit Us</h6>
                  <p className="text-muted mb-0">
                    123 Land Dealer St, City, State 12345
                  </p>
                </Col>
              </Row>

              <Card className="border-0 shadow mt-4">
                <Card.Body className="p-4">
                  <h4 className="text-center mb-4">Inquire About Land</h4>

                  {status && (
                    <Alert
                      variant={status.type === "success" ? "success" : "danger"}
                    >
                      {status.message}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="9999999999"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Land Type of Interest</Form.Label>
                      <Form.Select
                        name="intersted"
                        value={formData.intersted}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select land type
                        </option>
                        <option>Residential Plot</option>
                        <option>Commercial Land</option>
                        <option>Agricultural Land</option>
                        <option>Investment Plot</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements: size, budget, location..."
                        required
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="px-5"
                      >
                        Send Message
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
