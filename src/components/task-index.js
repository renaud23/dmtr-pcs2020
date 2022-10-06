import { useState, useEffect, useCallback } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useStoreIndex from "../js/store-tools/use-store-index";
import { clearStoreData } from "../js/store-tools";
import createAppendTask from "../js/suggester-workers/append-to-index/index";
import updateStoreInfo from "../js/store-tools/update-store-info";

const STATUS = {
  ready: 0,
  running: 1,
  terminated: 2,
};

function TaskIndex({ storeInfo, data, version, onTerminated }) {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState(STATUS.ready);
  const [startTime, setStartTime] = useState(undefined);

  const db = useStoreIndex(storeInfo, "1");

  const log = useCallback(
    function (info) {
      const { percent } = info?.message;
      if (percent !== undefined) {
        setPercent(percent);

        if (percent === 100) {
          setStatus(STATUS.terminated);
          onTerminated();
        }
      }
    },
    [onTerminated]
  );

  useEffect(
    function () {
      let abort_ = () => null;
      (async function () {
        if (db && status === STATUS.ready) {
          setStatus(STATUS.running);
          await clearStoreData(db);
          await updateStoreInfo(db, storeInfo);
          const [index, abort] = createAppendTask(storeInfo, version, log);
          abort_ = abort;

          setStartTime(new Date().getTime());
          await index(data);
        }
      })();
      return () => abort_();
    },
    [data, db, storeInfo, version, status, log]
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={percent} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              percent
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
      <div>{`${new Date().getTime() - startTime} ms`}</div>
    </>
  );
}

export default TaskIndex;
