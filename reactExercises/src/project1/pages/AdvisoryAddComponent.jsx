import React, { useState, useEffect, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Autocomplete,
  Button,
  Box, // Import Box component for layout
} from "@mui/material";
import theme from "../theme";
import "../../App.css";
import AddCircle from "@mui/icons-material/AddCircle";
import ShowWebsiteTitle from "./showTitle";

const AddAdvisory = () => {
  const initialState = {
    showMsg: false,
    snackbarMsg: "",
    name: "",
    country: "",
    buttonDisabled: false, 
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [countries, setCountries] = useState([]);
  // const GRAPHURL = "http://localhost:5000/graphql";
  const GRAPHURL = "/graphql";

  useEffect(() => {
    // Fetch the list of countries from an API or predefined list
    const fetchCountries = async () => {
      try {
        setState({
          contactServer: true,
          snackBarMsg: "Attempting to load from server...",
        });
        let response = await fetch(GRAPHURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({ query: "query { alerts{name, text} }" }),
        });
        let json = await response.json();
        console.log(json);
        setCountries(json.data.alerts); // Set countries data fetched from server
        setState({
          snackbarMsg: `Found ${json.data.alerts.length} countries`,
          showMsg: true,
          contactServer: true,
        });
      } catch (error) {
        console.error("Error fetching countries:", error);
        setState({
          snackbarMsg: `Problem loading server data - ${error.message}`,
        });
      }
    };

    fetchCountries();
  }, []);

  const onChange = (event, selectedOption) => {
    setState({ country: selectedOption.name });
  };

  const onAddClicked = async () => {
    try {
      setState({ buttonDisabled: true }); // Disable the button
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query: `mutation AddAdvisory($name: String!, $country: String!) {
          add_advisory(name: $name, country: $country) {
            name
            country
            text
            date
          }
        }`,
          variables: { name: state.name, country: state.country },
        }),
      });

      let json = await response.json();
      console.log(json);

      setState({
        snackbarMsg: `Add advisory on ${json.data.add_advisory.date}`,
        showMsg: true,
        contactServer: true,
        buttonDisabled: true,
      });
    } catch (err) {
      console.error("Error adding advisory:", err);
      setState({
        snackbarMsg: `Error adding advisory: ${err.message}`,
        showMsg: true,
      });
    } 
  };

  const snackbarClose = () => {
    setState({ showMsg: false });
  };

  const handleNameInput = (e) => {
    setState({ name: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <ShowWebsiteTitle />
        <CardHeader
          title="Add advisory"
          style={{
            color: theme.palette.primary.main,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
        <CardContent>
          <TextField
            onChange={handleNameInput}
            placeholder="Traveler's name"
            value={state.name}
            autoComplete='off'
          />
          <p></p>
          <Autocomplete
            id="countries"
            options={countries}
            getOptionLabel={(countries) => countries.name}
            style={{ width: 300 }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="countries"
                variant="outlined"
                fullWidth
              />
            )}
            key={(option) => option.id} // Ensure each option has a unique key
          />
          <Snackbar
            open={state.showMsg}
            message={state.snackbarMsg}
            autoHideDuration={4000}
            onClose={snackbarClose}
          />
        </CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
          style={{ margin: 20 }}
        >
          <Button
            variant="contained"
            onClick={onAddClicked}
            disabled={state.buttonDisabled} // Disable the button based on state
          >
            ADD ADVISORY
          </Button>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default AddAdvisory;
