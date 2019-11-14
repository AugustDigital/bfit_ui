import React from "react";
import { withStyles, Grid, Typography, Fab } from "@material-ui/core";
import GoogleIcon from "../res/google_icon.svg";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const styles = theme => ({
  roleDialogContent: {
    "& h3": {
      maxWidth: "350px",
      marginBottom: "50px",
      marginTop: "10%",
      color: "white",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px"
      }
    }
  },
  roleButton: {
    minWidth: "200px!important",
    marginBottom: "5px",
    textTransform: "uppercase!important"
  },
  roleWrapper: {
    maxWidth: "360px",
    margin: "5px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "none",
      minWidth: "360px"
    }
  },
  roleContainer: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: "5px",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 2px 5px 3px rgba(0,0,0,0.1)"
    },
    "& h5": {
      fontSize: "1.2em",
      fontWeight: "600",
      marginBottom: "10px"
    },
    "& h6": {
      fontSize: "1.2em",
      fontWeight: "400",
      marginBottom: "15px",
      textAlign: "center"
    },
    "& a": {
      textDecoration: "none",
      paddingLeft: "10px",
      paddingRight: "20px"
    },
    "& button": {
      backgroundColor: "white",
      color: "black",
      boxShadow: "0px 1px 1px -1px rgba(0,0,0,0.4)",
      textTransform: "none",
      padding: "0",
      "&:hover": {
        backgroundColor: "lightgray"
      },
      "& img": {
        width: "25px",
        height: "25px",
        marginRight: "10px"
      }
    }
  }
});
class RoleCell extends React.Component {
  render() {
    const { classes, title, description, buttonText, roleType } = this.props;
    return (
      <Grid
        className={classes.roleContainer}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h6">{description}</Typography>
        <a href={`${API_URL}/auth/google?userType=${roleType}`}>
          <Fab
            className={classes.roleButton}
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
          >
            <img alt="google logo" src={GoogleIcon} />
            {buttonText}
          </Fab>
        </a>
      </Grid>
    );
  }
}
class RoleSelection extends React.Component {
  state = {};
  async componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.roleDialogContent}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item sm={6} className={classes.roleWrapper}>
            <RoleCell
              classes={classes}
              roleType={0}
              title="BFitter"
              description="BFitters are at the core of BFit. They earn SWEAT points with every step and can claim rewards from a variety of vendors focused on health and lifestyle."
              buttonText="I want to be a bfitter"
            />
          </Grid>

          <Grid item sm={6} className={classes.roleWrapper}>
            <RoleCell
              classes={classes}
              roleType={1}
              title="Vendor"
              description="Vendors are businesses that create rewards for BFitters. They join BFit to increase user engagement and have access to a active and healthy user base. If you want to be a vendor on BFit, login with your Google account and submit an application!"
              buttonText="I want to be a vendor"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RoleSelection);
