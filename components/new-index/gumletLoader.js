const gumletLoader = ({ src, width, quality }) => {
  if(src.indexOf("prototypr-media.sfo2.digitaloceanspaces.com") > -1){
    src = src.replace("prototypr-media.sfo2.digitaloceanspaces.com", "prototyprio.gumlet.io")
    return `${src}?w=${width}&q=${quality || 70}&format=avif&compress=true&dpr=1`;
  }
  // @todo configure wp.prototypr.io for gumlet
  else if(src.indexOf("wp.prototypr.io") > -1){
    src = src.replace("wp.prototypr.io", "prototyprwp.gumlet.io")
    return `${src}?w=${width}&q=${quality || 70}&format=avif&compress=true&dpr=1`;
  }
  else{
    // this &format stuff doesn't actually do anythign:
    return `${src}?w=${width}&q=${quality || 70}&format=avif&compress=true&dpr=1`;
  }
};

export default gumletLoader;