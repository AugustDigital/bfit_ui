import React, { Fragment } from "react";
import {
  withStyles,
  Grid,
  AppBar,
  Tabs,
  Tab,
  GridList
} from "@material-ui/core";
import NavBar from "./components/NavBar";
import RewardCell from "./components/RewardCell";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import compose from "recompose/compose";
import PointsWidget from "./components/PointsWidget";
import { withRouter } from "react-router-dom";
import moment from "moment";
const styles = theme => ({
  root: {
    margin: "0 auto 0 auto",
    padding: "35px 0 10vh 0",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "50px 0 80px 0"
    }
  },
  gridListContainer: {},
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
    paddingLeft: "10vw",
    paddingRight: "10vw",
    justifyContent: "space-around",
    background: "linear-gradient(to top, #F1F8F9 85%, transparent)",
    width: "100%",
    "& ul": {
      width: "100%",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      background: "#F1F8F9"
    }
  },
  pointsWidget: {
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    }
  },
  indicator: {
    backgroundColor: "#032F41"
  },
  rewardCell: {
    width: "23%",
    margin: "1%",
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    }
  }
});
// const listItems = [
//   {
//     title: "Meal-Kit for a month",
//     img: "/fancy_runner_home.png",
//     points: "5000",
//     icon: "/fancy_runner_home.png",
//     endTime: 1573741250
//   },
//   {
//     title: "Meal-Kit for a month",
//     img: "/fancy_runner_home.png",
//     points: "5000",
//     icon: "/fancy_runner_home.png",
//     endTime: 1573741250
//   },
//   {
//     title: "Meal-Kit for a month",
//     img: "/fancy_runner_home.png",
//     points: "5000",
//     icon: "/fancy_runner_home.png",
//     endTime: 1573741250
//   },
//   {
//     title: "Meal-Kit for a month",
//     img: "/fancy_runner_home.png",
//     points: "5000",
//     icon: "/fancy_runner_home.png",
//     endTime: 1573741250
//   },
//   {
//     title: "Meal-Kit for a month",
//     img: "/fancy_runner_home.png",
//     points: "5000",
//     icon: "/fancy_runner_home.png",
//     endTime: 1573741250
//   }
// ];
// const expiredListItems = [
//   {
//     title: "Meal-Kit for a month",
//     img: "/fancy_runner_home.png",
//     points: "5000",
//     icon: "/fancy_runner_home.png",
//     endTime: 1571840450
//   },
//   {
//     title: "Meal-Kit for a month",
//     img: "/fancy_runner_home.png",
//     points: "5000",
//     icon: "/fancy_runner_home.png",
//     endTime: 1571840450
//   }
// ];
class DashboardVendor extends React.Component {
  state = {
    pointsConverted: false,
    missingUserRole: true,
    value: 0,
    expiredListItems: [],
    listItems: []
  };
  async componentDidMount() {
    const resp = await this.props.api.get(
      `/getRewards?vendorId=${this.props.user["_id"]}`
    );
    if (resp.data.error) {
      alert("could not load rewards");
    } else {
      console.log(resp.data);
      let expiredListItems = [];
      let listItems = [];
      resp.data.data.forEach(item => {
        let itemModel = {
          id: item["_id"],
          title: item.title,
          img: item.image
            ? this.props.API_URL + "/" + item.image
            : "missingImage.svg",
          points: item.cost,
          icon: item.creatorLogo ? item.creatorLogo : "missingImage.svg",
          endTime: item.expirationDate
        };
        if (item.expirationDate < moment().unix()) {
          expiredListItems.push(itemModel);
        } else {
          listItems.push(itemModel);
        }
      });
      console.log({ listItems, expiredListItems });
      this.setState({ listItems, expiredListItems });
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  handleOnClick = id => {
    this.props.history.push(`/reward?id=${id}&admin=true`);
  };
  onPointsClick = () => {
    this.props.history.push(`/createUpdateReward?id=${this.props.id}`);
  };
  render() {
    const { classes, width } = this.props;
    const { value, expiredListItems, listItems } = this.state;
    const smallScreen = !isWidthUp("md", width);
    const points = 99999;
    const steps = 99999;
    return (
      <Fragment>
        <NavBar />
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <PointsWidget
            onPointsClick={this.onPointsClick}
            className={classes.pointsWidget}
            points={points}
            steps={steps}
            buttonLabel="Create Reward Program"
            contentItems={[{ number: 99999, text: "Total Redeemed" }]}
          />

          <Fragment>
            <AppBar className={classes.tabBar} position="static">
              <Tabs
                centered
                value={value}
                onChange={this.handleChange}
                aria-label="simple tabs example"
                classes={{
                  indicator: classes.indicator
                }}
              >
                <Tab
                  className={classes.tab}
                  label="Active"
                  {...this.a11yProps(0)}
                />
                <Tab
                  className={classes.tab}
                  label="Expired"
                  {...this.a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <Grid
              item
              className={classes.page}
              hidden={value !== 0}
              value={value}
              index={0}
            >
              <GridList cellHeight={110} cols={smallScreen ? 1 : 4}>
                {listItems.map((item, index) => (
                  <RewardCell
                    onClick={() => {
                      this.handleOnClick(item.id); //todo update
                    }}
                    key={index}
                    tile={item}
                    className={classes.rewardCell}
                  ></RewardCell>
                ))}
              </GridList>
            </Grid>
            <Grid
              item
              className={classes.page}
              hidden={value !== 1}
              value={value}
              index={1}
            >
              <GridList cellHeight={110} cols={smallScreen ? 1 : 4}>
                {expiredListItems.map((item, index) => {
                  return (
                    <RewardCell
                      onClick={() => {
                        this.handleOnClick(item.id); //todo update
                      }}
                      key={index}
                      tile={item}
                      className={classes.rewardCell}
                    ></RewardCell>
                  );
                })}
              </GridList>
            </Grid>
          </Fragment>
        </Grid>
      </Fragment>
    );
  }
}

export default withRouter(
  compose(
    withStyles(styles, { name: "DashboardVendor", withTheme: true }),
    withWidth()
  )(DashboardVendor)
);
