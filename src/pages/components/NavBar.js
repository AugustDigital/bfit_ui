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
  Input,
  Fab
} from "@material-ui/core";
import ProfileIcon from "../../res/profile_icon.svg";
import CloseIcon from "../../res/close_icon.svg";
import BackIcon from "../../res/back_icon.svg";
import EditIcon from "../../res/edit_icon.svg";
import PointList from "./PointList";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
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
    "& button": theme.buttons.secondary,
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      maxHeight: "100vh",
      height: "100vh"
    }
  },
  logoutButton: {
    width: "100%!important",
    fontSize: "1.0em!important",
    marginBottom: "15px",
    textTransform: "uppercase!important"
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
  onLogoutClick = () => {
    window.location.href = API_URL + "/logout";
  };
  onProfileClick = () => {
    this.props.history.push("/history");
  };
  render() {
    const {
      classes,
      onEditClick,
      redeemedItems,
      pointsItems,
      admin,
      noMenu
    } = this.props;
    const { pointsType } = this.state;
    let itemModels = [];
    if (pointsType === 1 && redeemedItems) {
      //earned
      itemModels = redeemedItems
        .filter(item => item)
        .map(item => {
          item.pointsType = 1;
          item.points = item.cost;
          item.timestamp = item.timeStamp;
          item.image = item.image
            ? API_URL + "/" + item.image
            : "missingImage.svg";
          return item;
        });
    } else if (pointsType === 0 && pointsItems) {
      //redeemed
      itemModels = pointsItems
        .filter(item => item)
        .map(item => {
          item.pointsType = 0;
          item.timestamp = item.day;
          return item;
        });
    }

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
          {!noMenu ? (
            onEditClick ? (
              <IconButton
                aria-label="delete"
                className={classes.dropdownButton}
                onClick={onEditClick}
              >
                <img
                  alt="edit icon"
                  width="25px"
                  height="25px"
                  src={EditIcon}
                />
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
            )
          ) : (
            <div className={classes.dropdownButton}></div>
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
            <Fab
              className={classes.logoutButton}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={this.onLogoutClick}
            >
              Logout
            </Fab>
            {!admin ? (
              <Fragment>
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
                  items={itemModels}
                  forceVerticalLayout={true}
                />
              </Fragment>
            ) : (
              <Fab
                className={classes.logoutButton}
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                onClick={this.onProfileClick}
              >
                Profile
              </Fab>
            )}
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
