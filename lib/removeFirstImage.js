import { JSDOM } from 'jsdom';

const removeFirstImageIfMatch = (htmlString, imageUrl)=> {
  // Parse the HTML string with jsdom
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  // Get all image elements
  const images = document.querySelectorAll('img');

  // Check if the first image matches the given URL and it's the very first element
  if (images.length > 0 && images[0].src === imageUrl) {
    const firstElementChild = images[0].parentNode.firstChild;
    let isVeryFirstImage = false;

    // Traverse to check if it's the very first element (ignoring text nodes, comments, etc.)
    let currentNode = firstElementChild;
    while (currentNode) {
      if (currentNode.nodeType === dom.window.Node.ELEMENT_NODE) {
        if (currentNode === images[0]) {
          isVeryFirstImage = true;
        }
        break;
      }
      currentNode = currentNode.nextSibling;
    }

    // If it's the very first image, remove it
    if (isVeryFirstImage) {
      images[0].parentNode.removeChild(images[0]);
    }
  }

  // Serialize the DOM back to a string and return it
  return dom.serialize();
}
export default removeFirstImageIfMatch
