export async function fetchPcs2020Lp() {
  return Promise.all([
    fetch(`${window.location.href}/json/pcs2020-lp.json`).then((r) => r.json()),
    fetch(`${window.location.href}/json/pcs2020-lp-core.json`).then((r) =>
      r.json()
    ),
  ]).then((values) => {
    return values;
  });
}

export async function fetchPcs2020LpSoft() {
  return Promise.all([
    fetch(`${window.location.href}/json/pcs2020-lp.json`).then((r) => r.json()),
    fetch(`${window.location.href}/json/pcs2020-lp-core-soft.json`).then((r) =>
      r.json()
    ),
  ]).then((values) => {
    return values;
  });
}

export async function fetchPcs2020() {
  return Promise.all([
    fetch(`${window.location.href}/json/pcs2020.json`).then((r) => r.json()),
    fetch(`${window.location.href}/json/pcs2020-core.json`).then((r) =>
      r.json()
    ),
  ]).then((values) => {
    return values;
  });
}
