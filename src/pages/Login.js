import React from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import compose from "recompose/compose";
import RoleSelection from "./RoleSelection";
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
    height: "100%"
  },

  contentContainer: {
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundImage:
        "linear-gradient(rgba(250,250,250,0.4), rgba(250,250,250,0.1)), url('/fancy_runner.png');"
    },
    height: "100%",
    "& h1": {
      color: "#032F41",
      fontWeight: "600",
      fontSize: "5em",
      marginLeft: contentMarginLeft
    },
    "& h2": {
      [theme.breakpoints.down("sm")]: {
        marginRight: contentMarginLeft,
        width: "auto"
      },
      color: "#032F41",
      fontWeight: "400",
      fontSize: "2.4em",
      marginTop: "3vh",
      letterSpacing: "2.5px",
      lineHeight: "1.5em",
      marginLeft: contentMarginLeft,
      marginRight: "50%",
      width: "60%"
    },
    "& h6": {
      color: "#032F41",
      marginLeft: contentMarginLeft
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
    console.log(smallScreen);
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
                  <Typography variant="h1">BFIT</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h2">
                    Earn rewards while you stay fit.
                  </Typography>

                  <Typography variant="subtitle1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </Typography>
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
