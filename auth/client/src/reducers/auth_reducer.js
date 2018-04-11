import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR_IN,
  AUTH_ERROR_UP,
  FETCH_MESSAGE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }; // reset error in case user is auth
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR_IN: 
      return { ...state, errorin: action.payload };
    case AUTH_ERROR_UP: 
      return { ...state, errorup: action.payload };          
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }

  return state;
}
