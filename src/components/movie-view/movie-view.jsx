import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
  }
  favoriteMovie() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const { movie } = this.props;

    axios
      .post(
        `https://myflixmarvelapp.herokuapp.com/users/${Username}/favorites/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
        }
      )
      .then((response) => {
        console.log(response);
        alert("Added to Favorites");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Card className="movie-card">
          <Row>
            <Col>
              <div className="movie-view">
                <div className="movie-poster">
                  <img
                    src={movie.ImagePath}
                    crossOrigin="true"
                    width="300"
                    height="400"
                  />
                </div>
                <div className="movie-title">
                  <span className="title">Title: </span>
                  <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                  <span className="description">Description: </span>
                  <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                  <span className="label">Genre: </span>
                  <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                  <span className="director">Director: </span>
                  <span className="value">{movie.Director.Name}</span>
                </div>
                <br />
                <Button
                  variant="outline-primary"
                  className="btn-outline-primary"
                  onClick={() => {
                    onBackClick(null);
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="outline-primary"
                  className="btn-outline-primary"
                  onClick={() => {
                    this.favoriteMovie();
                  }}
                >
                  Add to Favorites
                </Button>

                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button
                    variant="outline-primary"
                    className="btn-outline-primary"
                    variant="link"
                  >
                    Director
                  </Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button
                    variant="outline-primary"
                    className="btn-outline-primary"
                    variant="link"
                  >
                    Genre
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
