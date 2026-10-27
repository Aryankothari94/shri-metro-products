/**
 * Permanent dual-layer browser persistence engine.
 * Automatically saves state to both localStorage and IndexedDB.
 * Ensures custom product photos and attributes are saved permanently
 * without hitting localStorage quotas or losing changes on refresh.
 */

const DB_NAME = 'smp_database_v1';
const DB_VERSION = 1;
const STORE_NAME = 'app_data';

// Open or create IndexedDB
function getDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.warn('IndexedDB unavailable, falling back to localStorage only');
      resolve(null);
    };
  });
}

/**
 * Save data permanently to localStorage and IndexedDB
 */
export async function persistData(key, data) {
  // 1. Save to localStorage (with quota safety check)
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn(`localStorage quota warning on key "${key}", backing up directly to IndexedDB`, err);
  }

  // 2. Save to IndexedDB
  try {
    const db = await getDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(data, key);
    }
  } catch (err) {
    console.error('Failed to persist to IndexedDB:', err);
  }

  // 3. Broadcast to other tabs/windows if BroadcastChannel is supported.
  // Note: BroadcastChannel NEVER delivers messages to the sender tab, preventing infinite loops.
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('smp_cross_tab_sync');
      channel.postMessage({ key, data });
      channel.close();
    }
  } catch {
    // Ignore in non-browser or unsupported environments
  }
}

/**
 * Retrieve data asynchronously from IndexedDB if localStorage was cleared
 */
export async function retrieveIndexedDBData(key) {
  try {
    const db = await getDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}
