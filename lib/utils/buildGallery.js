import { blurHashToDataURL } from "./blurHashToDataURL";

const defaultBase64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAA`

const buildToolboxGallery = ({ item, featuredImage }) => {
  let PHOTO_SET = [];
  // new gallry
  if (item && item.attributes.gallery?.data?.length) {
    item.attributes.gallery.data.forEach((galleryItem, index) => {
      let base64 = defaultBase64
      if (galleryItem?.attributes?.blurhash) {
        //create base64 image
        try{
          base64 = blurHashToDataURL(galleryItem.attributes?.blurhash);
        }catch(e){
          base64 = defaultBase64
        }
      }

      galleryItem.medium = galleryItem.attributes.url.replace(
        "https://prototypr-media.sfo2.digitaloceanspaces.com",
        "https://prototyprio.gumlet.io"
      );
      PHOTO_SET.push({
        base64: base64,
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
        let base64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARCAgwWEOSWBnYbKggAAAABJRU5ErkJggg==`;

        PHOTO_SET.push({
          base64: base64,
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

  //base64 for logo
  let base64 = defaultBase64;
  if(tool.logo?.data?.attributes?.blurhash){
    try{
      base64 = blurHashToDataURL(tool.logo.data.attributes.blurhash);
    }catch(e){
      base64 = defaultBase64;
    }
  }

  return {logo, base64};
};

export const getToolboxFeaturedImage = ({ post, logo,logoBase64, gallery }) => {
  const tool = post.attributes;

  let featuredImage = 
  tool.featuredImage?.data?.attributes?.url?tool.featuredImage?.data?.attributes?.url:  
  tool.legacyFeaturedImage?.mediaItemUrl
    ? tool.legacyFeaturedImage?.mediaItemUrl
    : gallery?.length
      ? gallery[0].original
      : logo;

  let featuredImageObject = 
  tool.featuredImage?.data?.attributes?tool.featuredImage?.data?.attributes:
  tool.legacyFeaturedImage
    ? tool.legacyFeaturedImage
    : gallery?.length
      ? gallery[0]
      : logo;

  
  let base64 = defaultBase64;
  // console.log('featuredImageObject',featuredImageObject?.blurhash)
  if(featuredImageObject?.blurhash){
    try{
      base64 = blurHashToDataURL(featuredImageObject.blurhash);
    }catch(e){
      base64 = defaultBase64;
    }
  }
  if(featuredImage==logo && logoBase64){
    base64 = logoBase64;
  }

  return { featuredImage, base64 };
};
