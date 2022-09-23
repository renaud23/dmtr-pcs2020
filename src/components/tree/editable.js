import { useCallback, useState, useEffect, useRef } from "react";

function Editable({
  value: vfp,
  setUpdate,
  onChange,
  path,
  name,
  nameOrValue,
}) {
  const [value, setValue] = useState(vfp);

  const ref = useRef();

  useEffect(
    function () {
      function onClick(e) {
        const { current } = ref;
        if (!current.contains(e.target)) {
          setUpdate(false);
          onChange({ path: path.slice(1), name, value, nameOrValue });
        }
      }

      document.addEventListener("mousedown", onClick);

      return () => {
        document.removeEventListener("mousedown", onClick);
      };
    },
    [setUpdate, ref, onChange, path, value, name, nameOrValue]
  );

  const onKeyDown = useCallback(
    function (e) {
      if (e.key === "Enter") {
        setUpdate(false);
        onChange({ path: path.slice(1), name, value, nameOrValue });
      }
    },
    [setUpdate, onChange, path, value, nameOrValue, name]
  );

  return (
    <input
      type="text"
      value={value || ""}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      ref={ref}
      onKeyDown={onKeyDown}
      onChange={function (e) {
        e.stopPropagation();
        setValue(e.target.value);
      }}
    ></input>
  );
}

export default Editable;
