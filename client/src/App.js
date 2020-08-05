import React from "react";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  );
}

export default App;
