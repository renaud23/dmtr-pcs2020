import { useState, useCallback, useEffect, useRef } from "react";
//
function DataLoad({ setData }) {
  const [content, setContent] = useState(undefined);
  //   const [data, setData] = useState(undefined);

  const textareaEl = useRef();

  const appendLog = useCallback(
    function (message, type = "INFO") {
      const { current } = textareaEl;
      if (current) {
        current.value = `${current.value}${type}> ${message}\n`;
      }
    },
    [textareaEl]
  );

  useEffect(
    function () {
      try {
        if (content) {
          const jsonified = JSON.parse(content);

          if (Array.isArray(jsonified)) {
            const { length } = jsonified;
            appendLog(`${length} entités chargées`);

            jsonified.forEach(function (e, i) {
              const { id } = e;
              if (id === null || id === undefined) {
                appendLog(
                  `l'entité ${i + 1} n'a pas d'identifiant.\n${JSON.stringify(
                    e,
                    null,
                    2
                  )}`,
                  "ERROR"
                );
              }
              setData(jsonified);
            });
          } else {
            appendLog(
              "Les données doivent être dans un tableau : [/*content*/]",
              "ERROR"
            );
          }
        }
      } catch (e) {}
    },
    [content, appendLog, setData]
  );

  const changeFile = useCallback(function (input) {
    const files = input.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (res) => {
        setContent(res.target.result); // Print file contents
      };
      reader.onerror = (err) => console.log(err);

      reader.readAsText(file);
    }
  }, []);
  return (
    <>
      <input type="file" onChange={changeFile} accept=".json" />
      <div>
        <textarea
          spellCheck="false"
          rows="10"
          cols="63"
          ref={textareaEl}
        ></textarea>
      </div>
    </>
  );
}

export default DataLoad;
