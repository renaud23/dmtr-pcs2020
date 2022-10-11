import { useCallback, useState, useRef } from "react";
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

function Suggester({ searching }) {
  const inputEl = useRef();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  function onFocus() {
    setOpen(true);
  }

  function onBlur() {
    setOpen(false);
  }

  const onChange = useCallback(
    function (e) {
      const { value } = e.target;
      if (value.trim()) {
        (async function () {
          if (typeof searching === "function") {
            const { results } = await searching(value.trim());

            setOptions(results);
          }
        })();
      }
    },
    [searching]
  );

  const items = options.map(function ({ libm, code, id }) {
    return (
      <ListItem
        key={id}
        secondaryAction={<Chip label={code} variant="outlined" />}
      >
        <ListItemButton>
          <ListItemText primary={libm} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <ClickAwayListener onClickAway={onBlur}>
      <Box>
        <TextField
          ref={inputEl}
          label="PCS2020"
          onFocus={onFocus}
          onChange={onChange}
        />
        <Popper id="toto" open={open} anchorEl={inputEl.current} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
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