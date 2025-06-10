// src/services/indexedDBService.js

const DB_NAME = 'ClapiWebShopDB'; // Nombre de nuestra base de datos
const DB_VERSION = 1; // Versión de la base de datos
const CART_STORE_NAME = 'cart'; // Nombre del Object Store para el carrito
const ORDERS_STORE_NAME = 'orders'; // Nombre del Object Store para los pedidos (lo usaremos más adelante)

let db; // Variable para almacenar la instancia de la base de datos

/**
 * Abre la base de datos IndexedDB. Si no existe, la crea y define los Object Stores.
 * @returns {Promise<IDBDatabase>} Una promesa que resuelve con la instancia de la base de datos.
 */
export const openDB = () => {
  return new Promise((resolve, reject) => {
    // Abrir la base de datos, o crearla si no existe
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Este evento se dispara si la versión de la base de datos cambia
    // o si la base de datos se crea por primera vez.
    request.onupgradeneeded = (event) => {
      db = event.target.result; // Obtener la instancia de la DB
      // Crear el Object Store 'cart' si no existe
      if (!db.objectStoreNames.contains(CART_STORE_NAME)) {
        db.createObjectStore(CART_STORE_NAME, { keyPath: 'id' }); // 'id' será la clave primaria
      }
      // Crear el Object Store 'orders' si no existe (para futuros pedidos/facturas)
      if (!db.objectStoreNames.contains(ORDERS_STORE_NAME)) {
        db.createObjectStore(ORDERS_STORE_NAME, { keyPath: 'id', autoIncrement: true }); // 'id' autoincremental para pedidos
      }
    };

    // Si la apertura de la base de datos es exitosa
    request.onsuccess = (event) => {
      db = event.target.result;
      console.log('IndexedDB abierto correctamente.');
      resolve(db);
    };

    // Si ocurre un error al abrir la base de datos
    request.onerror = (event) => {
      console.error('Error al abrir IndexedDB:', event.target.error);
      reject(event.target.error);
    };
  });
};

/**
 * Obtiene un Object Store específico para realizar operaciones.
 * @param {string} storeName - El nombre del Object Store ('cart', 'orders', etc.).
 * @param {string} mode - El modo de la transacción ('readonly' o 'readwrite').
 * @returns {IDBObjectStore} El Object Store para la transacción.
 */
const getObjectStore = (storeName, mode) => {
  // Crea una transacción en la base de datos
  const transaction = db.transaction(storeName, mode);
  // Retorna el Object Store de esa transacción
  return transaction.objectStore(storeName);
};

/**
 * Añade o actualiza un ítem en un Object Store.
 * Si el ítem ya existe (basado en su keyPath), lo actualiza.
 * @param {string} storeName - Nombre del Object Store.
 * @param {object} item - El ítem a añadir/actualizar. Debe tener una propiedad 'id'.
 * @returns {Promise<void>}
 */
export const putItem = (storeName, item) => {
  return new Promise(async (resolve, reject) => {
    // Asegurarse de que la DB esté abierta antes de cualquier operación
    if (!db) {
      db = await openDB();
    }
    const store = getObjectStore(storeName, 'readwrite');
    const request = store.put(item); // .put() tanto añade como actualiza

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Obtiene un ítem de un Object Store por su clave (id).
 * @param {string} storeName - Nombre del Object Store.
 * @param {any} key - La clave (id) del ítem a obtener.
 * @returns {Promise<object | undefined>} El ítem o `undefined` si no se encuentra.
 */
export const getItem = (storeName, key) => {
  return new Promise(async (resolve, reject) => {
    if (!db) {
      db = await openDB();
    }
    const store = getObjectStore(storeName, 'readonly');
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Obtiene todos los ítems de un Object Store.
 * @param {string} storeName - Nombre del Object Store.
 * @returns {Promise<Array<object>>} Un array con todos los ítems.
 */
export const getAllItems = (storeName) => {
  return new Promise(async (resolve, reject) => {
    if (!db) {
      db = await openDB();
    }
    const store = getObjectStore(storeName, 'readonly');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Elimina un ítem de un Object Store por su clave (id).
 * @param {string} storeName - Nombre del Object Store.
 * @param {any} key - La clave (id) del ítem a eliminar.
 * @returns {Promise<void>}
 */
export const deleteItem = (storeName, key) => {
  return new Promise(async (resolve, reject) => {
    if (!db) {
      db = await openDB();
    }
    const store = getObjectStore(storeName, 'readwrite');
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Limpia todos los ítems de un Object Store.
 * @param {string} storeName - Nombre del Object Store.
 * @returns {Promise<void>}
 */
export const clearStore = (storeName) => {
  return new Promise(async (resolve, reject) => {
    if (!db) {
      db = await openDB();
    }
    const store = getObjectStore(storeName, 'readwrite');
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
};

// Exportar los nombres de los stores para fácil acceso desde otros módulos
export { CART_STORE_NAME, ORDERS_STORE_NAME };