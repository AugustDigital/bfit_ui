import React from "react";
import { withStyles, Fab } from "@material-ui/core";
import compose from "recompose/compose";
import withWidth from "@material-ui/core/withWidth";
const styles = theme => ({
  footer: {
    "& button": theme.buttons.primary,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#032F41",
    padding: "15px",
    textAlign: "center"
  },
  wideButton: {
    minWidth: "30%!important",
    textTransform: "uppercase!important",
    [theme.breakpoints.down("sm")]: {
      minWidth: "90%!important",
      paddingLeft: "5vw",
      paddingRight: "5vw"
    }
  }
});
class Footer extends React.Component {
  state = { value: 0 };
  async componentDidMount() {}
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  render() {
    const { classes, text, onClick } = this.props;

    return (
      <div className={classes.footer}>
        <Fab
          className={classes.wideButton}
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={onClick}
        >
          {text}
        </Fab>
      </div>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Footer", withTheme: true }),
  withWidth()
)(Footer);
