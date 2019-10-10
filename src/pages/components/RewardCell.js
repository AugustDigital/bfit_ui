import React from "react";
import { withStyles, Grid } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: "white",
    height: "100%"
  },
  image: {
    width: "100%",
    maxWidth: "100%",
    flexGrow: 1,
    backgroundImage: "url('/fancy_runner.png')",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
  },
  content: {
    flexGrow: 1
  }
});
class RewardCell extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes, className } = this.props;
    return (
      <Grid
        className={className + " " + classes.root}
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid className={classes.image} item xs={6}></Grid>
        <Grid className={classes.content} item xs={6}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={1}>
              Image
            </Grid>
            <Grid item xs={11}>
              Text
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RewardCell);
