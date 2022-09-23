import { useState } from "react";
import Editable from "./editable";
import EditableWithType from "./editable-with-type";

export const TYPES = {
  name: "etiquette/name",
  value: "etiquette/value",
};

function getComponent(withType) {
  if (withType) {
    return EditableWithType;
  }
  return Editable;
}

function Etiquette({
  name,
  path,
  value,
  onChange,
  editable,
  nameOrValue,
  children,
  className,
  withType = false,
}) {
  const [update, setUpdate] = useState(false);
  const EditableComponent = getComponent(withType);
  if (update && editable) {
    return (
      <EditableComponent
        value={value}
        setUpdate={setUpdate}
        onChange={onChange}
        path={path}
        name={name}
        nameOrValue={nameOrValue}
      />
    );
  }
  return (
    <span
      className={className}
      onClick={function (e) {
        setUpdate(true);
      }}
    >
      {children}
    </span>
  );
}

export default Etiquette;
