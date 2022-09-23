import { useCallback, useState, useEffect, useRef } from "react";

function getType(value) {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  return typeof value;
}

function getValue(value) {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }

  return `${value}`;
}

function InputText({ value, setValue, onKeyDown }) {
  return (
    <input
      type="text"
      value={getValue(value)}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onKeyDown={onKeyDown}
      onChange={function (e) {
        e.stopPropagation();
        setValue(e.target.value);
      }}
    />
  );
}

function EditableWithType({
  value: vfp,
  setUpdate,
  onChange,
  path,
  name,
  nameOrValue,
}) {
  const [value, setValue] = useState(vfp);

  const ref = useRef();
  const [type, setType] = useState(getType(value));

  const changeType = useCallback(function (e) {
    setType(e.target.value);
  }, []);

  useEffect(
    function () {
      function onClick(e) {
        const { current } = ref;
        if (!current.contains(e.target)) {
          setUpdate(false);
          onChange({ path: path.slice(1), name, value, nameOrValue, type });
        }
      }

      document.addEventListener("mousedown", onClick);

      return () => {
        document.removeEventListener("mousedown", onClick);
      };
    },
    [setUpdate, ref, onChange, path, value, name, nameOrValue, type]
  );

  const onKeyDown = useCallback(
    function (e) {
      if (e.key === "Enter") {
        setUpdate(false);
        onChange({ path: path.slice(1), name, value, nameOrValue, type });
      }
    },
    [setUpdate, onChange, path, value, nameOrValue, name, type]
  );

  return (
    <span
      className="editable-with-type"
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onKeyDown={onKeyDown}
    >
      <InputText value={value} setValue={setValue} onKeyDown={onKeyDown} />
      <select defaultValue={type} onChange={changeType}>
        <option value="string">string</option>
        <option value="number">number</option>
        <option value="boolean">boolean</option>
        <option value="null">null</option>
        <option value="undefined">undefined</option>
      </select>
    </span>
  );
}

export default EditableWithType;
