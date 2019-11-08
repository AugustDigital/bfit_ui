import React, { Fragment } from "react";
import { withStyles, CircularProgress } from "@material-ui/core";
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
import Vendor from "./pages/Vendor";
import Admin from "./pages/Admin";
import query from "query-string";
import axios from "axios";
const styles = theme => ({
  root: {
    background: theme.background
  },
  spinner: {
    top: "50%",
    left: "50%",
    position: "absolute",
    margin: "-20px 0 0 -20px "
  }
});
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true
});
class App extends React.Component {
  state = { loading: true, user: null };
  async componentDidMount() {
    const resp = await instance.get("/user");
    console.log(resp.data.data);
    if (resp.data.error) {
      this.setState({ loading: false, error: true });
    } else {
      this.setState({ loading: false, user: resp.data.data });
    }
  }
  renderIfLoggedIn(component, user) {
    if (user) {
      console.log("authed=" + (user !== null));
      return component;
    } else {
      console.log("redirect");
      return <Redirect to="/login" />;
    }
  }
  renderIfFullVendor(component, user) {
    if (user && user.roleType === 1 && !user.vendorData) {
      return <Redirect to="/vendor" />;
    } else {
      return component;
    }
  }
  render() {
    const { classes } = this.props;
    const { loading, user } = this.state;
    return (
      <Fragment>
        {loading ? (
          <CircularProgress className={classes.spinner} />
        ) : (
          <Router>
            <div>
              <Switch>
                <Route
                  path="/admin"
                  render={props =>
                    this.renderIfFullVendor(
                      this.renderIfLoggedIn(
                        <Admin
                          {...props}
                          API_URL={API_URL}
                          id={query.parse(window.location.search).id}
                          admin={query.parse(window.location.search).admin}
                          user={user}
                          api={instance}
                        />,
                        user
                      ),
                      user
                    )
                  }
                />
                <Route
                  path="/createUpdateReward"
                  render={props =>
                    this.renderIfFullVendor(
                      this.renderIfLoggedIn(
                        <CreateReward
                          {...props}
                          API_URL={API_URL}
                          id={query.parse(window.location.search).id}
                          admin={query.parse(window.location.search).admin}
                          user={user}
                          api={instance}
                        />,
                        user
                      ),
                      user
                    )
                  }
                />
                <Route
                  path="/reward"
                  render={props =>
                    this.renderIfLoggedIn(
                      <Reward
                        {...props}
                        API_URL={API_URL}
                        id={query.parse(window.location.search).id}
                        admin={query.parse(window.location.search).admin}
                        user={user}
                        api={instance}
                      />,
                      user
                    )
                  }
                />
                <Route path="/login">
                  <Login api={instance} />
                </Route>
                <Route
                  exact
                  path="/"
                  render={props =>
                    this.renderIfFullVendor(
                      this.renderIfLoggedIn(
                        <Dashboard
                          API_URL={API_URL}
                          admin={query.parse(window.location.search).admin}
                          {...props}
                          user={user}
                          api={instance}
                        />,
                        user
                      ),
                      user
                    )
                  }
                />
                <Route
                  path="/vendor"
                  render={props =>
                    this.renderIfLoggedIn(
                      <Vendor
                        {...props}
                        API_URL={API_URL}
                        user={user}
                        api={instance}
                      />,
                      user
                    )
                  }
                />
              </Switch>
            </div>
          </Router>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
