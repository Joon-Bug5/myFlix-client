import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import "./profile-view.scss";
import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://myflixmarvelapp.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Allow user to edit or update profile
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://myflixmarvelapp.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Updated Profile");
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteFavorite(e, movie) {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://myflixmarvelapp.herokuapp.com/users/${Username}/favorites/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        alert("Removed Movie");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Deregister
  deleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://myflixmarvelapp.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Deleted Profile");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.state;

    return (
      <Container className="profile-view">
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Title className="font-weight-bold">
                {Username} Profile
              </Card.Title>
              <Card.Text>
                <div className="profile-container">
                  <span className="label">Username: </span>
                  <span className="value">{Username}</span>
                  <br />
                  <br />
                  <span className="label">Email: </span>
                  <span className="value">{Email}</span>
                  <br />
                  <br />
                  <span className="label">Birthday: </span>
                  <span className="value">{Birthday}</span>
                </div>
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title className="font-weight-bold">
                  Update Profile
                </Card.Title>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <br />
                    <input
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <br />
                    <input
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <br />
                    <input
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <br />
                    <input
                      type="date"
                      name="Birthday"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <br />
                  <div className="buttons">
                    <Button
                      variant="warning"
                      type="submit"
                      onClick={this.editUser}
                    >
                      Update User
                    </Button>
                    <Button
                      className="delete-button"
                      variant="danger"
                      onClick={() => this.deleteUser()}
                    >
                      {" "}
                      Delete User{" "}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <Card>
          <Row>
            <Col>
              <h4 className="font-weight-bold">Favorite Movies</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Body>
                {FavoriteMovies.length === 0 && <div>No Favorite Movie</div>}
                <Row>
                  {FavoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (
                        movie._id ===
                        FavoriteMovies.find((fav) => fav === movie._id)
                      ) {
                        return (
                          <Card key={movie._id}>
                            <Card.Body>
                              <Card.Title className="font-weight-bold">
                                {movie.Title}
                              </Card.Title>
                              <Card.Img
                                variant="top"
                                src={movie.ImagePath}
                                crossOrigin="true"
                                width="150"
                                height="250"
                                className="mt-1"
                              />
                              <Button
                                size="sm"
                                variant="danger"
                                className="mt-1"
                                value={movie._id}
                                onClick={(e) => this.deleteFavorite(e, movie)}
                              >
                                {" "}
                                Remove{" "}
                              </Button>
                            </Card.Body>
                          </Card>
                        );
                      }
                    })}
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        <br />
        <div className="backButton">
          <Button
            size="md"
            variant="dark"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </div>
        <br />
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};
