import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  palette: {
    background: {
      default: "#F1F8F9"
    }
  },
  buttons: {
    primary: {
      height: "40px!important",
      backgroundColor: "#FFFFFF",
      color: "#032F41",
      fontSize: "0.4em",
      verticalAlign: "middle",
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.9)"
      }
    }
  }
};

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
