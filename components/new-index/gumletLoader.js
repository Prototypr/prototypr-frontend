const gumletLoader = ({ src, width, quality }) => {
  if(src.indexOf("prototypr-media.sfo2.digitaloceanspaces.com") > -1){
    src = src.replace("prototypr-media.sfo2.digitaloceanspaces.com", "prototyprio.gumlet.io")
    return `${src}?w=${width}&q=${quality || 70}&format=avif&compress=true&dpr=1`;
  }else{
    return `${src}?w=${width}&q=${quality || 70}&format=avif&compress=true&dpr=1`;
  }
};

export default gumletLoader;