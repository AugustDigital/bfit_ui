import React from "react";
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
    "& h2": {
      textTransform: "uppercase",
      fontSize: "1.1em",
      fontWeight: "600",
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
    boxShadow: "none"
  },
  expired: {
    pointerEvents: "none",
    opacity: "0.4"
  }
});
class RewardCell extends React.Component {
  state = {};
  async componentDidMount() {}
  render() {
    const { classes, className, tile, onClick, largeImage } = this.props;
    return (
      <Card
        className={
          className +
          " " +
          classes.root +
          " " +
          (largeImage ? classes.noShadow : "") +
          " " +
          (tile.expired ? classes.expired : "")
        }
        onClick={onClick}
      >
        <CardActionArea>
          <CardMedia
            className={largeImage ? classes.largeImage : classes.image}
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={tile.img}
            title="Contemplative Reptile"
          />
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
                    {tile.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {tile.points} pts
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
