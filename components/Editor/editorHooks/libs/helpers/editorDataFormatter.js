import { generateImageTypes, getImageExtention } from "./imageHelpers";

/**
 * getTitle
 * gets first h1 from the editor
 * @param {*} param0
 * @returns
 */
export const getTitle = ({ editor }) => {
  let docNode = editor?.view?.state?.doc;
  let title = "";
  docNode.descendants((node, pos) => {
    if (title) {
      return false;
    }
    if (node.type.name == "heading" && node.attrs.level == 1) {
      title = node.textContent;
      return false;
    }
  });
  if (!title) {
    title = "Untitled post";
  }

  return title;
};

/**
 * getExcerpt
 * gets first paragraph from the editor
 * or uses the postObject excerpt if it exists
 * @param {*} param0
 * @returns
 */
export const getExcerpt = ({ json, postObject }) => {
  //if excerpt exists, don't overwrite it
  if (postObject?.excerpt) {
    return postObject.excerpt;
  }
  //use the first paragraph as the excerpt
  const firstParagraph = json
    .find(p => p?.type === "paragraph")
    ?.content?.find(x => x.type === "text")?.text;

  return firstParagraph;
};

/**
 * getContent
 * content always changes, so we need to get the latest content
 * if the title is in the content, remove it
 * @param {*} param0
 * @returns
 */
export const getContent = ({ html, title }) => {
  let content = html;

  //remove title from content body
  let div = document.createElement("div");
  div.innerHTML = html;

  let headings = div.querySelectorAll("h1");
  for (var x = 0; x < headings.length; x++) {
    // if title is found, remove it
    if (headings[x].innerText == title) {
      headings[x].remove();
      break;
    }
  }

  //if content minus the title is less than 5 characters, use it for the content
  if (div?.innerHTML && div.innerHTML.length > 5) {
    content = div?.innerHTML;
  }

  return content;
};

/**
 * getCoverImage
 * use the featured image if it exists
 * or use the first figure in the editor
 * @param {*} param0
 * @returns
 */
export const getCoverImage = ({ postObject, json }) => {
  if (postObject?.featuredImage) {
    return postObject.featuredImage;
  } else {
    json.find(p => p?.type === "figure")?.attrs?.src;
  }
};

/**
 * getSEOData
 * if there's no seo data, create a new one
 * or return the existing seo data with missing fields filled in
 *
 * @param {*} param0
 */
export const getSeoData = ({ postObject, title, excerpt, coverImage }) => {
  let seo = postObject?.seo ? postObject.seo : null;

  if (!seo) {
    //seo is empty, so create all as new
    seo = {
      metaDesc: excerpt,
      opengraphDescription: excerpt,
      twitterDescription: excerpt,
      opengraphTitle: title,
      twitterTitle: title,
      opengraphImage: coverImage,
      twitterImage: coverImage,
    };
  } else {
    //fill in missing fields
    seo = {
      ...seo,
      metaDesc: seo.metaDesc || excerpt,
      opengraphDescription: seo.opengraphDescription || excerpt,
      twitterDescription: seo.twitterDescription || excerpt,
      opengraphTitle: seo.opengraphTitle || title,
      twitterTitle: seo.twitterTitle || title,
      opengraphImage: seo.opengraphImage || coverImage,
      twitterImage: seo.twitterImage || coverImage,
    };
  }

  return seo;
};

/**
 * getLegacyFeaturedImage
 * this is used somewhere
 * @param {*} param0
 */
export const getLegacyFeaturedImage = ({ coverImage }) => {
  //always update to new cover image
  const legacyFeaturedImage = {
    mediaItemUrl: coverImage || "",
    srcSet: generateImageTypes(coverImage || ""),
    thumb: `${coverImage}-150x150.${getImageExtention(coverImage || "")}`,
    medium: `${coverImage}-768x336.${getImageExtention(coverImage || "")}`,
  };
  return legacyFeaturedImage;
};

export const getPostDate = ({postObject}) =>{
  //if post is not publish status,
  if(postObject?.status!=="publish"){
    return new Date();
  }else{
    return postObject?.date
  }

}

export const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};