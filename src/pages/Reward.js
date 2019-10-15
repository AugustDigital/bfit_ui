import React, { Fragment } from "react";
import { withStyles, Grid, Typography, Fab } from "@material-ui/core";
import compose from "recompose/compose";
import { Redirect } from "react-router-dom";
import RewardCell from "./components/RewardCell";
import NavBar from "./components/NavBar";
const styles = theme => ({
  root: {
    margin: "0 auto 0 auto",
    padding: "10vh 0 10vh 0",
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "50px 0 80px 0"
    }
  },
  card: {
    height: "300px"
  },
  rewardsTitle: {
    letterSpacing: "2.5px",
    color: "#032F41",
    fontWeight: "400",
    fontSize: "1.4em",
    margin: "30px 0 10px 0",
    width: "100%",
    textAlign: "left!important",
    [theme.breakpoints.down("sm")]: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "5vw",
        paddingRight: "5vw"
      }
    }
  },
  rewardsDetails: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "5vw",
      paddingRight: "5vw"
    }
  },
  footer: {
    "& button": theme.buttons.primary,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#032F41",
    padding: "15px",
    textAlign: "center"
  },
  wideButton: {
    minWidth: "30%!important",
    [theme.breakpoints.down("sm")]: {
      minWidth: "90%!important",
      paddingLeft: "5vw",
      paddingRight: "5vw"
    }
  }
});
class Reward extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    console.log(this.props);
    const { classes, id, history } = this.props;
    console.log(history);
    if (id) {
      return (
        <Fragment>
          <NavBar history={history} back="/" />
          <Grid
            className={classes.root}
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <RewardCell
              className={classes.card}
              largeImage
              tile={{
                title: "Meal-Kit for a month",
                img: "/fancy_runner_home.png",
                points: "5000",
                icon: "/fancy_runner_home.png"
              }}
            />
            <Typography className={classes.rewardsTitle} variant="h5">
              Details
            </Typography>
            <Typography className={classes.rewardsDetails}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Typography>
          </Grid>
          <div className={classes.footer}>
            <Fab
              className={classes.wideButton}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
            >
              Redeem Reward
            </Fab>
          </div>
        </Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default compose(withStyles(styles, { name: "Reward", withTheme: true }))(
  Reward
);
