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
    showMsg: false,
    snackbarMsg: "",
    name: "",
    showTable: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]); //
  const [selectedButton, setSelectedButton] = useState("traveller"); //From radio buttons

  const handleButtonChange = (event) => {
    setSelectedButton(event.target.value);
    setSelectedOption(null); // Reset selected option when radio button changes
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
          queryStr = `query {travellers} `;
          break;
        case "region":
          queryStr = `query {regions} `;
          break;
        case "subregion":
          queryStr = `query {subregions} `;
          break;
        default:
          break;
      }

      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: queryStr }),
      });

      let json = await response.json();
      const selection = selectedButton + "s";

      const optionsData = json.data[selection];
      console.log(optionsData);
      setOptions(optionsData);
      setState({
        snackbarMsg: `Found ${json.data[selection].length} ${selection}`,
        showMsg: true,
        contactServer: true,
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const listSelectedOption = async () => {
    try {
      let query = "";
      let variables = {};
      switch (selectedButton) {
        case "traveller":
          query = `query ($name: String) {
            list_advisories_by_name(name: $name) {
              name, country, text, date
            }
          }`;
          variables = { name: state.selectedOption };
          break;
        case "region":
          query = `query ($region: String) {
            alerts_for_region(region: $region) {
              name, country, text, date
            }
          }`;
          variables = { region: state.selectedOption };
          break;
        case "subregion":
          query = `query ($subregion: String) {
            alerts_for_subregion(subregion: $subregion) {
              name, country, text, date
            }
          }`;
          variables = { subregion: state.selectedOption };
          break;
        default:
          break;
      }

      const response = await fetch("http://localhost:5000/graphql", {
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
      console.log(json); // Log the response for debugging
      const optionsData =
        json.data[
          selectedButton === "traveller"
            ? "list_advisories_by_name"
            : `alerts_for_${selectedButton}`
        ];
      // setOptions(optionsData);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
    listSelectedOption();
  }, [selectedButton, state.name]);

  const onChange = (event, value) => {
    setSelectedOption(value);
    setState({ country: value?.name || "", showTable: true }); // Show table when option is selected
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
                  {options.map((row) => (
                    <TableRow
                      key={row.name}
                    >
                      {/* <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell> */}
                      <TableCell>5</TableCell>
                      <TableCell>4</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
