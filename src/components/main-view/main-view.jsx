import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {_id: 1, Title: 'Iron-Man', Description: 'desc1...', ImagePath: 'https://m.media-amazon.com/images/I/91qvAndeVYL._AC_UY218_.jpg'},
        {_id: 2, Title: 'Avengers Endgame', Description: 'desc2...', ImagePath: 'https://m.media-amazon.com/images/I/91e9898R7QL._AC_UY218_.jpg'},
        {_id: 3, Title: 'Spider-Man Homecoming', Description: 'desc3...', ImagePath:'https://m.media-amazon.com/images/I/91mhJDbpH3L._AC_UY218_.jpg'}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() { // Render can only have one root element
    const {movies, selectedMovie} = this.state;

    if (movies.length === 0) return <div className = "main-view">Ths list is empty!</div>

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
        </div>
      );
    }
  }

// to have another root element in render(), need to close div as below and make seperate div for button