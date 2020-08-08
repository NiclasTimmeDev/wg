// import * as types from "./../actionsTypes";
import * as types from "./../actionTypes";
import validator from "validator";
import axios from "axios";
import Cookies from "js-cookie";
import { REGISTER_ERROR } from "../actionTypes";
import setAlert from "./alert";

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
      }

      // TODO: LOAD USER
    } catch (error) {
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
