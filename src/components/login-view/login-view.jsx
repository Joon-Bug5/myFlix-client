import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import "./login-view.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://myflixmarvelapp.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
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
                variant="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Log-In
              </Button>
              <Link to={`/register`}>
                <Button size="md" variant="primary" className="register-button">
                  {" "}
                  Register
                </Button>
              </Link>
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
