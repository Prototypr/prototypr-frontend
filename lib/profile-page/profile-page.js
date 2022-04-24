const hash = require("string-hash");
const color = require("tinycolor2");

const LightenDarkenColor = (colorCode, amount) => {
  var usePound = false;

  if (colorCode[0] == "#") {
    colorCode = colorCode.slice(1);
    usePound = true;
  }

  var num = parseInt(colorCode, 16);

  var r = (num >> 16) + amount;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  var b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  var g = (num & 0x0000ff) + amount;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

export const gradient = (uid, type = "horizontal") => {
  if (uid) {
    const n = hash(uid);
    const c1 = color({ h: n % 285, s: 0.44, l: 0.55 });
    var c1_ = c1.toHexString();
    const c2 = LightenDarkenColor(c1_, 55);

    c1_ = LightenDarkenColor(c1_, 40);

    switch (type) {
      case "diagonal":
        return `linear-gradient(to top right, ${c1_}, ${c2})`;

      case "radial":
        return `radial-gradient(circle, ${c1_}, ${c2})`;

      case "horizontal":
        return `linear-gradient(${c1_}, ${c2})`;

      case "vertical":
        return `linear-gradient(to right, ${c1_}, ${c2})`;

      default:
        return `linear-gradient(to top right, ${c1_}, ${c2})`;
    }
  }
  throw new TypeError("uid is required");
};

export const getTwitterHandle = (string) => {
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  if(!string){
    return false
  }
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("twitter.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
};

export const getDribbbleHandle = (string) => {
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  if(!string){
    return false
  }
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("dribbble.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
};

export const getGithubHandle = (string) => {
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  if(!string){
    return false
  }
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("github.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
};

export const getKofiName = (string) => {
  if(!string){
    return false
  }
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("ko-fi.com", "");
  result = result.replace("kofi.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
};
