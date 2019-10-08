import React from "react";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: theme.background
  }
});
class CreateReward extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>Create Reward</div>;
  }
}

export default withStyles(styles, { withTheme: true })(CreateReward);
