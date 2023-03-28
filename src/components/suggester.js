import { useCallback, useState, useRef, useEffect } from "react";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Chip from "@mui/material/Chip";

function DefaultOption({ label, id }) {
  return (
    <ListItem key={id} secondaryAction={<Chip label={id} variant="outlined" />}>
      <ListItemButton>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}

function Suggester({ searching, option: Option = DefaultOption }) {
  const inputEl = useRef();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  function onFocus() {
    setOpen(true);
  }

  function onBlur() {
    setOpen(false);
  }

  const onChange = useCallback(function (e) {
    setSearch(e.target.value);
    // const { value } = e.target;
    // if (value.trim()) {
    //   (async function () {
    //     if (typeof searching === "function") {
    //       const { results, tokens, search } = await searching(value.trim());
    //       console.group(search);
    //       console.log(tokens);
    //       console.groupEnd();
    //       setOptions(results);
    //     }
    //   })();
    // }
  }, []);

  const items = options.map(function ({ label, id, ...rest }) {
    return <Option key={id} label={label} id={id} {...rest} />;
  });

  const go = useCallback(
    async (s) => {
      if (typeof searching === "function") {
        const { results, tokens, search } = await searching(s.trim());
        console.group(search);
        console.log(tokens);
        console.groupEnd();
        setOptions(results);
      }
    },
    [searching]
  );

  useEffect(
    function () {
      if (search.trim()) {
        go(search);
      }
    },
    [search, go]
  );

  useEffect(
    function () {
      if (typeof searching === "function") {
      }
    },
    [searching]
  );

  return (
    <ClickAwayListener onClickAway={onBlur}>
      <Box>
        <TextField
          ref={inputEl}
          label="PCS2020"
          onFocus={onFocus}
          onChange={onChange}
        />
        <Popper
          id="toto"
          open={open}
          anchorEl={inputEl.current}
          transition
          style={{ zIndex: 1 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "GhostWhite",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List>{items}</List>
                </nav>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}

export default Suggester;
