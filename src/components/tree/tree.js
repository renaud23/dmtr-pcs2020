import { useCallback, useState, useEffect } from "react";
import classnames from "classnames";
import Entry from "./entry";
import updateValue from "./update-value";
import "./tree.scss";

function empty(args) {
  console.log(args);
}

function Tree({
  entities,
  onChange = empty,
  editable = false,
  expended = false,
}) {
  const [clone, setClone] = useState(entities);

  useEffect(
    function () {
      setClone(entities);
    },
    [entities]
  );

  const handleChange = useCallback(
    function ({ path, name, value, nameOrValue, type }) {
      // onChange({ path, name, value, nameOrValue });
      const next = updateValue(clone, { path, name, value, nameOrValue, type });
      setClone(next);
    },
    [clone]
  );

  const handleRemove = useCallback(
    function (path) {
      console.log("remove", { clone, path });
    },
    [clone]
  );

  return (
    <div className={classnames("tree")}>
      <Entry
        name="root"
        value={clone}
        level={0}
        expended={expended}
        onChange={handleChange}
        onRemove={handleRemove}
        editable={editable}
      />
    </div>
  );
}

export default Tree;
