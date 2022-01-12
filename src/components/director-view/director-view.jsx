import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Card className="director-card">
          <Row>
            <Col>
              <div>
                <span className="label">Name:</span>
                <span className="value">{Director.Name}</span>
              </div>
              <div>
                <span className="label">Bio:</span>
                <span className="value">{Director.Bio}</span>
              </div>
              <div>
                <span className="label">Birth:</span>
                <span className="value">{Director.Birth}</span>
              </div>
              <button
                className="director-button"
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

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
  }).isRequired,
};
