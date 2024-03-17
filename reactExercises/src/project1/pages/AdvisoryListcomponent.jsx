import React, { useState, useEffect, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Snackbar,
  TextField,
  Autocomplete,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import theme from "../theme";
import "../../App.css";
import AddCircle from "@mui/icons-material/AddCircle";
import ShowWebsiteTitle from "./showTitle";

const ListAdvisory = () => {
  const initialState = {
    showMsg: true,
    snackbarMsg: "",
    name: "",
    showTable: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]); //list the options based on the radio buttons
  const [advisoryData, setAdvisoryData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("traveller"); //From radio buttons
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  // const GRAPHURL = "http://localhost:5000/graphql";
  const GRAPHURL = "/graphql";

  const handleButtonChange = (event) => {
    setSelectedButton(event.target.value);
    setSelectedOption(null); // Reset selected option when radio button changes
    setState({ showTable: false }); // Hide the table when radio button changes
  };

  const fetchOptions = async () => {
    let queryStr = "";
    setState({
      contactServer: true,
      snackBarMsg: "Attempting to load from server...",
    });
    try {
      switch (selectedButton) {
        case "traveller":
          queryStr = `query {travellers_unique} `;
          break;
        case "region":
          queryStr = `query {regions_unique} `;
          break;
        case "subregion":
          queryStr = `query {subregions_unique} `;
          break;
        default:
          break;
      }
  
      const response = await fetch(GRAPHURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: queryStr }),
      });
  
      let json = await response.json();
      const selection = selectedButton;
      const jsonObj = selectedButton + "s_unique";
  
      const optionsData = json.data[jsonObj];
      // console.log(optionsData);
      setOptions(optionsData);
      setState({
        snackbarMsg: `Found ${json.data[jsonObj].length} ${selection + "s"}`,
        showMsg: true,
        contactServer: true,
      });
      setInitialFetchComplete(true); // Move this line here
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const listSelectedOption = async (selectedOption) => {
    try {
      let query = "";
      let variables = {};
      let querySelectList = "";

      switch (selectedButton) {
        case "traveller":
          query = `query ($name: String) {
              traveller(name: $name) {
                name, country, text, date
              }
            }`;
          variables = { name: selectedOption };
          querySelectList = "list_advisories_by_name";
          break;
        case "region":
          query = `query ($region: String) {
              region(region: $region) {
                name, country, text, date
              }
            }`;
          variables = { region: selectedOption };
          querySelectList = "alerts_for_region";
          break;
        case "subregion":
          query = `query ($subregion: String) {
              subregion(subregion: $subregion) {
                name, country, text, date
              }
            }`;
          variables = { subregion: selectedOption };
          querySelectList = "alerts_for_subregion";
          break;
        default:
          break;
      }

      console.log("SELECTED OPTION");
      console.log(selectedOption);

      const response = await fetch(GRAPHURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch options: ${response.statusText}`);
      }

      const json = await response.json();
      console.log(json); // debug
      const advisoryData = json.data[selectedButton];
      console.log(advisoryData);
      console.log("THIS IS advisoryData: " + advisoryData);
      setState({
        showMsg: true,
        showTable: true,
        snackbarMsg: `Found ${advisoryData.length} alerts for ${selectedOption}`,
      });

      setAdvisoryData(advisoryData);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
    // listSelectedOption();
  }, [selectedButton, state.name]);

  const onChange = (event, value) => {
    if (value) {
      console.log(value); // Log the selected value for debugging
      setSelectedOption(value);
      setState({ name: value.name, showTable: false }); // Update name and showTable state
      listSelectedOption(value); // Fetch selected option data
    }
  };

  const snackbarClose = () => {
    setState({ showMsg: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <ShowWebsiteTitle />
        <CardHeader
          title="List Advisories By:"
          style={{
            color: theme.palette.primary.main,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            style={{ textAlign: "center" }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="advisory"
                value={selectedButton}
                name="radio-buttons-group"
                onChange={handleButtonChange}
              >
                <FormControlLabel
                  value="traveller"
                  control={<Radio />}
                  label="Traveller"
                />
                <FormControlLabel
                  value="region"
                  control={<Radio />}
                  label="Region"
                />
                <FormControlLabel
                  value="subregion"
                  control={<Radio />}
                  label="Sub-Region"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <p></p>
          <Autocomplete
            id="selections"
            options={options}
            style={{ width: 300 }}
            onChange={onChange}
            value={selectedOption}
            renderInput={(params) => (
              <TextField
                {...params}
                label={selectedButton}
                variant="outlined"
                fullWidth
              />
            )}
          />
          {state.showTable && (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>Alert Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {advisoryData.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>
                        {selectedButton === "traveller"
                          ? row.country
                          : row.name}
                      </TableCell>
                      <TableCell>
                        {row.text} {row.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Snackbar
            open={state.showMsg && !state.showTable && !initialFetchComplete}
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
          <Snackbar
            open={state.showMsg}
            message={state.snackbarMsg}
            autoHideDuration={4000}
            onClose={snackbarClose}
          />
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default ListAdvisory;
