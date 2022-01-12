import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = userState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://myflixmarvelapp.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // second argument '_self' is necessary so it will open page in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>Please Register</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter username"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    placeholder="Enter a password"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  registration: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};
