import {
  getTitle,
  getExcerpt,
  getCoverImage,
  getContent,
  getSeoData,
  getLegacyFeaturedImage,
} from "./helpers/editorDataFormatter";

export const getEditPostData = ({
  editor,
  forReview,
  postStatus,
  postObject,
}) => {
  const html = editor.getHTML();
  const json = editor.getJSON()?.content;

  const title = getTitle({ editor });
  const content = getContent({ html, title });
  const excerpt = getExcerpt({ json, postObject });
  const coverImage = getCoverImage({ postObject, json });
  const seo = getSeoData({ postObject, title, excerpt, coverImage });
  const legacyFeaturedImage = getLegacyFeaturedImage({ coverImage });

  let entry = {
    type: "article",
    status: forReview ? "pending" : postStatus ? postStatus : "draft",
    title: title,
    content: content,
    esES: false,
    // slug: slug, //slug is always the same when editing a draft - so we don't need to update it
  };

  //change the date on save only if postStatus==draft or postStatus==pending publish
  if (postObject?.status !== "publish") {
    entry.date = new Date();
  }

  if(forReview || postStatus=="publish"){
    //only save seo and excerpt if it's for review - then it'll be the latest data
    entry.seo = seo;
    entry.excerpt = excerpt;
    entry.legacyFeaturedImage=legacyFeaturedImage;
  }

  return {
    entry
  };
};
