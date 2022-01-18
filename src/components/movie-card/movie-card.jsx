import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Button, Container } from "react-bootstrap";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container>
        <br />
        <Row>
          <Card align="center">
            <Card.Img
              variant="top"
              src={movie.ImagePath}
              crossOrigin="true"
              width="200"
              height="300"
            />
            <Card.Body>
              <Card.Title className="font-weight-bold">
                {movie.Title}
              </Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="link">Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  OnMovieClick: PropTypes.func.isRequired,
};
