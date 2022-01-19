import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action)
  }
}

function user(state = [], action) {
  console.log('user reducer', action)
  switch (action.type) {
      case SET_USER:
          return action.value;
      case UPDATE_USER:
          return action.value;
      default:
          return state
  }
}

const movieApp = combineReducers({
  movies,
  visibilityFilter
});

export default moviesApp;