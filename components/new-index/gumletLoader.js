const gumletLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}&format=auto&compress=true`
  }

  export default gumletLoader