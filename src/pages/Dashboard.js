import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import compose from "recompose/compose";
import withWidth from "@material-ui/core/withWidth";
import DashboardVendor from "./DashboardVendor";
import DashboardUser from "./DashboardUser";
const styles = theme => ({
  root: {}
});
class Dashboard extends React.Component {
  async componentDidMount() {}
  render() {
    const { admin } = this.props;

    return (
      <Fragment>{admin ? <DashboardVendor /> : <DashboardUser />}</Fragment>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Dashboard", withTheme: true }),
  withWidth()
)(Dashboard);
