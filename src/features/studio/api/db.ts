import { openDB, type IDBPDatabase } from 'idb'

const DB_NAME = 'portofolio-kilat'
const DB_VERSION = 2

export const DRAFTS_STORE = 'drafts'
export const IMAGES_STORE = 'images'

let dbPromise: Promise<IDBPDatabase> | undefined

export function getDb() {
  dbPromise ??= openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(DRAFTS_STORE)) {
        db.createObjectStore(DRAFTS_STORE)
      }
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE)
      }
    },
  })
  return dbPromise
}
