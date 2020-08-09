import * as types from "./../actionTypes";

const initState = {
  loading: true,
  authenticated: false,
  user: {},
  token: "",
  errors: {},
  fetchInProgress: false,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.START_FETCHING:
      return {
        ...state,
        fetchInProgress: true,
      };
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        errors: {},
        user: action.payload,
        fetchInProgress: false,
      };
    case (types.REGISTER_SUCCESS, types.LOGIN_SUCCESS):
      return {
        ...state,
        loading: false,
        authenticated: true,
        token: action.payload,
        errors: {},
        fetchInProgress: false,
      };
    case (types.REGISTER_ERROR, types.LOAD_USER_ERROR, types.LOGIN_ERROR):
      return {
        ...state,
        loading: false,
        authenticated: false,
        token: "",
        user: {},
        errors: action.payload,
        fetchInProgress: false,
      };

    default:
      return initState;
  }
};

export default auth;
