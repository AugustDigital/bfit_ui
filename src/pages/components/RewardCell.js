import React from "react";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: theme.background
  }
});
class RewardCell extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.className + " " + classes.root}>
        Reward details
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RewardCell);
