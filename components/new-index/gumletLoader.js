const gumletLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 70}&format=avif&compress=true&dpr=1`
  }

  export default gumletLoader