import { useCallback, useState, useRef, useMemo } from "react";
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
import createSearching from "../js/suggester-workers/searching/create-searching";
import Suggester from "./suggester";

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
  running: 1,
  terminated: 2,
};

function CreateIndex({ storeInfo, data }) {
  const [status, setStatus] = useState(STATUS.ready);

  const onClick = useCallback(
    function () {
      if (data && storeInfo) {
        setStatus(STATUS.running);
      }
    },
    [data, storeInfo]
  );

  function onTerminated() {
    setStatus(STATUS.terminated);
  }

  if (status !== STATUS.ready) {
    return (
      <Paper style={{ width: "270px", padding: "5px 5px" }}>
        <TaskIndex
          data={data}
          storeInfo={storeInfo}
          version="1"
          onTerminated={onTerminated}
        />
      </Paper>
    );
  }

  return (
    <Button variant="text" onClick={onClick}>
      Index!
    </Button>
  );
}

let init = false;

function App() {
  const [data, setData] = useState(undefined);
  const [storeInfo, setStoreInfo] = useState(undefined);

  const searching = useMemo(
    function () {
      if (storeInfo) {
        const { name } = storeInfo;
        return createSearching(name, "1");
      }
      return undefined;
    },
    [storeInfo]
  );

  React.useEffect(function () {
    (async function () {
      if (!init) {
        init = true;
        setStoreInfo(await fetchCorePcs2020());
        setData(await fetchPcs2020());
      }
    })();
  }, []);

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
        <CreateIndex data={data} storeInfo={storeInfo} />
      </Stack>
      <Suggester searching={searching} />
    </ThemeProvider>
  );
}

export default App;
