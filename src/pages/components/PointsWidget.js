import React from "react";
import { withStyles, Grid, Typography, Fab } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: "#032F41",
    paddingBottom: "3.2vh",
    "& button": theme.buttons.primary
  },
  dataItem: {
    width: "50%",
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    padding: "3.2vh 0 3.2vh 0",
    "& h5": {
      fontSize: "1.9em"
    },
    "& h6": {
      fontSize: "0.6em",
      letterSpacing: "2px"
    }
  },
  wideButton: {
    minWidth: "280px!important"
  },
  rightBorder: {
    borderRight: "0.5px solid rgba(255,255,255, 0.1)"
  }
});
class PointsWidget extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const {
      classes,
      className,
      onPointsClick,
      buttonLabel,
      contentItems
    } = this.props;
    const textContent = contentItems.map((item, index) => {
      let composedClass = classes.dataItem;
      if (index !== contentItems.length - 1) {
        composedClass += " " + classes.rightBorder;
      }
      return (
        <Grid item className={composedClass}>
          <Typography variant="h5">{item.number}</Typography>
          <Typography variant="h6">{item.text}</Typography>
        </Grid>
      );
    });
    return (
      <Grid
        className={className + " " + classes.root}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item style={{ width: "100%" }}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {textContent}
          </Grid>
        </Grid>
        <Fab
          className={classes.wideButton}
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={onPointsClick}
        >
          {buttonLabel}
        </Fab>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PointsWidget);
