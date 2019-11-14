import React from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import compose from "recompose/compose";
import RoleSelection from "./RoleSelection";
import LogoBfitLong from "../res/logo_bfit_long.svg";
const contentMarginLeft = "5vw";
const styles = theme => ({
  root: {
    height: "100vh",
    "& button": theme.buttons.secondary
  },
  runnerImage: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    height: "800px",
    width: "730px",
    backgroundImage: "url('/fancy_runner.png');",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
  },
  leftContainer: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto"
    }
  },

  contentContainer: {
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundImage:
        "linear-gradient(rgba(250,250,250,0.4), rgba(250,250,250,0.1)), url('/fancy_runner.png');"
    },
    height: "100%",
    "& img": {
      marginLeft: contentMarginLeft
    },
    "& h2": {
      fontFamily: "BebasNeue",
      [theme.breakpoints.down("sm")]: {
        marginRight: contentMarginLeft,
        width: "auto"
      },
      color: "#032F41",
      fontWeight: "400",
      fontSize: "2.6em",
      marginTop: "3vh",
      letterSpacing: "2.5px",
      lineHeight: "1.5em",
      marginLeft: contentMarginLeft,
      width: "60%"
    },
    "& h6": {
      color: "#032F41",
      marginLeft: contentMarginLeft,
      marginRight: contentMarginLeft
    }
  },
  footer: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    backgroundColor: "#032F41",
    width: "50vw",
    maxWidth: "100%",
    color: "white",
    textAlign: "center"
  },
  blurb: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "rgba(255,255,255,0.85)",
      borderRadius: "5px",
      padding: "20px",
      marginBottom: "5px",
      marginLeft: "5px",
      marginRight: "5px",
      boxShadow: "0px 2px 5px 3px rgba(0,0,0,0.1)"
    }
  }
});
//const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
class Login extends React.Component {
  state = {};
  async componentDidMount() {}
  handleRoleDialogClose = () => {
    this.setState({ user: this.props.user });
  };
  onRoleClick = async roleType => {
    await this.props.api.get(`/auth/google?userType=${roleType}`, {
      roleType: roleType
    });
    this.handleRoleDialogClose();
  };
  render() {
    const { classes, width } = this.props;
    const smallScreen = !isWidthUp("md", width);
    return (
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="space-around"
        alignItems="stretch"
      >
        <Grid item xs={12} md={6}>
          <Grid
            className={classes.leftContainer}
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <Grid item>
              <Grid
                className={classes.contentContainer}
                container
                direction="column"
                justify="center"
                alignItems="stretch"
              >
                <Grid item>
                  <img alt="logo" src={LogoBfitLong} />
                </Grid>
                <Grid item>
                  <Typography variant="h2">
                    Earn rewards
                    <br />
                    while you stay fit.
                  </Typography>
                  <Grid item className={classes.blurb}>
                    <Typography variant="subtitle1">
                      Bfit is a lifestyle Open App that promotes healthy
                      lifestyles and rewards users for being active. It allows
                      users to extract their data from health trackers into a
                      shared ecosystem of offers by health-focused companies.
                      Here's how to get started:
                      <ol>
                        <li>
                          For iPhone users, download
                          <a href="https://apps.apple.com/us/app/google-fit-activity-tracker/id1433864494">
                            Google Fit
                          </a>{" "}
                          from the App Store (Android users can skip this step)
                        </li>
                        <li>
                          Enable Google Fit to track your "steps" in the
                          settings
                        </li>
                        <li>Earn rewards with every step!</li>
                      </ol>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  {smallScreen && (
                    <RoleSelection onRoleClick={this.onRoleClick} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.footer}></Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          item
          xs={12}
          md={6}
          className={classes.runnerImage}
        >
          <RoleSelection onRoleClick={this.onRoleClick} />
        </Grid>
      </Grid>
    );
  }
}
export default compose(
  withStyles(styles, { name: "Login", withTheme: true }),
  withWidth()
)(Login);
