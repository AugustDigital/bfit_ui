import React from "react";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: theme.background
  }
});
class Dashboard extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>Dashboard</div>;
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
