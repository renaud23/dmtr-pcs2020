import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CardIndex from "./card-index";
import Chip from "@mui/material/Chip";
import { fetchPcs2020Lp, fetchPcs2020 } from "./fetch-data";
import "./application.scss";

const theme = createTheme();

function OptionLp({ libm, code }) {
  return (
    <ListItem
      key={code}
      secondaryAction={<Chip label={code} variant="outlined" />}
    >
      <ListItemButton>
        <ListItemText primary={libm} />
      </ListItemButton>
    </ListItem>
  );
}

function OptionPcs2020({ level, id, label }) {
  return (
    <ListItem
      key={id}
      secondaryAction={<Chip label={`${id} - ${level}`} variant="outlined" />}
    >
      <ListItemButton>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
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
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            PCS 2020
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <CardIndex
        libelle="Libellés des professions"
        get={fetchPcs2020Lp}
        option={OptionLp}
      />
      <CardIndex libelle="PCS 2020" get={fetchPcs2020} option={OptionPcs2020} />
    </ThemeProvider>
  );
}

export default App;
