// https://docs.gumlet.com/docs/image-integration-nextjs
export default function gumletLoader({ src, width, quality }) {
  // https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/e6e7ea22143ac63cef4c1572e26c1cdfpng
  // https://prototyprio.gumlet.io/strapi/e6e7ea22143ac63cef4c1572e26c1cdfpng
  if (src.includes("prototypr-media.sfo2.digitaloceanspaces.com")) {
    let parsedUrl = new URL(src);
    parsedUrl.hostname = "prototyprio.gumlet.io";
    parsedUrl.searchParams.set("w", width);
    parsedUrl.searchParams.set("q", quality || 80);

    return parsedUrl.toString();
  } else {
    return `${src}?w=${width}&q=${quality || 80}`;
  }
}
