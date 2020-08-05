import React, { Fragment } from "react";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Components.
import Navbar from "./components/navigation/Navbar";

// Styles
import { ThemeProvider } from "styled-components";
import "./styles/App.css";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Fragment>
          <Router>
            <Navbar />
          </Router>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
