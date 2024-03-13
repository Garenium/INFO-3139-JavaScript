import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import "../../App.css";
import logo from "./logo.png";
import ShowWebsiteTitle from "./showTitle";


const Project1 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
       <ShowWebsiteTitle/>
        <CardContent>
          <br />
          <Typography
            color="primary"
            style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
          >
            &copy;Info3139 - 2023
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default Project1;