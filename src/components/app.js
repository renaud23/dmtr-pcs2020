import { useCallback, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
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
import TaskIndex from "./task-index";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const theme = createTheme();

async function fetchPcs2020() {
  const data = await fetch(`${window.location.href}/json/pcs2020.json`).then(
    (r) => r.json()
  );

  return data;
}

function fetchCorePcs2020() {
  return fetch(`${window.location.href}/json/pcs2020-core.json`).then((r) =>
    r.json()
  );
}

const STATUS = {
  ready: 0,
  loaded: 1,
  terminated: 2,
};

function CreateIndex() {
  const [data, setData] = useState(undefined);
  const [storeInfo, setStoreInfo] = useState(undefined);
  const [status, setStatus] = useState(STATUS.ready);

  const onClick = useCallback(
    function () {
      (async function () {
        if (!storeInfo) {
          setStoreInfo(await fetchCorePcs2020());
        }
        if (!data) {
          setData(await fetchPcs2020());
        }
        setStatus(STATUS.loaded);
      })();
    },
    [data, storeInfo]
  );

  // useEffect(function () {}, [data, storeInfo]);

  if (status !== 0 && data && storeInfo) {
    return (
      <Paper style={{ width: "270px", padding: "5px 5px" }}>
        <TaskIndex data={data} storeInfo={storeInfo} version="1" />
      </Paper>
    );
  }

  return (
    <Button variant="text" onClick={onClick}>
      Index!
    </Button>
  );
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
        <CreateIndex />
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField helperText="pcs2020" label="PCS2020" />
      </Box>
    </ThemeProvider>
  );
}

export default App;
