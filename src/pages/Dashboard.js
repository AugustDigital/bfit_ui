import React, { Fragment } from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import NavBar from "./components/NavBar";
import PointsWidget from "./components/PointsWidget";
import RewardCell from "./components/RewardCell";
const styles = theme => ({
  root: {
    paddingLeft: "10vw",
    paddingRight: "10vw"
  },
  pointsWidget: {
    width: "40vw"
  },
  topSectionContainer: {
    width: "100%"
  },
  rewardCell: {
    minWidth: "20vw",
    minHeight: "100px",
    margin: "5px"
  },
  pointsLabel: {
    marginTop: "100px",
    color: "white",
    letterSpacing: "4px",
    fontWeight: "300",
    fontSize: "10em",
    textShadow: "2px 2px 78px rgba(3, 47, 65, 0.8)"
  },
  pointsSublable: {
    color: "black",
    fontWeight: "400",
    letterSpacing: "4px",
    fontSize: "1.5em",
    margin: "-15px 0 30px 0"
  },
  rewardsTitle: {
    letterSpacing: "2.5px",
    color: "#032F41",
    fontWeight: "400",
    fontSize: "1.4em",
    margin: "30px 0 10px 0"
  },
  background: {
    background:
      "linear-gradient(to bottom, transparent, #F1F8F9 75%), url('/fancy_runner_home.png')",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    "& h1": {
      fontSize: "24em",
      background: "linear-gradient(black, transparent)",
      "-webkit-background-clip": "text",
      textFillColor: "transparent",
      textAlign: "center",
      fontWeight: 400,
      opacity: 0.07
    }
  }
});
class Dashboard extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes } = this.props;
    const points = 99999;
    const steps = 99999;
    const pointsTotal = 99999;
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
                      {pointsTotal}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.pointsSublable} variant="h6">
                      Points balance
                    </Typography>
                  </Grid>
                  <Grid item>
                    <PointsWidget
                      className={classes.pointsWidget}
                      points={points}
                      steps={steps}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={classes.rewardsTitle} variant="h5">
              Reward offers
            </Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid className={classes.rewardCell} item xs={3}>
                <RewardCell className={classes.rewardCell} />
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
        <div className={classes.background}>
          <Typography variant="h1">{pointsTotal}</Typography>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
