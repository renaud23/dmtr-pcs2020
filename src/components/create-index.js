import { useCallback, useState, useEffect } from "react";
import useStoreIndex from "../js/store-tools/use-store-index";
import { clearStoreData } from "../js/store-tools";
import createAppendTask from "../js/suggester-workers/append-to-index";
import updateStoreInfo from "../js/store-tools/update-store-info";

function Progress({ percent }) {
  return (
    <div className="progress">
      {percent}
      <div
        className="cursor"
        style={{ width: `calc(${Math.round(percent)}% - 2px)` }}
      ></div>
    </div>
  );
}

function ReadyToLoad({ storeInfo, data, version }) {
  const [disabled, setDisabled] = useState(false);
  const [start, setStart] = useState(false);
  const [percent, setPercent] = useState(undefined);

  const db = useStoreIndex(storeInfo, "1");

  function log(info) {
    const { percent } = info?.message;
    if (percent !== undefined) {
      setPercent(percent);
    }
  }

  const launch = useCallback(function () {
    setDisabled(true);
    setStart(true);
  }, []);

  useEffect(
    function () {
      if (start) {
        let abort_ = () => null;
        (async function () {
          await clearStoreData(db);
          await updateStoreInfo(db, storeInfo);
          const [index, abort] = createAppendTask(storeInfo, version, log);
          abort_ = abort;

          await index(data);
          setStart(false);
          setDisabled(false);
        })();
        return () => abort_();
      }
    },
    [start, data, db, storeInfo, version]
  );

  return (
    <>
      <button disabled={disabled} onClick={launch}>
        Create!
      </button>
      <Progress percent={percent} />
    </>
  );
}

function CreateIndex({ storeInfo, data }) {
  if (Array.isArray(data) && data.length) {
    return <ReadyToLoad storeInfo={storeInfo} data={data} />;
  }
  return <div>Chargez d'abord un fichier de données.</div>;
}

export default CreateIndex;
