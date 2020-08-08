import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Reducers
import auth from "./reducers/auth";
import alert from "./reducers/alert";

const initState = {};

// Create root reducer from imported reducers.
const rootReducer = combineReducers({
  auth,
  alert,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
