import React from "react";
import { withStyles, Grid, Typography, Fab } from "@material-ui/core";
import CommonDialog from "./components/CommonDialog";
const styles = theme => ({
  roleDialog: {
    width: "100%",
    height: "100%",
    background: "url('/fancy_runner_home.png')",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    "& button": theme.buttons.secondary
  },
  roleDialogTint: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#022937",
    filter: "opacity(92%)"
  },
  roleDialogContent: {
    height: "100%",
    "& h3": {
      maxWidth: "350px",
      marginBottom: "50px",
      color: "white",
      textAlign: "center"
    }
  },
  roleButton: {
    minWidth: "250px!important",
    marginBottom: "15px",
    textTransform: "uppercase!important"
  },
  roleWrapper: {
    backgroundColor: "#F1F8F9",
    maxWidth: "360px",
    margin: "5px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "none",
      minWidth: "360px"
    }
  },
  roleContainer: {
    backgroundColor: "#F1F8F9",
    padding: "20px",
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
    }
  }
});
class RoleCell extends React.Component {
  render() {
    const { classes, onRoleClick, title, description, buttonText } = this.props;
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
        <Fab
          className={classes.roleButton}
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={onRoleClick}
        >
          {buttonText}
        </Fab>
      </Grid>
    );
  }
}
class RoleSelection extends React.Component {
  state = {};
  async componentDidMount() {}

  render() {
    const { classes, open, handleRoleDialogClose, onRoleClick } = this.props;

    return (
      <CommonDialog
        fullScreen={true}
        open={open}
        onClose={handleRoleDialogClose}
      >
        <div className={classes.roleDialog}>
          <div className={classes.roleDialogTint}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.roleDialogContent}
            >
              <Typography variant="h3">
                Which role are you singning up for?
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item sm={6} className={classes.roleWrapper}>
                  <RoleCell
                    classes={classes}
                    onRoleClick={() => onRoleClick(0)}
                    title="BFITTER"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    buttonText="I want to be a bfitter"
                  />
                </Grid>

                <Grid item sm={6} className={classes.roleWrapper}>
                  <RoleCell
                    classes={classes}
                    onRoleClick={() => onRoleClick(1)}
                    title="VENDOR"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    buttonText="I want to be a vendor"
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </CommonDialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RoleSelection);
