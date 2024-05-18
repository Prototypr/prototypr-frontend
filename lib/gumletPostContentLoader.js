import { JSDOM } from "jsdom";

const imageHost = "prototypr-media.sfo2.digitaloceanspaces.com";
const gumletHost = "prototyprio.gumlet.io";

/**
 * replace imageHost with gumletHost
 * used for post content
 * @param {*} htmlString
 * @param {*} imageUrlToMatch
 * @returns
 */
const gumletPostContentLoader = htmlString => {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;
  // Get all image elements
  const images = document.querySelectorAll("img");

  for (let i = 0; i < images.length; i++) {
    //if image src has imageHost, replace it with gumletHost
    if (images[i].src.indexOf(imageHost) > -1) {
      const imgSrc = images[i].src.replace(imageHost, gumletHost);
      //remove src attribute and rely on srcset
      images[i].removeAttribute("src")
      //set to lazy load image
      images[i].setAttribute("loading", "lazy");
      //add srcset
      const srcset = generateSrcset(imgSrc);
      images[i].setAttribute("srcset", srcset);
    }
  }

  // Serialize the DOM back to a string and return it
  return dom.serialize();
};

export default gumletPostContentLoader;

 const generateSrcset = url => {
  const widths = [
    30, 50, 70, 100, 128, 160, 200, 240, 300, 320, 330, 360, 376, 400, 480, 576,
    600, 640, 700, 720, 768, 800, 900, 940, 1000, 1024, 1080, 1100, 1140, 1200,
    1242, 1300, 1400, 1440, 1500, 1536, 1600, 1700, 1800, 1880, 1920, 2000,
    2048, 2100, 2208, 2280, 2400, 2500, 2560, 2600, 2732, 2800, 2880, 1440,
  ];
  return widths.map(width => `${url}?w=${width}&q=75&format=avif&compress=true&dpr=1 ${width}w`).join(",");
};
export { generateSrcset };