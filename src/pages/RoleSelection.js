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
    "& button": theme.buttons.primary
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
    marginBottom: "15px"
  }
});
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
              <Fab
                className={classes.roleButton}
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                onClick={() => {
                  onRoleClick(0);
                }}
              >
                BFit User
              </Fab>
              <Fab
                className={classes.roleButton}
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                onClick={() => {
                  onRoleClick(1);
                }}
              >
                Vendor
              </Fab>
            </Grid>
          </div>
        </div>
      </CommonDialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RoleSelection);
