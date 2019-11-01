import React, { Fragment } from "react";
import {
  withStyles,
  TextField,
  Typography,
  InputAdornment,
  Grid
} from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import NavBar from "./components/NavBar";
import CommonDialog from "./components/CommonDialog";
import RoundGreenCheckmark from "../res/round_green_checkmark.svg";
import Footer from "./components/Footer";

const styles = theme => ({
  root: {
    margin: "0 auto 0 auto",
    padding: "10vh 5vh 10vh 0",
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "60px 0 80px 0"
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
  }
});
class Vendor extends React.Component {
  state = {
    vendorData: {
      name: "",
      image: null,
      addressOne: "",
      addressTwo: "",
      addressCity: "",
      addressProvince: "",
      addressCountry: "",
      addressPostalCode: "",
      category: ""
    },
    vendorCreated: false
  };
  async componentDidMount() {
    console.log(!this.props.user.vendorData ? "new vendor" : "existing vendor");
    if (this.props.user.vendorData) {
      const vd = this.props.user.vendorData;
      this.setState({
        vendorData: {
          name: vd.name,
          image: vd.image,
          addressOne: vd.addressOne,
          addressTwo: vd.addressTwo,
          addressCity: vd.addressCity,
          addressProvince: vd.addressProvince,
          addressCountry: vd.addressCountry,
          addressPostalCode: vd.addressPostalCode,
          category: vd.category
        }
      });
    }
  }
  handleChange = name => event => {
    let vendorData = this.state.vendorData;
    if (name === "file") {
      vendorData.image = event.target.files[0];
      console.log(vendorData.image);
    } else {
      vendorData[name] = event.target.value;
    }

    this.setState({ vendorData });
  };
  onCreateClick = async () => {
    //todo if this.props.id then update
    const formValidationData = this.formValid();
    if (formValidationData.success) {
      const { vendorData } = this.state;
      const vd = vendorData;
      const resp = await this.props.api.post("/setRole", {
        roleType: 1,
        vendorData: {
          name: vd.name,
          addressOne: vd.addressOne,
          addressTwo: vd.addressTwo,
          addressCity: vd.addressCity,
          addressProvince: vd.addressProvince,
          addressCountry: vd.addressCountry,
          addressPostalCode: vd.addressPostalCode,
          category: vd.category
        }
      });
      if (resp.data.error) {
        alert(resp.data.error.message);
      } else {
        console.log(resp);
        this.props.user.roleType = 1;
        this.props.user.vendorData = resp.data.data.vendorData;
        if (vendorData.image) {
          let formData = new FormData();
          console.log(vendorData.image);
          formData.append("image", vendorData.image);
          const respImg = await this.props.api.post(
            `/setVendorImage`,
            formData
          );
          if (respImg.data.error) {
            alert(resp.data.error.message);
          } else {
            console.log(resp);
            this.setState({ vendorCreated: true });
          }
        } else {
          this.setState({ vendorCreated: true });
        }
      }
    } else {
      alert(formValidationData.error);
    }
  };
  handlePointsDialogClose = () => {
    this.setState({ vendorCreated: false });
  };
  formValid() {
    const { vendorData } = this.state;
    if (!vendorData.name || vendorData.name.length === 0) {
      return { error: "invalid name" };
    } else if (!vendorData.addressOne || vendorData.addressOne === 0) {
      return { vendorData: "invalid Address Line One" };
    } else if (!vendorData.addressTwo || vendorData.addressTwo === 0) {
      return { vendorData: "invalid Address Line Two" };
    } else if (!vendorData.addressCity || vendorData.addressCity === 0) {
      return { vendorData: "invalid City" };
    } else if (
      !vendorData.addressProvince ||
      vendorData.addressProvince === 0
    ) {
      return { vendorData: "invalid Province" };
    } else if (!vendorData.addressCountry || vendorData.addressCountry === 0) {
      return { vendorData: "invalid Country" };
    } else {
      return { success: true };
    }
  }
  render() {
    const { classes, user, history } = this.props;
    const { vendorData, vendorCreated } = this.state;
    return (
      <Fragment>
        <NavBar history={history} back="/" admin={true} noMenu={true} />
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {user.vendorData
                ? "Update Vendor Details"
                : "Enter Vendor Details"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Name"
              value={vendorData.name}
              onChange={this.handleChange("name")}
              autoComplete="off"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldOutline
                }
              }}
            />
          </Grid>
          <input
            ref={el => (this.fileElement = el)}
            type="file"
            onChange={this.handleChange("file")}
            style={{ display: "none" }}
          />
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              id="outlined-name"
              label="Upload Logo"
              onClick={e => {
                this.fileElement.click();
              }}
              value={vendorData.image ? vendorData.image.name : ""}
              autoComplete="off"
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Address Line One"
              value={vendorData.addressOne}
              onChange={this.handleChange("addressOne")}
              autoComplete="off"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldOutline
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Address Line Two"
              value={vendorData.addressTwo}
              onChange={this.handleChange("addressTwo")}
              autoComplete="off"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldOutline
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-name"
              label="City"
              value={vendorData.addressCity}
              onChange={this.handleChange("addressCity")}
              autoComplete="off"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldOutline
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Province"
              value={vendorData.addressProvince}
              onChange={this.handleChange("addressProvince")}
              autoComplete="off"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldOutline
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Country"
              value={vendorData.addressCountry}
              onChange={this.handleChange("addressCountry")}
              autoComplete="off"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldOutline
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Postal Code"
              value={vendorData.addressPostalCode}
              onChange={this.handleChange("addressPostalCode")}
              autoComplete="off"
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldOutline
                }
              }}
            />
          </Grid>
        </Grid>
        <Footer
          text={
            user.vendorData ? "Update Vendor Profile" : "Create Vendor Profile"
          }
          onClick={this.onCreateClick}
        />
        <CommonDialog
          open={vendorCreated}
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
            <Typography variant="h4">Vendor Profile</Typography>
            <Typography variant="h5">Updated Successfully</Typography>
          </Grid>
        </CommonDialog>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Vendor);
