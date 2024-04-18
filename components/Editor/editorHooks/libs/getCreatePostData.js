import {
  getTitle,
  getCoverImage,
  getContent,
  getLegacyFeaturedImage,
  uid,
} from "./helpers/editorDataFormatter";

export const getCreatePostData = ({
  editor,
  forReview,
  postStatus,
  postObject,
  user
}) => {
  const html = editor.getHTML();
  const json = editor.getJSON()?.content;

  const title = getTitle({ editor });
  const content = getContent({ html, title });
  const coverImage = getCoverImage({ postObject, json });
  // don't bother creating seo data before publishing
  // const seo = getSeoData({ postObject, title, excerpt, coverImage });
  const legacyFeaturedImage = getLegacyFeaturedImage({ coverImage });

  //create post slug - just use a unique id and the date
  const slug = uuidv4();
  `${uuidv4()}---${uid()}`;

  let entry = {
    type: "article",
    legacyFeaturedImage: {},
    status: forReview ? "pending" : postStatus ? postStatus : "draft",
    title: title,
    content: content,
    legacyFeaturedImage: legacyFeaturedImage,
    seo: seo,
    esES: false,
    slug: slug, //slug is always the same when editing a draft
    date: new Date(),
    user: user?.profile?.id,
  };

  //change the date on save only if postStatus==draft or postStatus==pending publish
  if (postObject?.status !== "publish") {
    entry.date = new Date();
  }

  return {
    entry,
  };
};
