import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import "./profile-view.scss";

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
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  // Current User
  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://myflixmarvelapp.herokuapp.com/users/${username}`, {
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
  }

  // Edit Current User
  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://myflixmarvelapp.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
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
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(error);
      });
  }

  // Delete Favorite Movies
  removeFavorite = (e, movie) => {
    const username = localStorage.getItem("user");
    console.log(username);
    const token = localStorage.getItem("token");
    console.log(this.props);
    axios
      .delete(
        `https://myflixmarvelapp.herokuapp.com/users/${username}/favorites/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was deleted");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete Current User
  deleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://myflixmarvelapp.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="current-user">
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <div>
                  <span className="label">Username:</span>
                  <span className="value">{Username}</span>
                </div>
                <div>
                  <span className="label">Email:</span>
                  <span className="value">{Email}</span>
                </div>
                <div>
                  <span className="label">Birthday:</span>
                  <span className="value">{Birthday}</span>
                </div>
              </Card.Text>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Title>Update Profile</Card.Title>
              <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    placeholder="New Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    placeholder="New Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
        <div className="bt">
          <Button variant="warning" type="submit" onClick={this.editUser}>
            Update User
          </Button>
          <Button
            className="delete-button"
            variant="danger"
            onClick={() => this.deleteUser()}
          >
            Delete User
          </Button>
        </div>

        <h3 className="favorite-movies">Favorite Movies</h3>

        <Row>
          {favorites &&
            favorites.map((movie) => (
              <Col lg={4} key={movie._id}>
                <div>
                  <MovieCard movie={movie} />
                  <Button
                    bg="danger"
                    variant="danger"
                    className="unfav-button"
                    value={movie._id}
                    onClick={(e) => this.removeFavorite(e, movie)}
                  >
                    Delete From Favorites
                  </Button>
                </div>
              </Col>
            ))}
        </Row>
        <div className="backButton">
          <Button
            size="md"
            variant="outline-primary"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </div>
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
