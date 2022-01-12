import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import "./login-view.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be 6 characters long");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
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
    }
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
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Password"
                />
                {passwordErr && <p>{passwordErr}</p>}
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
