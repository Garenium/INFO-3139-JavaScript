import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import theme from "../../../theme";
import "./App.css";
const MaterialUIEx2Component = () => {
  const [selection, setSelection] = useState("");

  const onChange = (e, selectedOption) => {
    let sentence = "";
    if(selectedOption){
      for (let word of words){
        sentence += word + " "; 
        if(word === selectedOption) break;
      }

      setSelection(`${sentence}`);
      console.log(sentence);
    }else{
      setSelection("");
      console.log("Cleared");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Sentence Builder using Autocomplete"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <Autocomplete
            id="words"
            options={words}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="pick a word"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <p />
          <Typography variant="h6" color="error">
            {selection}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
const words = [
  "Hey",
  "I",
  "built",
  "a",
  "sentence.",
  "Garen Ikezian",
];
export default MaterialUIEx2Component;