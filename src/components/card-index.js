import { useState, useMemo, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import CreateIndex from "./create-index";
import createSearching from "../js/suggester-workers/searching/create-searching";
import Suggester from "./suggester";

function CardIndex({ libelle, get, option }) {
  const [data, setData] = useState(undefined);
  const [storeInfo, setStoreInfo] = useState(undefined);
  const [meloto, setMeloto] = useState(true);

  useEffect(
    function () {
      if (typeof get === "function") {
        (async function () {
          const [d, c] = await get();

          setData(d);
          setStoreInfo(c);
        })();
      }
    },
    [get]
  );

  const searching = useMemo(
    function () {
      if (storeInfo) {
        const { name } = storeInfo;
        return createSearching({ name, version: "1", meloto });
      }
      return () => null;
    },
    [storeInfo, meloto]
  );

  if (!data || !storeInfo) {
    return <div>waiting data!</div>;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "8px 8px",
        width: "calc(100% - 16px)",
        margin: "8px 8px",
        bgcolor: "MintCream",
      }}
    >
      <Typography variant="h2"> {libelle}</Typography>
      <Stack spacing={2} direction="row">
        <CreateIndex data={data} storeInfo={storeInfo} meloto={meloto} />
        <Suggester searching={searching} option={option} />
        <FormControlLabel
          control={
            <Switch checked={meloto} onChange={() => setMeloto(!meloto)} />
          }
          label="meloto"
        />
      </Stack>
    </Paper>
  );
}

export default CardIndex;
