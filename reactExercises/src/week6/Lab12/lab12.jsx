// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import theme from "./theme";
import "./App.css";

const Lab11 = () => {
  const [message, setMessage] = useState("");
  const [word, setWord] = useState("");
  const [messageColor, setMessageColor] = useState("cyan");
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleAddWord = () => {
    const newMessage = message + (message ? " " : "") + word;
    setMessage(newMessage);
    if (newMessage.split(" ").length >= 5) {
      setMessageColor("red");
      setSubmitDisabled(true);
    }
    setWord("");
  };

  const clearMessage = () => {
    setMessage("");
    setMessageColor("cyan");
    setSubmitDisabled(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Lab 11
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardHeader title="Sentence Builder" />
        <CardContent style={{ color: messageColor, fontSize: 20 }}>
          The Message is:
        </CardContent>
        <CardContent>{message}</CardContent>
        <TextField
          value={word}
          onChange={(e) => setWord(e.target.value)}
          label="Enter Word"
          style={{ width: 120, height: 100, margin: 4 }}
          placeholder="Add Word"
        />
        <Button
          onClick={handleAddWord}
          disabled={isSubmitDisabled}
          variant="contained"
          color="primary"
          data-testid="addbutton"
        >
          Add Word
        </Button>
        <Button onClick={clearMessage} variant="contained" color="primary">
          Clear msg
        </Button>
      </Card>
    </ThemeProvider>
  );
};

export default Lab11;
