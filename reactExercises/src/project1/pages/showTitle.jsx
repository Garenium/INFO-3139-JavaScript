import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import "../../App.css";
import logo from "./logo.png";

const ShowWebsiteTitle = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="react logo" />
      </div>
      <CardHeader
        title="World Wide Travel Alerts"
        style={{ color: theme.palette.primary.main, textAlign: "center" }}
      />
    </ThemeProvider>
  );
};

export default ShowWebsiteTitle;
