import * as types from "./../actionTypes";

const initState = { type: "none", message: "" };

const alert = (state = initState, action) => {
  switch (action.type) {
    case types.SET_ALERT:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      };
    case types.REMOVE_ALERT:
      return { ...state, type: "none", message: "" };
    default:
      return state;
  }
};

export default alert;
