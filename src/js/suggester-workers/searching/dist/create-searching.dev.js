"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWorkerCompatible = isWorkerCompatible;
exports["default"] = void 0;

var _createWorker = require("../create-worker");

var WORKER_PATH = process.env.LUNATIC_SEARCH_WORKER_PATH || process.env.REACT_APP_LUNATIC_SEARCH_WORKER_PATH;

function isWorkerCompatible() {
  if (window.Worker) {
    return true;
  }

  return false;
}

var searching = function searching(worker) {
  return function (search, _ref) {
    var name = _ref.name,
        version = _ref.version,
        meloto = _ref.meloto;

    if (!WORKER_PATH) {
      throw new Error("Worker path is required for suggester's searches.");
    }

    if (isWorkerCompatible()) {
      return new Promise(function (resolve) {
        try {
          if (worker) {
            worker.terminate();
          }

          worker = (0, _createWorker.createWorker)(WORKER_PATH);
          worker.postMessage({
            search: search,
            name: name,
            version: version,
            meloto: meloto
          });
          worker.addEventListener("message", function (e) {
            var data = e.data;
            resolve(data);
            worker.terminate();
            worker = undefined;
          });
        } catch (e) {//TODO
        }
      });
    } else {// TODO
      }
  };
};

function createSearching(_ref2) {
  var name = _ref2.name,
      version = _ref2.version,
      _ref2$meloto = _ref2.meloto,
      meloto = _ref2$meloto === void 0 ? true : _ref2$meloto;
  var worker = undefined;
  var searching_ = searching(worker);
  return function _callee(search) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", searching_(search, {
              name: name,
              version: version,
              meloto: meloto
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}

var _default = createSearching;
exports["default"] = _default;