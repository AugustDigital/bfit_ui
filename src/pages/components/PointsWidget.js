import React from "react";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: "blue"
  }
});
class PointsWidget extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes, className } = this.props;
    return <div className={className + " " + classes.root}>Reward details</div>;
  }
}

export default withStyles(styles, { withTheme: true })(PointsWidget);
