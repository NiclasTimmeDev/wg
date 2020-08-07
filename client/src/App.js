import React, { Fragment } from "react";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Components.
import Navbar from "./components/navigation/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Styles
import { ThemeProvider } from "styled-components";
import "./styles/App.css";
import "./styles/bootstrap-grid.min.css";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Fragment>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
