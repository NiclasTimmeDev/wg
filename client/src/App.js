import React, { Fragment, useEffect } from "react";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/auth";

// Components.
import Alert from "./components/uiElements/Alert";
import Navbar from "./components/navigation/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import TodoList from "./components/todos/TodoList";

// Styles
import { ThemeProvider } from "styled-components";
import "./styles/App.css";
import "./styles/bootstrap-grid.min.css";
import theme from "./styles/theme";

function App() {
  // Load the user when component mounts.
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Fragment>
          <Router>
            <Alert />
            <Navbar />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} exact />
              <Route path="/todolist" component={TodoList} exact />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
