const buildToolboxGallery = ({ item, PHOTO_SET, featuredImage }) => {
  // new gallry
  if (item && item.attributes.gallery?.data?.length) {
    item.attributes.gallery.data.forEach((galleryItem, index) => {
      galleryItem.medium = galleryItem.attributes.url.replace(
        "https://prototypr-media.sfo2.digitaloceanspaces.com",
        "https://prototyprio.gumlet.io"
      );
      PHOTO_SET.push({
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
    });
  }

  // legacy gallery
  else if (item && item.attributes.legacyMedia) {
    if (
      item.attributes.legacyMedia.gallery &&
      item.attributes.legacyMedia.gallery.length
    ) {
      item.attributes.legacyMedia?.gallery.forEach((galleryItem, index) => {
        //make nextjs preload the gumlet image
        galleryItem.medium = galleryItem.medium.replace(
          "https://prototypr-media.sfo2.digitaloceanspaces.com",
          "https://prototyprio.gumlet.io"
        );
        PHOTO_SET.push({
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
      });
    }
  }

  //if there is no gallery, add a default image
  if (!PHOTO_SET.length) {
    PHOTO_SET.push({
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

  console.log(tool);

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

export const getToolboxFeaturedImage = ({ post, logo, gallery }) => {
  const tool = post.attributes;

  let featuredImage = tool.legacyFeaturedImage?.mediaItemUrl
    ? tool.legacyFeaturedImage?.mediaItemUrl
    : gallery?.length
      ? gallery[0].original
      : logo;

  return featuredImage;
};
