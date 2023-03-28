"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createWorker = require("../create-worker");

var workerPath = process.env.LUNATIC_LOADER_WORKER_PATH || process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH || "workers/lunatic-loader-worker-0.1.0.js";
/**
 * Only with Worker
 */

function task(info, version) {
  var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return null;
  };
  var name = info.name,
      fields = info.fields,
      stopWords = info.stopWords;
  var worker = (0, _createWorker.createWorker)(workerPath);
  var start = false;
  var stop = false;

  function launch(entities) {
    var post = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return null;
    };
    return new Promise(function (resolve) {
      start = true;
      worker.addEventListener("message", function (e) {
        var data = e.data;

        if (data === "success") {
          if (!stop) {
            post();
          }

          resolve(data);
        } else {
          log(data);
        }
      });
      worker.postMessage({
        name: name,
        version: version,
        fields: fields,
        stopWords: stopWords,
        entities: entities
      });
    });
  }

  function terminate() {
    if (start) {
      stop = true;
      worker.terminate();
    }
  }

  return [launch, terminate];
}

var _default = task;
exports["default"] = _default;