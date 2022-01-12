import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  favoriteMovie() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const { movie } = this.props;

    axios
      .post(
        `https://myflixmarvelapp.herokuapp.com/users/${Username}/favorites/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(movie._id);
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
                  <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                  <span className="label">Title: </span>
                  <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                  <span className="label">Description: </span>
                  <span className="value">{movie.Description}</span>
                </div>
                <button
                  className="movie-button"
                  onClick={() => {
                    onBackClick(null);
                  }}
                >
                  Back
                </button>

                <Button
                  variant="outline-primary"
                  className="btn-outline-primary"
                  onClick={() => {
                    this.addToFavs();
                  }}
                >
                  Add to Favorites
                </Button>

                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
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
