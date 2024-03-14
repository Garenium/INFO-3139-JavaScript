import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./week7/class1/theme";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import Project1 from "./project1/pages/Project1Component.jsx";
import AlertComponent from "./project1/pages/AlertSetupComponent.jsx";
import AddAdvisory from "./project1/pages/AdvisoryAddComponent";
import ListAdvisory from "./project1/pages/AdvisoryListcomponent.jsx";
// import MaterialUIEx7aComponent from "./week7/class2/materialuiexample7a";
// import Lab13Component from "./week7/class2/Lab13/lab13";
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Case #1
          </Typography>
          <IconButton
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={NavLink} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={NavLink} to="/alert" onClick={handleClose}>
              Reset Data 
            </MenuItem>
            <MenuItem component={NavLink} to="/addAdvisory" onClick={handleClose}>
              Add Advisory 
            </MenuItem>
            <MenuItem component={NavLink} to="/listAdvisories" onClick={handleClose}>
              List Advisories 
            </MenuItem>
            {/*<MenuItem component={NavLink} to="/lab13" onClick={handleClose}>
              Lab 13 
            </MenuItem> */}
          </Menu>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Project1/>} />
        <Route path="/home" element={<Project1/>} />
        <Route path="/alert" element={<AlertComponent/>} />
        <Route path="/addAdvisory" element={<AddAdvisory/>} />
        <Route path="/listAdvisories" element={<ListAdvisory />} />
        {/*<Route path="/lab13" element={<Lab13Component />} /> */}
      </Routes>
    </ThemeProvider>
  );
};
export default App;