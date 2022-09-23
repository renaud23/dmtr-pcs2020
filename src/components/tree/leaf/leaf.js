import Indent from "../indent";
import Etiquette from "../etiquette";
import { TYPES } from "../etiquette";

function Boolean({ value }) {
  return (
    <span className="boolean">
      <input type="checkbox" defaultChecked={value} />
    </span>
  );
}

function Content({ value }) {
  if (value === null) {
    return <span className="null">null</span>;
  }
  if (value === undefined) {
    return <span className="undefined">undefined</span>;
  }
  if (typeof value === "boolean") {
    return <Boolean value={value} />;
  }
  if (typeof value === "string") {
    return (
      <span className="string">
        <span className="quote">"</span>
        <span className="content">{value}</span>
        <span className="quote">"</span>
      </span>
    );
  }
  return <span className="default">{value}</span>;
}

function Value({ value }) {
  return (
    <span className="value">
      <Content value={value} />
    </span>
  );
}

function Leaf({ name, path, value, level, onChange, editable, arrayEntry }) {
  return (
    <>
      <Indent index={level + 1} />
      <span className="leaf">
        <Etiquette
          value={name}
          onChange={onChange}
          path={path}
          name={name}
          editable={editable && !arrayEntry}
          nameOrValue={TYPES.name}
          className="name"
        >{`${name} :`}</Etiquette>
        <Etiquette
          value={value}
          onChange={onChange}
          path={path}
          name={name}
          editable={editable}
          nameOrValue={TYPES.value}
          withType={true}
        >
          <Value
            value={value}
            onChange={onChange}
            path={path}
            name={name}
            editable={editable}
          />
        </Etiquette>
      </span>
    </>
  );
}

export default Leaf;
