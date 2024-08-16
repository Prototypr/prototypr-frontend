export const DB_NAME = 'DemoTyprDB';
// export const DB_VERSION = 1;
export const STORE_NAME = 'posts';

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      // Check if the object store exists, if not, close and reopen with a new version
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const currentVersion = db.version;
        db.close();
        const reopenRequest = indexedDB.open(DB_NAME, currentVersion + 1);
        reopenRequest.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        };
        reopenRequest.onsuccess = (event) => {
          resolve(event.target.result);
        };
        reopenRequest.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        resolve(db);
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const savePost = async (post, id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Add the id to the post object if provided
    if (id !== undefined) {
      post.id = id;
    }

    const request = store.put(post); // Use put instead of add

    request.onsuccess = async () => {
      try {
        const savedPost = await loadPostById(request.result);
        resolve(savedPost);
      } catch (error) {
        reject(error);
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const loadPosts = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const createPost = async (post) => {
  return savePost(post);
};

export const loadPostById = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);


    request.onsuccess = () => {
        resolve(request.result);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};