import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  ThemeProvider,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@mui/material";
import theme from "../../theme";
import SocketClient from "./SocketClient";

const Lab15 = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [enableJoin, setEnableJoin] = useState(false);
  const [joined, setJoined] = useState(false); 

  useEffect(() => {
     if (name.trim() !== '' && room.trim() !== '') {
        setEnableJoin(false);
      } else {
        setEnableJoin(true); 
      }
  }, [name, room]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const handleJoin = () => {
    // Handle JOIN button click event
    console.log('Joining...', name, room);
    // <SocketClient name={name} room={room}/>
    setJoined(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Lab 15"
          style={{ color: "black", margin: 30, marginBottom: 0, textAlign: "center" }}
          titleTypographyProps={{ fontSize: 40 }}
        />
        <CardContent>
          <TextField
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            helperText="Enter user's name here"
          />
          <br></br><br></br>
          <TextField
            type="text"
            placeholder="Room"
            value={room}
            onChange={handleRoomChange}
            helperText="Enter room to join here"
          />
          <br></br><br></br>
          <Button variant="contained" color="primary" onClick={handleJoin} disabled={enableJoin}>
            JOIN
          </Button>
            {joined && <SocketClient name={name} room={room} />} 
          <br></br>
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

export default Lab15;