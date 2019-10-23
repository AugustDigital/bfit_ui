import React, { Fragment } from "react";
import {
  withStyles,
  Typography,
  IconButton,
  Popper,
  Paper,
  Grid,
  MenuItem,
  Select,
  Input
} from "@material-ui/core";
import ProfileIcon from "../../res/profile_icon.svg";
import CloseIcon from "../../res/close_icon.svg";
import BackIcon from "../../res/back_icon.svg";
import EditIcon from "../../res/edit_icon.svg";
import PointList from "./PointList";
const styles = theme => ({
  root: {
    background: "white",
    position: "fixed",
    width: "100%",
    height: "50px",
    zIndex: 2,
    top: 0,
    padding: "0 7vw 0 7vw"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    zIndex: 1
  },
  header: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: "1.9em",
    marginTop: "7px"
  },
  dropdownButton: {
    top: 0
  },
  backButton: {
    top: 0
  },
  backButtonPlaceHolder: {
    width: "25px",
    height: "25px",
    margin: "12px"
  },
  popper: {
    marginTop: "7px",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      transform: "none!important",
      marginTop: "50px"
    },
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.common.white} transparent`
      },
      [theme.breakpoints.down("sm")]: {
        display: "none!important",
        height: "0!important"
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.common.white} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.common.white} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${theme.palette.common.white}`
      }
    }
  },
  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  dropDownContent: {
    background: "#F1F8F9",
    width: "250px",
    maxHeight: "60vh",
    padding: "3vh",
    overflowY: "scroll",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      maxHeight: "100vh",
      height: "100vh"
    }
  },
  nestedDropDown: {},
  nestedDropSelect: {
    borderColor: "#032F41",
    borderStyle: "solid",
    borderRadius: "50px",
    borderWidth: "1px",
    background: "white",
    textAlign: "center",
    color: "#032F41",
    width: "100%",
    paddingTop: "5px",
    paddingBottom: "5px",
    "&:before": {
      borderBottom: "none!important"
    },
    "&:after": {
      borderBottom: "none!important"
    }
  },
  pointList: {
    paddingTop: "25px"
  },
  nestedDropSelectInput: {
    backgroundColor: "transparent!important"
  }
});
class NavBar extends React.Component {
  state = {
    open: false,
    anchorRef: null,
    values: { age: "", name: "hai" },
    pointsType: 0
  };
  async componentDidMount() {}
  onClick = e => {
    this.setState({ anchorRef: this.state.anchorRef ? null : e.currentTarget });
  };
  handleOnBackClick = () => {
    console.log(this.props);
    this.props.history.push(this.props.back);
  };
  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };
  handleLableRef = node => {
    this.setState({
      inputLabelRef: node
    });
  };
  handleChange = event => {
    this.setState({
      pointsType: event.target.value
    });
  };
  render() {
    const { classes, onEditClick } = this.props;
    const { pointsType } = this.state;
    const testItems = [
      { points: 5000, pointsType, timestamp: 1571232825 },
      { points: 5000, pointsType, timestamp: 1571232825 },
      { points: 5000, pointsType, timestamp: 1571232825 },
      { points: 5000, pointsType, timestamp: 1571232825 },
      { points: 5000, pointsType, timestamp: 1571232825 },
      { points: 5000, pointsType, timestamp: 1571232825 }
    ];
    return (
      <Fragment>
        <Grid
          className={classes.root}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          {this.props.back ? (
            <IconButton
              aria-label="back"
              className={classes.backButton}
              ref={this.buttonRef}
              onClick={this.handleOnBackClick}
            >
              <img alt="back icon" width="25px" height="25px" src={BackIcon} />
            </IconButton>
          ) : (
            <div className={classes.backButtonPlaceHolder} />
          )}

          <Typography className={classes.header} variant="h5">
            BFIT
          </Typography>
          {onEditClick ? (
            <IconButton
              aria-label="delete"
              className={classes.dropdownButton}
              onClick={onEditClick}
            >
              <img alt="edit icon" width="25px" height="25px" src={EditIcon} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              className={classes.dropdownButton}
              ref={this.buttonRef}
              onClick={this.onClick}
            >
              <img
                alt="dropdown icon"
                width="25px"
                height="25px"
                src={this.state.anchorRef ? CloseIcon : ProfileIcon}
              />
            </IconButton>
          )}
        </Grid>
        <Popper
          placement="bottom-end"
          open={this.state.anchorRef !== null}
          anchorEl={this.state.anchorRef}
          className={classes.popper}
          disablePortal={false}
          modifiers={{
            flip: {
              enabled: false
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "undefined"
            },
            arrow: {
              enabled: true,
              element: this.state.arrowRef
            }
          }}
        >
          <span className={classes.arrow} ref={this.handleArrowRef} />
          <Paper className={classes.dropDownContent}>
            <Select
              className={classes.nestedDropSelect}
              value={pointsType}
              onChange={this.handleChange}
              input={
                <Input
                  classes={{
                    input: classes.nestedDropSelectInput,
                    underline: styles.underline
                  }}
                />
              }
            >
              <MenuItem value={0}>Points Earned</MenuItem>
              <MenuItem value={1}>Points Redeemed</MenuItem>
            </Select>
            <PointList
              className={classes.pointList}
              items={testItems}
              forceVerticalLayout={true}
            />
          </Paper>
        </Popper>
        {this.state.anchorRef !== null ? (
          <div onClick={this.onClick} className={classes.overlay} />
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavBar);
