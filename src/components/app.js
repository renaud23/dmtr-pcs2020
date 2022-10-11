import { useState, useMemo, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import CreateIndex from "./create-index";
import createSearching from "../js/suggester-workers/searching/create-searching";
import Suggester from "./suggester";
import "./application.scss";

const theme = createTheme();

async function fetchPcs2020Lp() {
  const data = await fetch(`${window.location.href}/json/pcs2020-lp.json`).then(
    (r) => r.json()
  );

  return data;
}

// async function fetchPcs2020() {
//   const data = await fetch(`${window.location.href}/json/pcs2020.json`).then(
//     (r) => r.json()
//   );

//   return data;
// }

function fetchCorePcs2020Lp() {
  return fetch(`${window.location.href}/json/pcs2020-lp-core.json`).then((r) =>
    r.json()
  );
}

let init = false;

function CardIndex({ data, storeInfo, searching, libelle }) {
  return (
    <Paper sx={{ width: "fit-content", padding: "8px 8px" }}>
      <Typography variant="h2"> {libelle}</Typography>
      <Stack spacing={2} direction="row">
        <CreateIndex data={data} storeInfo={storeInfo} />
        <Suggester searching={searching} />
      </Stack>
    </Paper>
  );
}

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

  useEffect(function () {
    (async function () {
      if (!init) {
        init = true;
        setStoreInfo(await fetchCorePcs2020Lp());
        setData(await fetchPcs2020Lp());
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
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            PCS 2020
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <CardIndex
        libelle="Libellés des professions"
        data={data}
        storeInfo={storeInfo}
        searching={searching}
      />
    </ThemeProvider>
  );
}

export default App;
