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
    width: "150px",
    height: "150px",
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
        className={classes.redemptionCircle}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
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
    const { classes, items, forceVerticalLayout } = this.props;
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
        className={classes.root}
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
