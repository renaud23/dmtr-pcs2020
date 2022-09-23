export const createWorker = (workerUrl) => {
  return new Worker(`${workerUrl}`);
};
