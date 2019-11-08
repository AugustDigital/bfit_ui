import React, { Fragment } from "react";
import {
  withStyles,
  Grid,
  Typography,
  AppBar,
  Tab,
  Tabs,
  CircularProgress
} from "@material-ui/core";
import compose from "recompose/compose";
import { Redirect } from "react-router-dom";
import RewardCell from "./components/RewardCell";
import NavBar from "./components/NavBar";
import PointList from "./components/PointList";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import CommonDialog from "./components/CommonDialog";
import EmptyListPlaceholder from "./components/EmptyListPlaceholder";
import RoundGreenCheckmark from "../res/round_green_checkmark.svg";
import Footer from "./components/Footer";

import { HighlightOffRounded } from "@material-ui/icons";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const styles = theme => ({
  root: {
    margin: "0 auto 0 auto",
    padding: "10vh 0 10vh 0",
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "50px 0 80px 0"
    }
  },
  card: {
    height: "300px"
  },
  rewardsTitle: {
    letterSpacing: "2.5px",
    color: "#032F41",
    fontWeight: "400",
    fontSize: "1.4em",
    margin: "30px 0 10px 0",
    width: "100%",
    textAlign: "left!important",
    [theme.breakpoints.down("sm")]: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "5vw",
        paddingRight: "5vw"
      }
    }
  },
  rewardsDetails: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "5vw",
      paddingRight: "5vw"
    }
  },
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
    [theme.breakpoints.down("sm")]: {
      minWidth: "90%!important",
      paddingLeft: "5vw",
      paddingRight: "5vw"
    }
  },
  tabBar: {
    background: "white",
    color: "#032F41",
    boxShadow: "none",
    borderTop: "1px solid rgba(243,243,243,100)",
    zIndex: 0
  },
  tab: {
    width: "50%"
  },
  page: {
    marginTop: "20px",
    width: "100%"
  },
  indicator: {
    backgroundColor: "#032F41"
  },
  spinner: {
    top: "50%",
    left: "50%",
    position: "absolute",
    margin: "-20px 0 0 -20px "
  },
  successDialog: {
    color: "#032F41",
    maxWidth: "300px",
    padding: "30px",
    textAlign: "center",
    "& h4": {
      fontSize: "1.4em",
      marginTop: "15px",
      fontWeight: "500"
    },
    "& h5": {
      fontSize: "1.2em",
      marginTop: "10px"
    }
  },
  errorIcon: {
    fontSize: 84,
    color: "red"
  }
});
class Reward extends React.Component {
  state = { value: 0, rewardRedeemed: false, errorMessage: false };
  async componentDidMount() {
    const resp = await this.props.api.get(`/getReward/${this.props.id}`);
    if (resp.data.error) {
      alert("could not load rewards");
    } else {
      let item = resp.data.data;
      console.log(item);
      this.setState({
        reward: {
          id: item["_id"],
          title: item.title,
          img: item.image ? API_URL + "/" + item.image : "missingImage.svg",
          points: item.cost,
          icon: item.creatorLogo
            ? this.props.API_URL + "/" + item.creatorLogo
            : "missingImage.svg",
          endTime: item.expirationDate,
          description: item.description
        }
      });
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  onEditClicked = () => {
    this.props.history.push(`/createUpdateReward?id=${this.props.id}`);
  };
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  onRedeemClick = async () => {
    const { reward } = this.state;
    const { user } = this.props;
    let pointsTotalEarned = 0;
    let pointsTotalSpent = 0;
    user.steps.forEach(stepData => {
      pointsTotalEarned += stepData.points; // subtract redeemed points?
    });
    user.redemptions.forEach(redData => {
      if (redData) {
        pointsTotalSpent += redData.cost;
      }
    });
    let cost = reward.points;
    if (pointsTotalEarned - pointsTotalSpent - cost < 0) {
      this.setState({ errorMessage: "Not enough points to redeem" });
      return;
    }
    const resp = await this.props.api.post("/redeemReward/" + reward.id);
    if (resp.data.error) {
      this.setState({ errorMessage: resp.data.error });
    } else {
      console.log(resp);
      this.props.user.redemptions = resp.data.data.redemptions;
      this.setState({ rewardRedeemed: true });
    }
  };
  handlePointsDialogClose = () => {
    this.setState({ rewardRedeemed: false });
  };
  handleErrorDialogClose = () => {
    this.setState({ errorMessage: false });
  };
  render() {
    const { classes, id, history, width, admin, user } = this.props;
    const { value, reward, rewardRedeemed, errorMessage } = this.state;
    const smallScreen = isWidthDown("sm", width);
    console.log(smallScreen ? "small screen" : "wide screen");
    let hasRedeemed = false;
    const redItems = [];
    let pointsTotalEarned = 0;
    let pointsTotalSpent = 0;
    user.steps.forEach(stepData => {
      pointsTotalEarned += stepData.points; // subtract redeemed points?
    });
    user.redemptions.forEach(redData => {
      if (redData) {
        pointsTotalSpent += redData.cost;
      }
    });
    let balance = pointsTotalEarned - pointsTotalSpent;
    if (user.roleType === 1) {
      user.vendorRedemptions.forEach(red => {
        if (red && red.rewardId === id) {
          //hasRedeemed = true;
          redItems.push({
            id: red.rewardId,
            points: red.cost,
            timestamp: red.timeStamp,
            userName: red.userName
          });
        }
      });
    } else {
      user.redemptions.forEach(red => {
        console.log(red.rewardId);
        console.log(id);
        if (red && red.rewardId === id) {
          hasRedeemed = true;
          redItems.push({
            id: red.rewardId,
            points: red.cost,
            timestamp: red.timeStamp
          });
        }
      });
    }

    if (id) {
      if (reward) {
        const detailsSection = (
          <Fragment>
            <Typography className={classes.rewardsTitle} variant="h5">
              Details
            </Typography>
            <Typography className={classes.rewardsDetails}>
              {reward.description}
            </Typography>
          </Fragment>
        );
        return (
          <Fragment>
            <NavBar
              history={history}
              back="/"
              onEditClick={admin ? this.onEditClicked : null}
              redeemedItems={user.redemptions}
              pointsItems={user.steps}
            />
            <Grid
              className={classes.root}
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <RewardCell className={classes.card} largeImage tile={reward} />
              {hasRedeemed || admin ? (
                <Fragment>
                  <AppBar className={classes.tabBar} position="static">
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      aria-label="simple tabs example"
                      classes={{
                        indicator: classes.indicator
                      }}
                    >
                      <Tab
                        className={classes.tab}
                        label="Redeemed"
                        {...this.a11yProps(0)}
                      />
                      <Tab
                        className={classes.tab}
                        label="Details"
                        {...this.a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>
                  <div
                    className={classes.page}
                    hidden={value !== 0}
                    value={value}
                    index={0}
                  >
                    {redItems.length > 0 ? (
                      <PointList items={redItems} forceVerticalLayout={true} />
                    ) : (
                      <EmptyListPlaceholder />
                    )}
                  </div>
                  <div
                    className={classes.page}
                    hidden={value !== 1}
                    value={value}
                    index={1}
                  >
                    {detailsSection}
                  </div>
                </Fragment>
              ) : (
                detailsSection
              )}
              <CommonDialog
                open={rewardRedeemed}
                onClose={this.handlePointsDialogClose}
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.successDialog}
                >
                  <img
                    alt="Checkmark"
                    width="65px"
                    height="65px"
                    src={RoundGreenCheckmark}
                  ></img>
                  <Typography variant="h4">
                    Rewards Redeemed Succesfully
                  </Typography>
                  <Typography variant="h5">
                    Your remaining points balance is:
                    <br />
                    <b>{balance}</b>
                  </Typography>
                </Grid>
              </CommonDialog>
              <CommonDialog
                open={errorMessage}
                onClose={this.handleErrorDialogClose}
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.successDialog}
                >
                  <HighlightOffRounded className={classes.errorIcon} />
                  <Typography variant="h4">Reward Program</Typography>
                  <Typography variant="h5">{errorMessage}</Typography>
                </Grid>
              </CommonDialog>
            </Grid>
            {!admin && (
              <Footer text="Redeem Reward" onClick={this.onRedeemClick} />
            )}
          </Fragment>
        );
      } else {
        return <CircularProgress className={classes.spinner} />;
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default compose(
  withStyles(styles, { name: "Reward", withTheme: true }),
  withWidth()
)(Reward);
