import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container } from "react-bootstrap";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container className="movie-container">
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link" variant="dark">
                More Details
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  OnMovieClick: PropTypes.func.isRequired,
};
