import React from "react";
import axios from "axios";

import "./main-view.scss";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Navbar, Nav, Row, Col } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registration: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://myflixmarvelapp.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegistration(registration) {
    this.setState({
      registration,
    });
  }

  render() {
    // Render can only have one root element
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (!user)
      return (
        <RegistrationView
          onRegistration={(user) => this.onRegistration(user)}
        />
      );

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar
          expand="lg"
          bg="dark"
          variant="dark"
          className="mainNavbar justify-content-center"
        >
          <Navbar.Brand href="">MyFlix</Navbar.Brand>
          <Nav>
            <Nav.Link href="">Profile</Nav.Link>
            <Nav.Link href="">Logout</Nav.Link>
          </Nav>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          {selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={5} key={movie._id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}

// to have another root element in render(), need to close div as below and make seperate div for button
