import React from 'react'
// Custom deep merge function
export function customDeepMerge(target, source) {
  if (typeof source !== "object" || source === null) {
    return source;
  }

  const output = Array.isArray(target) ? [...target] : { ...target };

  if (Array.isArray(target) && Array.isArray(source)) {
    return [...source];
  }

  Object.keys(source).forEach(key => {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === "object" &&
        !React.isValidElement(source[key]) &&
        key in target &&
        typeof target[key] === "object"
      ) {
        output[key] = customDeepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  });

  return output;
}