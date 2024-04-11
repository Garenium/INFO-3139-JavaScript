import React, {useState} from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Accessibility from "@mui/icons-material/Accessibility";

const Bar = (props) => {
  const onIconClicked = () => props.viewDialog(); // notify the parent
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Chat it Up! - Info3139 
        </Typography>
        {props.showDialogIcon ? (
        <section style={{ height: 90, width: 90, marginLeft: "auto" }}>
          <IconButton onClick={onIconClicked}>
            <Accessibility style={{ color: "white", height: 75, width: 90 }} />
          </IconButton>
        </section>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Bar;
