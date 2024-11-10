import { openDB } from 'idb';

const DATABASE_NAME = 'FileDatabase';
const OBJECT_STORE_NAME = 'files';

export async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const saveFile = async (file) => {
    const db = await openDB('file-storage', 1, {
      upgrade(db) {
        db.createObjectStore('files', { keyPath: 'name' });
      },
    });
    await db.put('files', { name: file.name, content: file });
  };

export async function getAllFiles() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
    const request = objectStore.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteFileById(fileId) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
    const request = objectStore.delete(fileId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}


  
  export const getFileContent = async (fileName) => {
    const db = await openDB('file-storage', 1);
    const record = await db.get('files', fileName);
    return record ? record.content : null;
  };