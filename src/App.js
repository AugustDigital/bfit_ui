import React from "react";
import { withStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reward from "./pages/Reward";
import CreateReward from "./pages/CreateReward";
import Cookies from "js-cookie";
const styles = theme => ({
  root: {
    background: theme.background
  }
});
class App extends React.Component {
  requireAuth = (nextState, replace, next) => {
    const authenticated = Cookies.get("token");
    console.log(authenticated);
    if (!authenticated) {
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
    next();
  };
  renderIfLoggedIn(component) {
    const authenticated = Cookies.get("token");
    console.log("authed?" + authenticated);
    if (!authenticated) {
      console.log("redirect");
      return <Redirect to="/login" />;
    } else {
      return component;
    }
  }
  render() {
    return (
      <Router>
        <div>
          {/* <div>TODO PROPER NAVBAR</div> */}

          <Switch>
            <Route path="/create">
              <CreateReward />
            </Route>
            <Route path="/reward">
              <Reward />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route
              exact
              path="/"
              render={() => this.renderIfLoggedIn(<Dashboard />)}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
