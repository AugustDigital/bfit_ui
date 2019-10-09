import React, { Fragment } from "react";
import { withStyles, Grid } from "@material-ui/core";

import { BrowserRouter as Link } from "react-router-dom";
import NavBar from "./components/NavBar";
const styles = theme => ({
  root: {
    background: "white"
  }
});
class Dashboard extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavBar />
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        ></Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
