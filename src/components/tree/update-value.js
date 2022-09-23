import { TYPES } from "./etiquette";

function isDisponibleName(entry, name) {
  return Object.keys(entry).reduce(function (status, current) {
    return status && current !== name;
  }, true);
}

function updateEntry(entry, { name, value, nameOrValue, type }) {
  if (nameOrValue === TYPES.name) {
    if (value.length > 0 && isDisponibleName(entry, value)) {
      const next = { ...entry };
      next[value] = next[name];
      delete next[name];
      return next;
    }
    return entry;
  }

  if (nameOrValue === TYPES.value) {
    try {
      switch (type) {
        case "boolean":
          return { ...entry, [name]: `${value}` === "true" };
        case "number":
          return { ...entry, [name]: Number(`${value}`) };
        case "string":
          return { ...entry, [name]: `${value}` };
        case "null":
          return { ...entry, [name]: null };
        case "undefined":
          return { ...entry, [name]: undefined };

        default:
          return { ...entry, [name]: value };
      }
    } catch (e) {
      console.warn(e);
      return { ...entry, [name]: value };
    }
  }
  return entry;
}

function crawl(entry, { paths, name, value, nameOrValue, type }) {
  const [current, ...rest] = paths;

  if (current) {
    const reg = current.match(/(.*)\[([^)]+)\]/s);
    // array element
    if (reg) {
      const subName = reg[1];
      const index = reg[2];

      if (Array.isArray(entry)) {
        const next = [...entry];
        next["root" ? index : name] = crawl(
          subName === "root" ? entry[index] : entry[index],
          {
            paths: rest,
            name,
            value,
            nameOrValue,
            type,
          }
        );

        return next;
      } else {
        const next = [...entry[subName]];
        next[index] = crawl(entry[subName][index], {
          paths: rest,
          name,
          value,
          nameOrValue,
          type,
        });

        return { ...entry, [subName]: next };
      }
    }

    const subEntry = entry[current];
    // array node
    if (Array.isArray(subEntry)) {
      return updateEntry(entry, { name, value, nameOrValue, type });
    }
    // node
    if (typeof subEntry === "object") {
      if (paths.length === 1) {
        return updateEntry(entry, { name, value, nameOrValue, type });
      }
      return {
        ...entry,
        [current]: crawl(subEntry, {
          paths: rest,
          name,
          value,
          nameOrValue,
          type,
        }),
      };
    }
  }
  // leaf
  return updateEntry(entry, { name, value, nameOrValue, type });
}

function updateValue(entry, { path, name, value, nameOrValue, type }) {
  const paths = path.split(".");
  return crawl(entry, { paths, name, value, nameOrValue, type });
}

export default updateValue;
