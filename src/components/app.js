import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./application.scss";
import * as React from "react";
import Stack from "@mui/material/Stack";

const theme = createTheme();

function timedTask(task) {
  if (typeof task === "function") {
    const start = new Date();
    const results = task();
    const end = new Date();
    const ellapsed = end.getTime() - start.getTime();
    return { ellapsed, results };
  }
}

function fetchPcs2020() {
  return fetch("/json/pcs2020.json").then((r) => r.json());
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PCS 2020
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
