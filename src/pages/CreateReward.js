import React, { Fragment } from "react";
import {
  withStyles,
  TextField,
  Typography,
  InputAdornment
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";
import NavBar from "./components/NavBar";
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
  }
});
class CreateReward extends React.Component {
  state = {
    reward: {
      title: "Name",
      points: 1234,
      endTime: moment.unix(1573741250),
      description: "Long Text Here"
    }
  };
  async componentDidMount() {}
  handleChange = name => event => {
    let reward = this.state.reward;
    if (name === "endTime") {
      reward[name] = event;
    } else {
      reward[name] = event.target.value;
    }

    this.setState({ reward });
  };
  render() {
    const { classes, id, history } = this.props;
    const { reward } = this.state;
    return (
      <Fragment>
        <NavBar history={history} back="/" />
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
            label="Redemption Cost (pts)"
            value={reward.points}
            onChange={this.handleChange("points")}
            autoComplete="off"
            margin="normal"
            variant="outlined"
            type="number"
            className={classes.textField}
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
          <TextField
            fullWidth
            id="outlined-name"
            label="Upload logo"
            value={"todo file upload"}
            onChange={this.handleChange("file")}
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
        <Footer />
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateReward);
