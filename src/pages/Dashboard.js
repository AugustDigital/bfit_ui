import React, { Fragment } from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import NavBar from "./components/NavBar";
import PointsWidget from "./components/PointsWidget";
import RewardCell from "./components/RewardCell";
const styles = theme => ({
  root: {},
  pointsWidget: {
    width: "50vw"
  },
  topSectionContainer: {
    width: "100%"
  },
  rewardCell: {
    minWidth: "25vw",
    minHeight: "300px"
  },
  pointsLabel: {
    marginTop: "100px",
    color: "white",
    letterSpacing: "3.5px",
    fontWeight: "400",
    textShadow: "2px 2px 78px rgba(3, 47, 65, 0.8)"
  },
  pointsSublable: {
    letterSpacing: "2.5px",
    color: "black",
    fontWeight: "400",
    fontSize: "2.0em"
  },
  background: {
    background:
      "linear-gradient(to bottom, transparent, #F1F8F9 75%), url('/fancy_runner_home.png')",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1
  }
});
class Dashboard extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavBar />
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.topSectionContainer}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography className={classes.pointsLabel} variant="h1">
                      4200
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.pointsSublable} variant="h6">
                      Points balance
                    </Typography>
                  </Grid>
                  <Grid item>
                    <PointsWidget className={classes.pointsWidget} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4"> Reward offers</Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid className={classes.rewardCell} item xs={3}>
                <RewardCell />
              </Grid>
              <Grid className={classes.rewardCell} item xs={3}>
                <RewardCell />
              </Grid>
              <Grid className={classes.rewardCell} item xs={3}>
                <RewardCell />
              </Grid>
              <Grid className={classes.rewardCell} item xs={3}>
                <RewardCell />
              </Grid>
              <Grid className={classes.rewardCell} item xs={3}>
                <RewardCell />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.background}></div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
