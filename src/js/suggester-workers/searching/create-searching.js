import { createWorker } from "../create-worker";

const WORKER_PATH =
  process.env.LUNATIC_SEARCH_WORKER_PATH ||
  process.env.REACT_APP_LUNATIC_SEARCH_WORKER_PATH;

export function isWorkerCompatible() {
  if (window.Worker) {
    return true;
  }
  return false;
}

const searching =
  (worker) =>
  (search, { name, version, meloto }) => {
    if (!WORKER_PATH) {
      throw new Error("Worker path is required for suggester's searches.");
    }
    if (isWorkerCompatible()) {
      return new Promise(function (resolve) {
        try {
          if (worker) {
            worker.terminate();
          }
          worker = createWorker(WORKER_PATH);
          worker.postMessage({ search, name, version, meloto });
          worker.addEventListener("message", function (e) {
            const { data } = e;
            resolve(data);
            worker.terminate();
            worker = undefined;
          });
        } catch (e) {
          //TODO
        }
      });
    } else {
      // TODO
    }
  };

function createSearching({ name, version, meloto = true }) {
  let worker = undefined;
  const searching_ = searching(worker);
  return async function (search) {
    return searching_(search, { name, version, meloto });
  };
}

export default createSearching;
