import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TaskIndex from "./task-index";

const STATUS = {
  ready: 0,
  running: 1,
  terminated: 2,
};

function CreateIndex({ storeInfo, data, meloto }) {
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
          meloto={meloto}
          version="1"
          onTerminated={onTerminated}
        />
      </Paper>
    );
  }

  return (
    <Button variant="contained" onClick={onClick}>
      Index!
    </Button>
  );
}

export default CreateIndex;
