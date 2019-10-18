import React from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import moment from "moment";
const styles = theme => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  redemptionCircle: {
    minWidth: "140px",
    minHeight: "140px",
    width: "auto",
    height: "auto",
    borderRadius: "80px",
    background: "white"
  },
  redemptionCircleSmall: {
    width: "120px",
    height: "120px",
    borderRadius: "80px",
    background: "white"
  },
  line: {
    width: "3px",
    height: "15px",
    background: "white"
  },
  points: {
    fontSize: "0.8em",
    color: "#032F41"
  },
  date: {
    fontSize: "0.8em",
    color: "#032F41"
  }
});
class PointList extends React.Component {
  state = {};
  async componentDidMount() {}
  composeItem(classes, item, index) {
    return (
      <Grid
        key={index}
        className={
          item.pointsType === 1
            ? classes.redemptionCircle
            : classes.redemptionCircleSmall
        }
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {item.pointsType === 1 ? (
          <div>
            <img
              alt="reward vendor logo"
              width="30px"
              height="30px"
              src="/fancy_runner_home.png"
            />
          </div>
        ) : null}
        <Typography>{item.points} pts</Typography>
        <Typography className={classes.date}>
          {moment.unix(item.timestamp).format("MMM d, YYYY")}
        </Typography>
      </Grid>
    );
  }
  insertIntoArray = (arr, valueFunc) => {
    return arr.reduce((result, element, index, array) => {
      result.push(element);

      if (index < array.length - 1) {
        result.push(valueFunc(index));
      }

      return result;
    }, []);
  };
  render() {
    const { classes, items, forceVerticalLayout, className } = this.props;
    let itemViews = items.map((item, index) =>
      this.composeItem(classes, item, index)
    );
    if (forceVerticalLayout) {
      itemViews = this.insertIntoArray(itemViews, key => (
        <div key={items.length + key} className={classes.line}></div>
      ));
    }
    return (
      <Grid
        className={classes.root + " " + className}
        container
        direction={forceVerticalLayout ? "column" : "row"}
        justify="center"
        alignItems="center"
      >
        {itemViews}
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PointList);
