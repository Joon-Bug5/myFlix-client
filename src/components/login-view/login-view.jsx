import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then calls props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Card className="login-card">
        <Card.Title className="card-title">
          Welcome to my 10 Marvel Movies!
        </Card.Title>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter Username"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Password"
                />
              </Form.Group>
              <Button
                className="login-button"
                variant="dark"
                type="submit"
                onClick={handleSubmit}
              >
                Log-In
              </Button>
              <Button
                className="register-button"
                variant="dark"
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};
