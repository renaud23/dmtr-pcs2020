import { useMemo, useState, useCallback } from "react";
import createSearching from "../js/suggester-workers/searching/create-searching";
import Tree from "./tree";

function Search({ storeInfo, version }) {
  const [search, setSearch] = useState("");
  const [entities, setEntities] = useState([]);

  const searching = useMemo(
    function () {
      if (storeInfo) {
        const { name } = storeInfo;
        return createSearching(name, version);
      }
      return undefined;
    },
    [storeInfo, version]
  );

  const onChange = useCallback(function (e) {
    setSearch(e.target.value);
  }, []);

  const onSearch = useCallback(
    function () {
      (async function () {
        if (search.length && searching) {
          const { results } = await searching(search);
          setEntities(results);
        }
      })();
    },
    [searching, search]
  );

  return (
    <>
      <Tree entities={entities} editable={true} expended={true} />
      <input type="text" value={search} onChange={onChange} />
      <button onClick={onSearch}>Search!</button>
    </>
  );
}

export default Search;
