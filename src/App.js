import React from "react";
import { withStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reward from "./pages/Reward";
import CreateReward from "./pages/CreateReward";
const styles = theme => ({
  root: {
    background: theme.background
  }
});
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* <div>TODO PROPER NAVBAR</div> */}
          <nav>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/reward">Reward</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
            </ul>
          </nav>
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
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
