import React, { useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import theme from "../../theme";
import ShowWebsiteTitle from "./showTitle";

const AlertComponent = () => {
  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
    steps: [],
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  // const GRAPHURL = "http://localhost:5000/graphql";
  const GRAPHURL = "/graphql";

  useEffect(() => {
    fetchSetupDetails();
  }, []);

  const fetchSetupDetails = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Running setup...",
      });

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: "query { project1_setup { results } }" }),
      });

      let json = await response.json();
      const results = json.data.project1_setup.results;
      const steps = results.split('. ').filter(step => step.trim() !== ''); // Split sentences into steps

      setState({
        snackBarMsg: `Alerts collection setup completed`,
        steps: steps,
        contactServer: false,
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Alerts collection setup not completed - ${error.message}`,
      });
    }
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      msg: ``,
      contactServer: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <ShowWebsiteTitle />
        <CardContent>
          <div>
            <Typography color="error">{state.msg}</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: theme.palette.primary.main, fontSize: 30, textAlign: "center" }}>Alert Setup</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.steps.map((step, index) => (
                    <TableRow key={index}>
                      <TableCell style={{color: '#E23F44'}}>{step}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={state.contactServer}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};

export default AlertComponent;
