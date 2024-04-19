export const staticPathTimeout = (ms) => new Promise((resolve, reject) => 
setTimeout(() => reject(new Error('Request timed out')), ms)
);
