import React from "react";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: theme.background
  }
});
class Login extends React.Component {
  state = {};
  async componentDidMount() {
    const resp = await fetch("http://localhost:5000/");
    const json = await resp.json();
    this.setState({ data: json.data });
    console.log(json);
  }
  async login() {
    alert("!");
    const resp = await fetch("http://localhost:5000/auth/google");
    const json = await resp.json();
    this.setState({ data: json.data });
    console.log(json);
  }
  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <div className={classes.root}>
        {data ? (
          <div>
            {data}
            <button onClick={this.login}>Login</button>
            <a href="http://localhost:5000/auth/google">Test login</a>
          </div>
        ) : (
          <div>Api Offline</div>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
