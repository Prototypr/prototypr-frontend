const slugify = require("slugify");
import { getTitle, getExcerpt } from "./helpers/editorDataFormatter";
import { generateImageTypes, getImageExtention } from "./helpers/imageHelpers";

export const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getPostDetails = ({
  user,
  editor,
  slug,
  forReview,
  postStatus,
  isCreate,
  postObject,
}) => {
  const html = editor.getHTML();
  const json = editor.getJSON()?.content;

  const title = getTitle({ editor });

  const excerpt = getExcerpt({ json });

  const coverImage = json.find(p => p?.type === "figure")?.attrs?.src;


  //remove title from content body
  let div = document.createElement("div");
  div.innerHTML = html;

  let headings = div.querySelectorAll("h1");
  for (var x = 0; x < headings.length; x++) {
    if (headings[x].innerText == title) {
      headings[x].remove();
      break;
    }
  }

  // append an id at the end of the slug
  let postSlug;

  // when creating a new post, create a unique slug
  // We are adding a uid to the end of the slug to avoid slug collisions

  if (!slug) {
    postSlug =
      slugify(title.toLocaleLowerCase(), { remove: /[^\w\s]/gi }) +
      `---${uid()}`;
  } else {
    // in edit draft mode, use existing slug passed down from the parent component
    const slugSplit = slug.split("---");
    const prevUid = slugSplit[slugSplit.length - 1];
    postSlug =
      slugify(title.toLocaleLowerCase(), { remove: /[^\w\s]/gi }) +
      `---${prevUid || uid()}`; //slug;
  }

  let contentToInsert = html;
  if (div?.innerHTML && div.innerHTML.length > 5) {
    contentToInsert = div?.innerHTML;
  }

  let seo = postObject?.seo ? postObject.seo : {};
  seo.opengraphTitle = title;
  seo.opengraphImage = postObject?.featuredImage
    ? postObject.featuredImage
    : coverImage;
  seo.twitterImage = postObject?.twitterImage
    ? postObject.twitterImage
    : coverImage;
  seo.twitterTitle = title;

  let entry = {
    type: "article",
    legacyFeaturedImage: {},
    status: forReview ? "pending" : postStatus ? postStatus : "draft",
    title: title,
    content: contentToInsert,
    // remove user or the post user gets changed on update (when admin edits)
    // user: user?.id,
    //   featuredImage: coverImage,
    legacyFeaturedImage: {
      mediaItemUrl: coverImage || "",
      srcSet: generateImageTypes(coverImage || ""),
      thumb: `${coverImage}-150x150.${getImageExtention(coverImage || "")}`,
      medium: `${coverImage}-768x336.${getImageExtention(coverImage || "")}`,
    },
    seo: seo,
    esES: false,
  };

  //if creating, need to send the user id
  if (isCreate) {
    console.log(user?.profile);
    entry.user = user?.profile?.id;
  }

  //change the date on save only if it's a draft or pending publish
  if (
    postStatus == "draft" ||
    postStatus == "pending" ||
    !postStatus ||
    isCreate
  ) {
    if (!postObject || postObject?.status !== "publish") {
      entry.date = new Date();
      entry.slug = postSlug;
      entry.featured = false;
      (entry.excerpt = firstParagraph),
        //SEO
        (entry.seo.opengraphPublishedTime = new Date());
      entry.seo.metaDesc = firstParagraph;
      entry.seo.opengraphDescription = firstParagraph;
      entry.seo.twitterDescription = firstParagraph;
    }
  }

  return {
    entry,
  };
};

