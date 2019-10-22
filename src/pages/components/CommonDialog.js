import React from "react";
import { withStyles, Dialog } from "@material-ui/core";
const styles = theme => ({
  root: {}
});
class CommonDialog extends React.Component {
  state = {};
  async componentDidMount() {}

  render() {
    const { open, onClose, children, fullScreen } = this.props;

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
        {children}
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CommonDialog);
