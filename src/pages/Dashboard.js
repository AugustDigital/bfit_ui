import React from "react";
import { withStyles } from "@material-ui/core";
import compose from "recompose/compose";
import withWidth from "@material-ui/core/withWidth";
import DashboardVendor from "./DashboardVendor";
import DashboardUser from "./DashboardUser";

const styles = theme => ({
  root: {}
});
class Dashboard extends React.Component {
  state = { user: null };
  async componentDidMount() {}
  render() {
    const { user } = this.props;
    let content = null;
    if (user) {
      if (user.roleType === 1) {
        content = <DashboardVendor {...this.props} />;
      } else {
        content = <DashboardUser {...this.props} />;
      }
    }
    return content;
  }
}

export default compose(
  withStyles(styles, { name: "Dashboard", withTheme: true }),
  withWidth()
)(Dashboard);
