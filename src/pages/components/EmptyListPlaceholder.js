import React from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import NoItemsIcon from "../../res/no_items_icon.svg";
const styles = theme => ({
  root: {
    color: "#032F41",
    padding: "50px 100px 0 100px",
    textAlign: "center",
    "& h4": {
      fontSize: "1.4em",
      marginTop: "15px",
      fontWeight: "500",
      textTransform: "uppercase"
    },
    "& h5": {
      fontSize: "1.2em",
      marginTop: "10px"
    }
  }
});
class EmptyListPlaceholder extends React.Component {
  state = {};
  async componentDidMount() {}

  render() {
    const { classes, title, details } = this.props;
    return (
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <img alt="place holder" src={NoItemsIcon} />
        <Typography variant="h4">
          {title ? title : "No redemptions made"}
        </Typography>
        <Typography variant="h5">
          {details
            ? details
            : "Once a redemption has been made it will appear here"}
        </Typography>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EmptyListPlaceholder);
