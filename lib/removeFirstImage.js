import { JSDOM } from 'jsdom';

const removeFirstImageIfMatch = (htmlString, imageUrlToMatch) => {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;
  // Get all image elements
  const images = document.querySelectorAll('img');

  for (let i = 0; i < images.length; i++) {
    const imageSrcWithoutQuery = images[i].src.split('?')[0];
    const imageUrlToMatchWithoutQuery = imageUrlToMatch.split('?')[0];

    // Check if the image src matches the given URL, ignoring query strings
    if (imageSrcWithoutQuery === imageUrlToMatchWithoutQuery) {
      // Check if the image is the very first element or if its parent is a figure
      let parent = images[i].parentNode;
      let removeTarget = images[i];

      // Traverse up to find if there's a figure element parent
      while (parent && parent !== document.body) {
        if (parent.tagName.toLowerCase() === 'figure') {
          removeTarget = parent;
          break;
        } else if (parent.parentNode) {
          // If parent is not <figure>, continue moving up the DOM tree
          parent = parent.parentNode;
        } else {
          // If reached the top without finding a <figure>, remove the image itself
          break;
        }
      }

      // Remove the determined target (either the image or its parent <figure>)
      removeTarget.parentNode.removeChild(removeTarget);
      break; // Stop after removing the first matching image or its <figure>
    }
  }

  // Serialize the DOM back to a string and return it
  return dom.serialize();
};



export default removeFirstImageIfMatch
