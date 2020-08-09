// import * as types from "./../actionsTypes";
import * as types from "./../actionTypes";
import validator from "validator";
import axios from "axios";
import Cookies from "universal-cookie";
import { REGISTER_ERROR } from "../actionTypes";
import setAlert from "./alert";

/**
 * Load the user.
 *
 * If the user is logged in, a token is stored in a server-side cookie,
 * which will be used to load the user.
 */
export const loadUser = () => {
  return async (dispatch) => {
    try {
      const cookies = new Cookies();
      // Query server
      const res = await axios.get("/api/users/get/single");

      // Put user data into store if response was positive.
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_USER_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
      const status = error.response.status;
      const errorMsg = error.response.data.errors[0].msg;

      dispatch({
        type: types.LOAD_USER_ERROR,
        payload: errorMsg,
      });
      if (status === 500) {
        dispatch(setAlert("danger", errorMsg));
      }
    }
  };
};

/**
 * Register a new user.
 *
 * @param {String} username
 *   The username
 * @param {String} email
 *   The email address
 * @param {String} password
 *   The password
 * @param {String} passwordConfirmed
 *   The confirmed password
 */
export const register = (username, email, password, passwordConfirmed) => {
  return async (dispatch) => {
    dispatch({
      type: types.START_FETCHING,
    });

    let errors = {};

    // Check if username is empty.
    if (!username) {
      errors.username = "Bitte trage einen Benutzernamen ein.";
    }

    // Check if email is valid.
    if (!validator.isEmail(email)) {
      errors.email = "Bitte gebe eine valide E-Mail Adresse ein";
    }

    // Check if password matches requirements.
    if (
      password.length < 8 ||
      password.includes("123456") ||
      password.includes("000000") ||
      password.includes("passwor") ||
      password === ""
    ) {
      errors.password =
        'Dein Passwort muss mindestens 8 Zeichen haben und darf nicht "123456", "000000" oder "passwort" enthalten.';
    }

    // Check if the two passwords match.
    if (password !== passwordConfirmed) {
      errors.passwordConfirmed =
        "Deine beiden Passwörter müssen übereinstimmen.";
    }

    // Return error if there are errors.
    if (Object.keys(errors).length !== 0) {
      return dispatch({
        type: REGISTER_ERROR,
        payload: errors,
      });
    }

    // Make API call.
    try {
      const res = await axios.post("/api/users/register", {
        username: username,
        email: email,
        password1: password,
        password2: passwordConfirmed,
      });

      // Success.
      if (res.status === 201) {
        dispatch({
          type: types.REGISTER_SUCCESS,
          payload: res.data,
        });

        // Load the new user.
        dispatch(loadUser());
      }
    } catch (error) {
      console.log(error);
      const status = error.response.status;
      const errorMsg = error.response.data.errors[0].msg;

      dispatch({
        type: types.REGISTER_ERROR,
        payload: errorMsg,
      });
      if (status === 500) {
        dispatch(setAlert("danger", errorMsg));
      }
    }
  };
};

/**
 * Login
 *
 * @param {String} email
 *   The email of the user
 * @param {String} password
 *   The password of the user
 */
export const login = (email, password) => {
  console.log(email);
  return async (dispatch) => {
    dispatch({
      type: types.START_FETCHING,
    });

    let errors = {};

    // Check if email is valid.
    if (!validator.isEmail(email)) {
      errors.email = "Bitte gebe eine valide E-Mail Adresse ein";
    }

    if (!password) {
      errors.password = "Bitte gebe Passwort ein.";
    }

    // Send error if santity checks result in errors.
    if (Object.keys(errors).length !== 0) {
      return dispatch({
        type: types.LOGIN_ERROR,
        payload: errors,
      });
    }
    try {
      // Make API call.
      const res = await axios.post("/api/users/login", {
        email: email,
        password: password,
      });

      if (res.status === 200) {
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: res.data,
        });

        // Load the new user.
        dispatch(loadUser());
      }
    } catch (error) {
      console.log(error);
      const status = error.response.status;
      const errorMsg = error.response.data.errors[0].msg;
      dispatch({
        type: types.REGISTER_ERROR,
        payload: errorMsg,
      });
      if (status === 500) {
        dispatch(setAlert("danger", errorMsg));
      }
    }
  };
};

/**
 * Logout
 */
export const logout = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/users/logout");
    } catch (error) {
      console.log(error);
      const status = error.response.status;
      const errorMsg = error.response.data.errors[0].msg;
      dispatch({
        type: types.REGISTER_ERROR,
        payload: errorMsg,
      });
      if (status === 500) {
        dispatch(setAlert("danger", errorMsg));
      }
    }
  };
};
