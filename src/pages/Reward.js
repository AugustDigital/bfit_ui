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
  }
});
class Reward extends React.Component {
  state = { value: 0 };
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
    this.props.history.push(`/createUpdateReward`);
  };
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  render() {
    const { classes, id, history, width, admin } = this.props;
    const { value, reward } = this.state;
    const smallScreen = isWidthDown("sm", width);
    const hasRedeemed = true;
    const testItems = [
      { points: 5000, timestamp: 1571232825 },
      { points: 5000, timestamp: 1571232825 },
      { points: 5000, timestamp: 1571232825 }
    ];

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
                </Fragment>
              ) : (
                detailsSection
              )}
            </Grid>
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
