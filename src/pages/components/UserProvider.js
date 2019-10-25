import React, { Fragment } from "react";
import { withStyles, CircularProgress } from "@material-ui/core";
import compose from "recompose/compose";
import withWidth from "@material-ui/core/withWidth";
import { Redirect } from "react-router-dom";
const styles = theme => ({
  root: {}
});
class UserProvider extends React.Component {
  state = { user: null };
  async componentDidMount() {
    const resp = await fetch("http://localhost:5000/login");
    const json = await resp.json();
    console.log(json);
    if (json.error) {
      this.setState({ error: json.error });
    } else if (json.data) {
      this.setState({ user: json.data });
    }
  }
  render() {
    const { admin } = this.props;
    const { user, error, loading } = this.state;
    let content;
    if (loading) {
      content = <CircularProgress />;
    } else if (error) {
      content = <Redirect to="/login" />;
    } else if (user) {
      content = React.Children.map(this.props.children, child =>
        React.cloneElement(child, { user: user })
      );
    }

    return <div>{content}</div>;
  }
}

export default compose(
  withStyles(styles, { name: "UserProvider", withTheme: true }),
  withWidth()
)(UserProvider);
