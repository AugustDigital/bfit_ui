import React from "react";
import { withStyles, Grid, Typography, Fab } from "@material-ui/core";
import EmptyListPlaceholder from "./components/EmptyListPlaceholder";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const styles = theme => ({
  roleDialogContent: {
    "& h3": {
      maxWidth: "350px",
      marginBottom: "50px",
      marginTop: "10%",
      color: "white",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px"
      }
    }
  },
  roleButton: {
    minWidth: "90px!important",
    margin: "5px",
    textTransform: "uppercase!important"
  },
  roleWrapper: {
    maxWidth: "360px",
    margin: "5px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "none",
      minWidth: "360px"
    }
  },
  roleContainer: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: "5px",
    padding: "20px",
    "& h5": {
      fontSize: "1.2em",
      fontWeight: "600",
      marginBottom: "10px",
      marginTop: "10px"
    },
    "& h6": {
      fontSize: "1.2em",
      fontWeight: "400",
      marginBottom: "15px"
    },
    "& a": {
      textDecoration: "none",
      paddingLeft: "10px",
      paddingRight: "20px"
    }
  },
  buttonPositive: {
    backgroundColor: "rgba(10,200,10,1)",
    color: "white",
    boxShadow: "0px 1px 1px -1px rgba(0,0,0,0.4)",
    textTransform: "none",
    padding: "0",
    "&:hover": {
      backgroundColor: "lightgray"
    }
  },
  buttonNegative: {
    backgroundColor: "rgba(200,10,10,1)",
    color: "white",
    boxShadow: "0px 1px 1px -1px rgba(0,0,0,0.4)",
    textTransform: "none",
    padding: "0",
    "&:hover": {
      backgroundColor: "lightgray"
    }
  }
});
class VendorCell extends React.Component {
  render() {
    const { classes, vendorData, id, onActionClick } = this.props;
    return (
      <Grid
        className={classes.roleContainer}
        container
        direction="column"
        justify="start"
        alignItems="left"
      >
        <img
          alt="vendor"
          width="100%"
          src={API_URL + "/" + vendorData.image}
        ></img>
        <Typography variant="h5">{vendorData.name}</Typography>
        <Typography variant="h6">
          {vendorData.addressCity}, {vendorData.addressCountry}
        </Typography>
        <Typography variant="h6">{vendorData.about}</Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Fab
              className={classes.roleButton + " " + classes.buttonPositive}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => onActionClick(id, true)}
            >
              Approve
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              className={classes.roleButton + " " + classes.buttonNegative}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => onActionClick(id, false)}
            >
              Reject
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
class Admin extends React.Component {
  state = {};
  async componentDidMount() {
    this.loadList();
  }
  loadList = async () => {
    const resp = await this.props.api.get(`/pendingVendors`);
    if (resp.data.error) {
      alert("could not load pending vendors");
    } else {
      console.log(resp.data);
      console.log(resp.data);
      this.setState({ listItems: resp.data.data });
    }
  };
  onActionClick = async (id, flag) => {
    const resp = await this.props.api.post(`/approveRejectVendor`, {
      data: {
        id: id,
        flag: flag
      }
    });
    if (resp.data.error) {
      this.setState({ errorMessage: resp.data.error });
    } else {
      this.loadList();
    }
  };
  render() {
    const { classes } = this.props;
    const { listItems } = this.state;
    console.log(listItems);
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.roleDialogContent}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          {listItems && listItems.length > 0 ? (
            listItems.map((item, index) => (
              <Grid key={index} item sm={6} className={classes.roleWrapper}>
                <VendorCell
                  classes={classes}
                  vendorData={item.vendorData}
                  id={item._id}
                  onActionClick={this.onActionClick}
                />
              </Grid>
            ))
          ) : (
            <EmptyListPlaceholder
              title="No Vendors Pending Approval"
              details="Vendors who just signed up will appear here"
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Admin);
