import React from "react";
import { withStyles, Grid, Typography, Fab } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import GoogleIcon from "../res/google_icon.svg";
import compose from "recompose/compose";
const contentMarginLeft = "5vw";
const styles = theme => ({
  root: {
    height: "100vh"
  },
  runnerImage: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    height: "800px",
    width: "730px",
    backgroundImage: "url('/fancy_runner.png')",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
  },
  leftContainer: {
    height: "100%"
  },
  contentContainerWrapper: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw"
    }
  },
  contentContainer: {
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundImage: "url('/fancy_runner.png')",
      maxWidth: "100%"
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
    "& button": {
      backgroundColor: "white",
      color: "black",
      marginTop: "4vh",
      marginLeft: contentMarginLeft,
      boxShadow: "0px 1px 1px -1px rgba(0,0,0,0.4)",
      textTransform: "none",
      padding: "0",
      "&:hover": {
        backgroundColor: "lightgray"
      },
      "& img": {
        width: "25px",
        height: "25px"
      },
      "& a": {
        padding: "0 10px 0 10px",
        color: "black",
        textDecoration: "none",
        marginLeft: "-40px",
        marginRight: "-10px",
        paddingLeft: "50px",
        paddingRight: "20px"
      }
    }
  },
  footer: {
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    },
    backgroundColor: "#032F41",
    width: "50vw",
    maxWidth: "100%",
    color: "white",
    textAlign: "center",
    "& button": {
      backgroundColor: "transparent",
      top: "50%",
      transform: "translateY(-50%)",
      color: "white",
      margin: "auto",
      padding: "8px",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.5)"
      }
    }
  }
});
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
class Login extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes, width } = this.props;
    console.log(classes);
    const smallScreen = !isWidthUp("sm", width);
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
            <Grid item xs={11} className={classes.contentContainerWrapper}>
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
                </Grid>
                <Grid item>
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.signInButton}
                  >
                    <img alt="google logo" src={GoogleIcon} />
                    <a href={`${API_URL}/auth/google`}>Sign in with Google</a>
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} className={classes.footer}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.runnerImage}></Grid>
      </Grid>
    );
  }
}
export default compose(
  withStyles(styles, { name: "Login", withTheme: true }),
  withWidth()
)(Login);
