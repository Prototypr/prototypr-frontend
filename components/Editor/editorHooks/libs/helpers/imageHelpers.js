export function generateImageTypes(url) {
  const breakpoints = [
    { w: 300, h: 131 },
    { w: 768, h: 336 },
    { w: 1024, h: 448 },
    { w: 1400, h: 600 },
  ];
  const splitString = url?.split(".");
  const extention = splitString[splitString.length - 1];
  const mediaURL = splitString.slice(0, -1).join(".");

  const urls = breakpoints.map(
    breakpoint =>
      `${mediaURL}-${breakpoint?.w}x${breakpoint?.h}.${extention} ${breakpoint.w}w`
  );
  return urls.join(",");
}

export function getImageExtention(url) {
  const splitString = url.split(".");
  const extention = splitString[splitString.length - 1];

  return extention;
}
