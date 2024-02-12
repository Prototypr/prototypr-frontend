import { JSDOM } from 'jsdom';

const removeFirstImageIfMatch = (htmlString, imageUrlToMatch) => {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  // Parse the imageUrlToMatch to ignore query strings
  const targetUrl = new dom.window.URL(imageUrlToMatch, 'http://example.com'); // Base URL for relative URLs

  // Get all image elements
  const images = document.querySelectorAll('img');

  if (images.length > 0) {
    // Create a URL object from the first image's src for comparison
    const firstImageUrl = new dom.window.URL(images[0].src, 'http://example.com'); // Same base URL for comparison

    // Check if the first image matches the given URL without the query string
    if (
      firstImageUrl.origin === targetUrl.origin &&
      firstImageUrl.pathname === targetUrl.pathname &&
      images[0] === images[0].parentNode.firstChild
    ) {
      // Determine if the image is within a <figure> element
      let parentElement = images[0].parentNode;
      while (parentElement && parentElement !== document.body) {
        if (parentElement.tagName.toLowerCase() === 'figure') {
          // If the parent <figure> is found, remove the <figure> element
          parentElement.parentNode.removeChild(parentElement);
          break;
        } else if (parentElement.parentNode) {
          // Move up the DOM tree if no <figure> is found immediately
          parentElement = parentElement.parentNode;
        } else {
          // If the image is not within a <figure>, remove just the image
          images[0].parentNode.removeChild(images[0]);
          break;
        }
      }
    }
  }

  // Serialize the DOM back to a string and return it
  return dom.serialize();
};


export default removeFirstImageIfMatch
