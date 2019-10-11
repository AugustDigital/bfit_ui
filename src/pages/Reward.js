import React from "react";
import { withStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
const styles = theme => ({
  root: {
    background: theme.backgrounda
  }
});
class Reward extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    console.log(this.props);
    const { classes, id } = this.props;
    if (id) {
      return <div className={classes.root}>Reward details: {id}</div>;
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default withStyles(styles, { withTheme: true })(Reward);
