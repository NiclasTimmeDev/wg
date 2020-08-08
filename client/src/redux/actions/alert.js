import * as types from "./../actionTypes";

const setAlert = (type, message) => {
  try {
    return async (dispatch) => {
      dispatch({
        type: types.SET_ALERT,
        payload: {
          type: type,
          message: message,
        },
      });
      setTimeout(() => {
        dispatch({
          type: types.REMOVE_ALERT,
        });
      }, 5000);
    };
  } catch (error) {
    console.log(error.message);
  }
};

export default setAlert;
