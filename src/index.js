import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";

const root = ReactDOM.createRoot(document.getElementById("root"));

const storeInfo = {
  name: "naf-rev2-stop",
  fields: [
    {
      name: "label",
      rules: ["[\\w]+"],
      language: "French",
      min: 2,
    },
    { name: "id" },
  ],
  queryParser: {
    type: "tokenized",
    params: { language: "French", pattern: "[\\w.]+" },
  },
  version: "1",
  test: true,
  test2: {},
};

root.render(
  <React.StrictMode>
    <App storeInfo={storeInfo} />
  </React.StrictMode>
);
