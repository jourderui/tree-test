import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

// Context Store
import ContextProvider from "./context";
import "./index.css";
import Tree from "./Tree";
import Form from "./Form";
import { Box, Grid } from "@mui/material";

const App: React.FC = () => {
  return (
    <ContextProvider>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <Form />
            <Tree />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Box>
    </ContextProvider>
  );
};

export default App;
