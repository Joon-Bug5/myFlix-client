import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Card className="genre-card">
          <Row>
            <Col>
              <div>
                <span className="label">Name:</span>
                <span className="value">{Genre.Name}</span>
              </div>
              <div>
                <span className="label">Description:</span>
                <span className="value">{Genre.Description}</span>
              </div>
              <button
                className="genre-button"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </button>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
