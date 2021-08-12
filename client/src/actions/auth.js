// Auth actions
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from './constant';
import { setAlert } from './alert';

// Load User
export const loadUser = () => async (dispatch) => {
  // If there is a token in local storage
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const headers = {
      'Authorization': localStorage.getItem('token')
    };

    const res = await axios.get('/api/auth', { headers });

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      // Make a request from server
      const res = await axios.post('/api/users', body, config);

      // If axios is success -- put token in localStorage
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // Get the errors
      const errors = err.response.data.errors;

      // If there are errors, show them
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }

      // Dispatch REGISTER_FAIL to remove token from localStorage
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
