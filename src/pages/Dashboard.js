import React, { Fragment } from "react";
import {
  withStyles,
  Grid,
  Typography,
  GridList,
  GridListTile
} from "@material-ui/core";
import NavBar from "./components/NavBar";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import compose from "recompose/compose";
import PointsWidget from "./components/PointsWidget";
import RewardCell from "./components/RewardCell";
const styles = theme => ({
  root: {},
  pointsWidget: {
    width: "40vw",
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    }
  },
  topSectionContainer: {
    width: "100%"
  },
  gridListContainer: {
    paddingLeft: "10vw",
    paddingRight: "10vw",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    background: "linear-gradient(to top, #F1F8F9 85%, transparent)",
    width: "100%",
    "& ul": {
      width: "100%",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      background: "#F1F8F9"
    }
  },
  rewardCell: {
    width: "23%",
    margin: "1%",
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    }
  },
  pointsLabel: {
    marginTop: "100px",
    color: "white",
    letterSpacing: "4px",
    fontWeight: "300",
    fontSize: "10em",
    textShadow: "2px 2px 78px rgba(3, 47, 65, 0.8)",
    [theme.breakpoints.down("sm")]: {
      marginTop: "120px",
      letterSpacing: "1px",
      fontWeight: "500",
      fontSize: "5em"
    }
  },
  pointsSublable: {
    color: "black",
    fontWeight: "400",
    letterSpacing: "4px",
    fontSize: "1.5em",
    margin: "-15px 0 30px 0",
    [theme.breakpoints.down("sm")]: {
      margin: "-10px 0 50px 0"
    }
  },
  rewardsTitle: {
    letterSpacing: "2.5px",
    color: "#032F41",
    fontWeight: "400",
    fontSize: "1.4em",
    margin: "30px 0 10px 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  background: {
    background: "url('/fancy_runner_home.png')",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    top: "2vh",
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
      opacity: 0.07,
      [theme.breakpoints.down("sm")]: {
        paddingTop: "5vh",
        fontSize: "10em"
      }
    },
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "start top",
      background: "url('/fancy_runner.png') ",
      backgroundSize: "130% auto"
    }
  }
});
const listItems = [
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  }
];
class Dashboard extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes, width } = this.props;
    const points = 99999;
    const steps = 99999;
    const pointsTotal = 99999;
    const smallScreen = !isWidthUp("md", width);
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
              <Grid item sm={12}>
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
            </Grid>
          </Grid>
          <Grid item className={classes.gridListContainer}>
            <GridList cellHeight={110} cols={smallScreen ? 1 : 4}>
              <GridListTile
                key="Subheader"
                cols={smallScreen ? 1 : 4}
                style={{ height: "auto" }}
              >
                <Typography className={classes.rewardsTitle} variant="h5">
                  Reward offers
                </Typography>
              </GridListTile>
              {listItems.map((item, index) => (
                <RewardCell
                  key={index}
                  tile={item}
                  className={classes.rewardCell}
                ></RewardCell>
              ))}
            </GridList>
          </Grid>
        </Grid>
        <div className={classes.background}>
          <Typography variant="h1">{pointsTotal}</Typography>
        </div>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Dashboard", withTheme: true }),
  withWidth()
)(Dashboard);
