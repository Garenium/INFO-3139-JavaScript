import React, { useReducer, useEffect, useState } from "react";
import "../../../App.css";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Autocomplete,
  Snackbar,
} from "@mui/material";
import theme from "../../theme";

const Lab13Component = () => {
  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
    users: [],
    names: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load users from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: "query { users{name,age,email} }" }),
      });
      let json = await response.json();
      state.users = json.data.users;
      state.names = state.users.map((a) => a.name); //setstate just wasnt updating the variables for some reason, not sure why
      setState({
        users: json.data.users,
        snackBarMsg: `User data loaded`,
        msg: `${json.data.users.length} users loaded`,
        contactServer: true,
        names: state.users.map((a) => a.name),
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      contactServer: false,
    });
  };

  const onChange = (event, selectedOption) => {
    const selectedUser = state.users.find((user) => user.name === selectedOption);
    if (selectedUser) {
      setState({
        msg: `You selected ${selectedUser.name}. This user can be contacted at ${selectedUser.email}`,
      });
    }
    else{
      setState({
        msg: ``,
      });
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card className="card">
          <CardHeader style={{ color: theme.palette.primary.main}} className="title" title="Lab 13 - Search For User" />
          <CardContent>
            <Autocomplete
              id="userNames"
              options={state.names}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  id="userNames"
                  {...params}
                  label="available users"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <CardContent style={{ color: theme.palette.primary.main}}>
                <div>
                    <Typography>{state.msg}</Typography>
                </div>
            </CardContent>
          </CardContent>
        </Card>
        <Snackbar
          open={state.contactServer}
          message={state.snackBarMsg}
          autoHideDuration={3000}
          onClose={snackbarClose}
        />
      </ThemeProvider>
    </div>
  );
};

export default Lab13Component;
