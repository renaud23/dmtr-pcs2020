import { useState, useCallback } from "react";

import Tree from "./tree";

function EditConfig({ storeInfo: siProps, setStoreInfo }) {
  const [content, setContent] = useState(JSON.stringify(siProps, null, 2));

  const changeFile = useCallback(
    function (input) {
      const files = input.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (res) => {
          setContent(res.target.result); // Print file contents
          setStoreInfo(JSON.parse(res.target.result));
        };
        reader.onerror = (err) => console.log(err);

        reader.readAsText(file);
      }
    },
    [setStoreInfo]
  );

  const onChangeContent = useCallback(
    function (e) {
      setContent(e.target.value);
      try {
        setStoreInfo(JSON.parse(e.target.value));
      } catch (e) {
        console.error(e);
      }
    },
    [setStoreInfo]
  );

  return (
    <>
      <input type="file" onChange={changeFile} accept=".json" />
      <div className="store-editor" style={{ width: "600px" }}>
        <textarea
          spellCheck="false"
          rows="30"
          cols="63"
          value={content}
          onChange={onChangeContent}
        ></textarea>
      </div>
      <Tree entities={siProps} editable={true} />
    </>
  );
}

export default EditConfig;
