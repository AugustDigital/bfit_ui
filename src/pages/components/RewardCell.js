import React from "react";
import { timeLeftFormat } from "../../utils";
import moment from "moment";
import {
  withStyles,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
const styles = theme => ({
  root: {
    background: "white",
    color: "#032F41",
    borderRadius: "2px",
    "& h2": {
      fontFamily: "BebasNeue",
      textTransform: "uppercase",
      fontSize: "1.5em",
      fontWeight: "500",
      marginBottom: 0
    },
    "& p": {
      fontSize: "1.1em"
    }
  },
  textSection: {
    marginLeft: "10px",
    width: "55%"
  },
  image: {
    height: "80px"
  },
  largeImage: {
    height: "210px"
  },
  content: {},
  noShadow: {
    boxShadow: "none",
    width: "100%"
  },
  expired: {
    pointerEvents: "none",
    opacity: "0.65"
  },
  badge: {
    width: "auto",
    height: "auto",
    color: "white",
    padding: "5px 10px 5px 10px",
    backgroundColor: "#032F41",
    position: "absolute"
  },
  badgeTop: {
    top: 0
  },
  badgeBottom: {
    transform: "translateY(-100%)"
  }
});
class RewardCell extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes, className, tile, onClick, largeImage } = this.props;
    const expired = moment.unix(tile.endTime).diff(moment()) < 0;
    return (
      <Card
        className={
          className +
          " " +
          classes.root +
          " " +
          (largeImage ? classes.noShadow : "") +
          " " +
          (expired ? classes.expired : "")
        }
        onClick={onClick}
      >
        <CardActionArea>
          <CardMedia
            className={largeImage ? classes.largeImage : classes.image}
            component="img"
            alt="card image"
            height="140"
            image={tile.img}
          ></CardMedia>
          <div
            className={
              classes.badge +
              " " +
              (largeImage ? classes.badgeBottom : classes.badgeTop)
            }
          >
            {moment.unix(tile.endTime).diff(moment()) < 0
              ? "Expired"
              : timeLeftFormat(tile.endTime) + " left"}
          </div>
          <CardContent>
            <Grid container>
              <Grid
                item
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: `url('${tile.icon}')`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
                }}
              ></Grid>
              <Grid item className={classes.textSection}>
                <Grid
                  container
                  style={{ height: "100%" }}
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    {tile.title ? tile.title : "No Title"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {tile.points ? tile.points.toLocaleString() : 0} SWEATS
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RewardCell);
