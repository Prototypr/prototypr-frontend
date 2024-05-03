import { getPlaiceholder } from "plaiceholder";

const buildToolboxGallery = async ({ item, featuredImage }) => {
  let PHOTO_SET = [];
  // new gallry
  if (item && item.attributes.gallery?.data?.length) {
    for (var x = 0; x < item.attributes.gallery.data?.length; x++) {
      const galleryItem = item.attributes.gallery.data[x];
      const base64 = await createBase64(galleryItem.attributes.url);

      galleryItem.medium = galleryItem.attributes.url.replace(
        "https://prototypr-media.sfo2.digitaloceanspaces.com",
        "https://prototyprio.gumlet.io"
      );

      PHOTO_SET.push({
        base64,
        thumbnail:
          galleryItem.attributes.url.indexOf("https://") == -1
            ? "https://prototypr.gumlet.com" + galleryItem.attributes.url
            : galleryItem.attributes.url,
        original:
          galleryItem.attributes.url.indexOf("https://") == -1
            ? "https://prototypr.gumlet.com" + galleryItem.attributes.url
            : galleryItem.attributes.url,
        originalAlt: galleryItem.attributes.alternativeText
          ? galleryItem.attributes.alternativeText
          : "Screenshot of product",
        thumbnailAlt: galleryItem.attributes.alternativeText
          ? galleryItem.attributes.alternativeText
          : "Screenshot of product",
        type: "image",
        // srcSet: galleryItem.srcSet,
        // sizes: galleryItem.sizes?galleryItem.sizes:{},
      });
    }
  }

  // legacy gallery
  else if (item && item.attributes.legacyMedia) {
    if (
      item.attributes.legacyMedia.gallery &&
      item.attributes.legacyMedia.gallery.length
    ) {
      for (var x = 0; x < item.attributes.legacyMedia?.gallery?.length; x++) {
        const galleryItem = item.attributes.legacyMedia.gallery[x];
        const base64 = await createBase64(galleryItem.medium);
        //make nextjs preload the gumlet image
        galleryItem.medium = galleryItem.medium.replace(
          "https://prototypr-media.sfo2.digitaloceanspaces.com",
          "https://prototyprio.gumlet.io"
        );
        PHOTO_SET.push({
          base64,
          thumbnail:
            galleryItem.thumb.indexOf("https://") == -1
              ? "https://prototypr.gumlet.com" + galleryItem.thumb
              : galleryItem.thumb,
          original:
            galleryItem.medium.indexOf("https://") == -1
              ? "https://prototypr.gumlet.com" + galleryItem.medium
              : galleryItem.medium,
          originalAlt: "Screenshot of product",
          thumbnailAlt: "Smaller procut screenshot thumbnail",
          type: "image",
          // srcSet: galleryItem.srcSet,
          // sizes: galleryItem.sizes?galleryItem.sizes:{},
        });

      }
    }
  }

  //if there is no gallery, add a default image
  else {
    const base64 = await createBase64(featuredImage);
    PHOTO_SET.push({
      base64,
      thumbnail: featuredImage
        ? featuredImage
        : "https://prototypr.gumlet.com/https://prototypr-media.sfo2.digitaloceanspaces.com/uploads/2021/04/Screen-Shot-2021-04-30-at-4.37.37-PM.png",
      original: featuredImage
        ? featuredImage
        : "https://prototypr.gumlet.com/https://prototypr-media.sfo2.digitaloceanspaces.com/uploads/2021/04/Screen-Shot-2021-04-30-at-4.37.37-PM.png",
      originalAlt: "Screenshot of product",
      thumbnailAlt: "Smaller procut screenshot thumbnail",
      type: "image",
    });
  }

  return PHOTO_SET;
};
export default buildToolboxGallery;

export const getToolboxLogo = ({ post }) => {
  const tool = post.attributes;
  let logo = tool.logo?.data?.attributes?.url
    ? tool.logo.data.attributes.url
    : tool.legacyFeaturedImage?.logoNew ||
      tool?.legacyMedia?.logoNew ||
      tool.legacyFeaturedImage?.mediaItemUrl ||
      tool.legacyMedia?.mediaItemUrl;
  if (!logo) {
    logo =
      // tool.legacyMedia?.logoNew?tool.legacyMedia?.logoNew:
      // tool.legacyMedia?.mediaItemUrl?tool.legacyMedia?.mediaItemUrl:
      // tool.legacyMedia?.imgUrl?tool.legacyMedia?.imgUrl:
      tool.featuredImage?.data?.attributes?.url
        ? tool.featuredImage.data.attributes.url
        : tool.legacyFeaturedImage
          ? tool.legacyFeaturedImage
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  }

  return logo;
};

export const getToolboxFeaturedImage = async ({ post, logo, gallery }) => {
  const tool = post.attributes;

  let featuredImage = tool.legacyFeaturedImage?.mediaItemUrl
    ? tool.legacyFeaturedImage?.mediaItemUrl
    : gallery?.length
      ? gallery[0].original
      : logo;

  /**
   * get hero as buffer
   */

  let base64 = await createBase64(featuredImage);

  return { featuredImage, base64 };
};

const createBase64 = async imageUrl => {
  let buffer = null;
  try {
    buffer = await fetch(imageUrl).then(async res => {
      return Buffer.from(await res.arrayBuffer());
    });
  } catch (e) {
    console.log("error fetching image");
  }

  if (!buffer) {
    try {
      buffer = await fetch(
        "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=600&q=80"
      ).then(async res => {
        return Buffer.from(await res.arrayBuffer());
      });
    } catch (e) {
      console.log("error fetching image");
    }
  }

  let base64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARCAgwWEOSWBnYbKggAAAABJRU5ErkJggg==";
  if (buffer) {
    try {
      let plaiceholdr = await getPlaiceholder(buffer, { size: 10 });
      base64 = plaiceholdr.base64;
    } catch (e) {
      console.log("error getting plaiceholdr");
    }
  }

  return base64;
};
