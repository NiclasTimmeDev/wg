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
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        token: action.payload,
        errors: {},
        fetchInProgress: false,
      };
    case types.REGISTER_ERROR:
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
