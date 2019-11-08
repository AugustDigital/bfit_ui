import React, { Fragment } from "react";
import {
  withStyles,
  TextField,
  Typography,
  InputAdornment,
  Grid
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";
import NavBar from "./components/NavBar";
import { HighlightOffRounded } from "@material-ui/icons";
import CommonDialog from "./components/CommonDialog";
import RoundGreenCheckmark from "../res/round_green_checkmark.svg";
import moment from "moment";
import Footer from "./components/Footer";
const materialTheme = createMuiTheme({
  overrides: {
    spacing: 4,
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: "#000000"
      }
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue["400"]
      },
      backgroundColor: "red"
    }
  }
});
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
  textField: {
    backgroundColor: "white",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
  },
  textFieldOutline: {
    borderColor: "white!important",
    borderRadius: "2px"
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
  uploadButton: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  errorIcon: {
    fontSize: 84,
    color: "red"
  }
});
class CreateReward extends React.Component {
  state = {
    reward: {
      title: "",
      points: "",
      endTime: moment.unix(moment().unix()),
      description: "",
      image: null,
      errorMessage: false
    },
    rewardCreated: false
  };
  async componentDidMount() {
    console.log(this.props.id);
    if (this.props.id) {
      const resp = await this.props.api.get(`/getReward/${this.props.id}`);
      if (resp.data.error) {
        this.setState({ errorMessage: "Could not load reward" });
      } else {
        let item = resp.data.data;
        console.log(item);
        this.setState({
          reward: {
            id: item["_id"],
            title: item.title,
            img: item.image
              ? this.props.API_URL + "/" + item.image
              : "missingImage.svg",
            points: item.cost,
            icon: item.creatorLogo ? item.creatorLogo : "missingImage.svg",
            endTime: moment.unix(item.expirationDate),
            description: item.description
          }
        });
      }
    }
  }
  handleChange = name => event => {
    let reward = this.state.reward;
    if (name === "endTime") {
      reward[name] = event;
    } else if (name === "file") {
      reward.image = event.target.files[0];
      console.log(reward.image);
    } else {
      reward[name] = event.target.value;
    }

    this.setState({ reward });
  };
  onCreateClick = async () => {
    const formValidationData = this.formValid();
    if (formValidationData.success) {
      const { reward } = this.state;
      const resp = await this.props.api.post(
        "/createReward" + (this.props.id ? `/${this.props.id}` : ""),
        {
          reward: {
            cost: reward.points,
            expirationDate: reward.endTime.unix(),
            title: reward.title,
            description: reward.description
          }
        }
      );
      if (resp.data.error) {
        this.setState({ errorMessage: resp.data.error });
      } else {
        console.log(resp);
        if (reward.image) {
          let formData = new FormData();
          console.log(reward.image);
          formData.append("image", reward.image);
          const respImg = await this.props.api.post(
            `/setRewardImage/${resp.data.data["_id"]}`,
            formData
          );
          if (respImg.data.error) {
            this.setState({ errorMessage: "Error while uploading image" });
          } else {
            console.log(resp);
            this.setState({ rewardCreated: true });
          }
        } else {
          this.setState({ rewardCreated: true });
        }
      }
    } else {
      this.setState({ errorMessage: formValidationData.error });
    }
  };
  handlePointsDialogClose = () => {
    this.setState({ rewardCreated: false });
    this.props.history.push("/");
  };
  handleErrorDialogClose = () => {
    this.setState({ errorMessage: false });
  };
  formValid() {
    const { reward } = this.state;
    if (!reward.title || reward.title.length === 0) {
      return { error: "Invalid reward title" };
    } else if (!reward.description || reward.title.description === 0) {
      return { error: "Invalid reward description" };
    } else if (
      !reward.points ||
      reward.points === 0 ||
      reward.points < 100 ||
      reward.points > 10000
    ) {
      return { error: "Points must be between 100 and 10000" };
    } else if (!reward.endTime || moment(reward.endTime) < moment().unix()) {
      return { error: "Invalid reward end time" };
    } else {
      return { success: true };
    }
  }
  render() {
    const { classes, id, history } = this.props;
    const { reward, rewardCreated, errorMessage } = this.state;
    return (
      <Fragment>
        <NavBar history={history} back="/" admin={true} />
        <div className={classes.root}>
          <Typography variant="h6">
            {id ? "Update Reward Details" : "Enter Reward Details"}
          </Typography>
          <TextField
            fullWidth
            id="outlined-name"
            label="Program title"
            value={reward.title}
            onChange={this.handleChange("title")}
            autoComplete="off"
            margin="normal"
            variant="outlined"
            className={classes.textField}
            InputProps={{
              classes: {
                notchedOutline: classes.textFieldOutline
              }
            }}
          />
          <TextField
            fullWidth
            id="outlined-name"
            label="Redemption Cost (SWEATS)"
            value={reward.points}
            onChange={this.handleChange("points")}
            autoComplete="off"
            margin="normal"
            variant="outlined"
            type="number"
            className={classes.textField}
            inputProps={{
              min: "100",
              max: "1000",
              step: "1"
            }}
            InputProps={{
              classes: {
                notchedOutline: classes.textFieldOutline
              }
            }}
          />

          <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
            <ThemeProvider theme={materialTheme}>
              <DatePicker
                fullWidth
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                margin="normal"
                id="date-picker-inline"
                label="Expiration Date"
                format="MM/DD/YYYY"
                value={reward.endTime}
                onChange={this.handleChange("endTime")}
                className={classes.textField}
                InputProps={{
                  classes: {
                    notchedOutline: classes.textFieldOutline
                  }
                }}
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>

          <input
            ref={el => (this.fileElement = el)}
            type="file"
            onChange={this.handleChange("file")}
            style={{ display: "none" }}
          />
          <TextField
            disabled
            fullWidth
            id="outlined-name"
            label="Upload Picture"
            onClick={e => {
              this.fileElement.click();
            }}
            value={reward.image ? reward.image.name : ""}
            autoComplete="off"
            margin="normal"
            variant="outlined"
            className={classes.textField}
            InputProps={{
              classes: {
                notchedOutline: classes.textFieldOutline
              },
              endAdornment: (
                <InputAdornment position="end">
                  <ImageOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            id="outlined-name"
            label="Description"
            value={reward.description}
            multiline
            rows="7"
            onChange={this.handleChange("description")}
            autoComplete="off"
            margin="normal"
            variant="outlined"
            className={classes.textField}
            InputProps={{
              classes: {
                notchedOutline: classes.textFieldOutline
              }
            }}
          />
        </div>
        <Footer
          text={id ? "Update Reward Program" : "Create Reward Program"}
          onClick={this.onCreateClick}
        />
        <CommonDialog
          open={rewardCreated}
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
        <CommonDialog open={errorMessage} onClose={this.handleErrorDialogClose}>
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
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateReward);
