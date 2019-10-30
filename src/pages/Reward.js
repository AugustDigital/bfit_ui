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
import RoundGreenCheckmark from "../res/round_green_checkmark.svg";
import Footer from "./components/Footer";

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
  }
});
class Reward extends React.Component {
  state = { value: 0, rewardRedeemed: false };
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
          icon: item.creatorLogo ? item.creatorLogo : "missingImage.svg",
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
    const resp = await this.props.api.post("/redeemReward/" + reward.id);
    if (resp.data.error) {
      alert(resp.data.error.message);
    } else {
      console.log(resp);
      this.props.user.redemptions = resp.data.data.redemptions;
      this.setState({ rewardRedeemed: true }); //todo change to reward object state
    }
  };
  handlePointsDialogClose = () => {
    this.setState({ rewardRedeemed: false });
  };
  render() {
    const { classes, id, history, width, admin, user } = this.props;
    const { value, reward, rewardRedeemed } = this.state;
    const smallScreen = isWidthDown("sm", width);
    let hasRedeemed = false;
    const testItems = [];
    user.redemptions.forEach(red => {
      if (red.rewardId === id) {
        hasRedeemed = true;
        testItems.push({ points: red.cost, timestamp: red.timeStamp });
      }
    });

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
            />
            <Grid
              className={classes.root}
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <RewardCell className={classes.card} largeImage tile={reward} />
              {hasRedeemed ? (
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
                    <PointList
                      items={testItems}
                      forceVerticalLayout={smallScreen}
                    />
                  </div>
                  <div
                    className={classes.page}
                    hidden={value !== 1}
                    value={value}
                    index={1}
                  >
                    {detailsSection}
                  </div>
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
                      <Typography variant="h4">Reward Program</Typography>
                      <Typography variant="h5">Created Successfully</Typography>
                    </Grid>
                  </CommonDialog>
                </Fragment>
              ) : (
                detailsSection
              )}
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
