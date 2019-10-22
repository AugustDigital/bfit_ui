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
const styles = theme => ({
  root: {
    margin: "0 auto 0 auto",
    padding: "35px 0 10vh 0",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "50px 0 80px 0"
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
    marginTop: "20px"
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
const listItems = [
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  },
  {
    title: "Meal-Kit for a month",
    img: "/fancy_runner_home.png",
    points: "5000",
    icon: "/fancy_runner_home.png"
  }
];
class DashboardUser extends React.Component {
  state = { pointsConverted: false, missingUserRole: true, value: 0 };
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
    const { classes, width } = this.props;
    const { value } = this.state;
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
            <div
              className={classes.page}
              hidden={value !== 0}
              value={value}
              index={0}
            >
              <GridList cellHeight={110} cols={smallScreen ? 1 : 4}>
                {listItems.map((item, index) => (
                  <RewardCell
                    onClick={() => {
                      this.handleOnClick(index); //todo update
                    }}
                    key={index}
                    tile={item}
                    className={classes.rewardCell}
                  ></RewardCell>
                ))}
              </GridList>
            </div>
            <div
              className={classes.page}
              hidden={value !== 1}
              value={value}
              index={1}
            >
              cells expired
            </div>
          </Fragment>
        </Grid>
      </Fragment>
    );
  }
}

export default withRouter(
  compose(
    withStyles(styles, { name: "DashboardUser", withTheme: true }),
    withWidth()
  )(DashboardUser)
);
