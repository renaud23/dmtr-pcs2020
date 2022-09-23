import insertEntity from "../idb-tools/insert-entity";
import clearStoreInfo from "./clear-store-info";
import CONSTANTES from "./constantes";

async function updateStoreInfo(db, info) {
  await clearStoreInfo(db);
  await insertEntity(db, CONSTANTES.STORE_INFO_NAME, info);
}

export default updateStoreInfo;
