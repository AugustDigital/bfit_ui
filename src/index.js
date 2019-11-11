import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import BebasNeueRegular from "./fonts/BebasNeue-Regular.otf";
const bebas = {
  fontFamily: "Bebas",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Bebas'),
    local('Bebas-Regular'),
    url(${BebasNeueRegular}) format('otf')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};
const theme = {
  typography: {
    fontFamily: "Roboto, BebasNeue"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [bebas]
      }
    }
  },
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  palette: {
    background: {
      default: "#F1F8F9"
    }
  },
  buttons: {
    primary: {
      fontFamily: "BebasNeue",
      height: "40px!important",
      backgroundColor: "#FFFFFF",
      color: "#032F41",
      fontSize: "0.9em",
      verticalAlign: "middle",
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.9)"
      }
    },
    secondary: {
      fontFamily: "BebasNeue",
      height: "40px!important",
      backgroundColor: "#032F41",
      color: "white",
      fontSize: "0.9em",
      verticalAlign: "middle",
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "rgba(3,47,65,0.9)"
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
