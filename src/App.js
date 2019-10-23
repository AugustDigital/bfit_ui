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
import query from "query-string";
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
    const authenticated = Cookies.get("api_session");
    console.log("authed?" + authenticated);
    if (!authenticated) {
      console.log("redirect");
      return <Redirect to="/login" />;
    } else {
      return component;
    }
  }
  render() {
    //let query = new URLSearchParams(useLocation().search);
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/createUpdateReward"
              render={props =>
                this.renderIfLoggedIn(
                  <CreateReward
                    {...props}
                    id={query.parse(window.location.search).id}
                    admin={query.parse(window.location.search).admin}
                  />
                )
              }
            />
            <Route
              path="/reward"
              render={props =>
                this.renderIfLoggedIn(
                  <Reward
                    {...props}
                    id={query.parse(window.location.search).id}
                    admin={query.parse(window.location.search).admin}
                  />
                )
              }
            />
            <Route path="/login">
              <Login />
            </Route>
            <Route
              exact
              path="/"
              render={props =>
                this.renderIfLoggedIn(
                  <Dashboard
                    admin={query.parse(window.location.search).admin}
                    {...props}
                  />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
