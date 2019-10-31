import React, { Fragment } from "react";
import {
  withStyles,
  Grid,
  Typography,
  GridList,
  GridListTile
} from "@material-ui/core";
import NavBar from "./components/NavBar";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import compose from "recompose/compose";
import PointsWidget from "./components/PointsWidget";
import RewardCell from "./components/RewardCell";
import { withRouter } from "react-router-dom";
import CommonDialog from "./components/CommonDialog";
import RoundGreenCheckmark from "../res/round_green_checkmark.svg";
import RoleSelection from "./RoleSelection";
import moment from "moment";
const styles = theme => ({
  root: {},
  pointsWidget: {
    width: "40vw",
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    }
  },
  topSectionContainer: {
    width: "100%"
  },
  gridListContainer: {
    paddingLeft: "10vw",
    paddingRight: "10vw",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    background: "linear-gradient(to top, #F1F8F9 85%, transparent)",
    width: "100%",
    paddingBottom: "100px",
    "& ul": {
      width: "100%",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      background: "#F1F8F9"
    }
  },
  rewardCell: {
    width: "23%",
    margin: "1%",
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    }
  },
  pointsLabel: {
    marginTop: "100px",
    color: "white",
    letterSpacing: "4px",
    fontWeight: "300",
    fontSize: "10em",
    textShadow: "2px 2px 78px rgba(3, 47, 65, 0.8)",
    [theme.breakpoints.down("sm")]: {
      marginTop: "120px",
      letterSpacing: "1px",
      fontWeight: "500",
      fontSize: "5em"
    }
  },
  pointsSublable: {
    color: "black",
    fontWeight: "400",
    letterSpacing: "4px",
    fontSize: "1.5em",
    margin: "-15px 0 30px 0",
    [theme.breakpoints.down("sm")]: {
      margin: "-10px 0 50px 0"
    }
  },
  rewardsTitle: {
    letterSpacing: "2.5px",
    color: "#032F41",
    fontWeight: "400",
    fontSize: "1.4em",
    margin: "30px 0 10px 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  background: {
    background: "url('/fancy_runner_home.png')",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    top: "2vh",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    "& h1": {
      fontSize: "24em",
      background: "linear-gradient(black, transparent)",
      "-webkit-background-clip": "text",
      textFillColor: "transparent",
      textAlign: "center",
      fontWeight: 400,
      opacity: 0.07,
      [theme.breakpoints.down("sm")]: {
        paddingTop: "5vh",
        fontSize: "10em"
      }
    },
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "start top",
      background: "url('/fancy_runner.png') ",
      backgroundSize: "130% auto"
    }
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
class DashboardUser extends React.Component {
  state = {
    pointsConverted: false,
    missingUserRole: true,
    expiredListItems: [],
    listItems: []
  };
  async componentDidMount() {
    const resp = await this.props.api.get(`/getRewards`);
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
      //console.log({ listItems, expiredListItems });
      this.setState({ listItems, expiredListItems });
    }
  }
  handleOnClick = id => {
    this.props.history.push(`/reward?id=${id}`);
  };
  onPointsClick = async () => {
    const resp = await this.props.api.get("/convertToPoints");
    console.log(resp);
    if (resp.data.error) {
      alert("Server Error!");
    } else {
      this.props.user.steps = resp.data.data.steps;
      this.setState({ pointsConverted: true });
    }
  };
  handlePointsDialogClose = () => {
    this.setState({ pointsConverted: false });
  };
  handleRoleDialogClose = () => {
    this.setState({ user: this.props.user });
  };
  onRoleClick = async roleType => {
    await this.props.api.post("/setRole", { roleType: roleType });
    this.props.user.roleType = roleType;
    if (roleType === 1) {
      //vendor
      this.props.history.push(`/?admin=true`);
      this.handleRoleDialogClose();
    } else {
      //user
      this.handleRoleDialogClose();
    }
  };
  render() {
    const { classes, width, user, changeRole } = this.props;
    const { pointsConverted, listItems } = this.state;
    const { steps, points } = user.steps[user.steps.length - 1];
    let pointsTotalEarned = 0;
    let pointsTotalSpent = 0;
    let stepsUnclaimed = steps - points;
    user.steps.forEach(stepData => {
      pointsTotalEarned += stepData.points; // subtract redeemed points?
    });
    user.redemptions.forEach(redData => {
      if (redData) {
        pointsTotalSpent += redData.cost;
      }
    });
    let pointsTotal = pointsTotalEarned - pointsTotalSpent;
    let showRoleSelection =
      typeof user.roleType === undefined || changeRole !== undefined;
    const smallScreen = !isWidthUp("md", width);
    return (
      <Fragment>
        <NavBar redeemedItems={user.redemptions} pointsItems={user.steps} />
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.topSectionContainer}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item sm={12}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography className={classes.pointsLabel} variant="h1">
                      {pointsTotal.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.pointsSublable} variant="h6">
                      SWEATS balance
                    </Typography>
                  </Grid>
                  <Grid item>
                    <PointsWidget
                      onPointsClick={this.onPointsClick}
                      className={classes.pointsWidget}
                      buttonLabel="Convert Steps to SWEATS"
                      contentItems={[
                        { number: stepsUnclaimed, text: "Unclaimed Steps" }
                      ]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridListContainer}>
            <GridList cellHeight={110} cols={smallScreen ? 1 : 4}>
              <GridListTile
                key="Subheader"
                cols={smallScreen ? 1 : 4}
                style={{ height: "auto" }}
              >
                <Typography className={classes.rewardsTitle} variant="h5">
                  Reward offers
                </Typography>
              </GridListTile>
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
        </Grid>
        <div className={classes.background}>
          <Typography variant="h1">{pointsTotal.toLocaleString()}</Typography>
        </div>
        <CommonDialog
          open={pointsConverted}
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
            <Typography variant="h4">Points added successfully</Typography>
            <Typography variant="h5">
              Your points have been successfully added to your balance.
            </Typography>
          </Grid>
        </CommonDialog>
        <RoleSelection
          open={showRoleSelection}
          onClose={this.handleRoleDialogClose}
          onRoleClick={this.onRoleClick}
        />
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
