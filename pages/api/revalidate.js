// only published posts should be revalidated
//
import { purgeCloudFlareCache } from "@/lib/utils/cloudflare";
import axios from "axios";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { entry } = req.body;

    // revalidate posts
    if (
      entry.type == "article" &&
      (entry.status === "publish" || entry.publishedAt)
    ) {
      const url = `/post/${entry.slug}`;

      await res.revalidate(url);
      if (process.env.NODE_ENV == "production") {
        await purgeCloudFlareCache(url);
        await clearAuthCache(entry.id);
      }
      return res.json({ revalidated: true });
    }
    //revalidate jobs
    else if (entry.type == "job" && entry.publishedAt) {
      console.log("revalidating job post :", entry.slug);
      const url = `/jobs/${entry.id}`;
      await res.revalidate(url);
      //if production
      if (process.env.NODE_ENV == "production") {
        await purgeCloudFlareCache(url);
        await clearAuthCache(entry.id);
      }
      return res.json({ revalidated: true });
    }
    //revalidate news
    else if (entry.type == "bite" && entry.publishedAt) {
      console.log("revalidating news post :", entry.slug);
      const url = `/news/${entry.slug}`;
      await res.revalidate(url);
      if (process.env.NODE_ENV == "production") {
        await purgeCloudFlareCache(url);
        await clearAuthCache(entry.id);
      }
      return res.json({ revalidated: true });
    }
    // revalidate tools
    else if (entry.type == "tool" && entry.publishedAt) {
      console.log("revalidating tool post :", entry.slug);
      const url = `/toolbox/${entry.slug}`;
      await res.revalidate(url);
      if (process.env.NODE_ENV == "production") {
        await purgeCloudFlareCache(url);
        await clearAuthCache(entry.id);
      }
      return res.json({ revalidated: true });
    } else if (entry.total) {
      //it's a like
      console.log("revalidating liked post by like id:", entry.id);

     await clearPostCacheByLike(entry.id, res);
     return res.json({ revalidated: true });
    } else {
      return res.json({ revalidated: false });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}

const clearAuthCache = async postId => {
  //fetch the user of the post by the postId from strapi using the admin secret key

  var config = {
    method: "get",
    url:
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
      `/api/posts/${postId}?populate=user`,
    headers: {
      authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(async function (response) {
      try {
        let userSlug =
          response?.data?.data?.attributes?.user?.data?.attributes?.slug;
        if (userSlug) {
          let url = `/people/${userSlug}`;
          await purgeCloudFlareCache(url);
        }
        // return res.status(200).json({ views: response.data?.results?.visitors?.value})
      } catch (e) {
        console.log(e);
      }
    })
    .catch(function (error) {
      console.log(error.message);
      return res.status(500).send("Error checking analytics");
    });

  const url = "/api/auth/user";
  await res.revalidate(url);
  if (process.env.NODE_ENV == "production") {
    await purgeCloudFlareCache(url);
  }
  return res.json({ revalidated: true });
};



////////
const clearPostCacheByLike = async (likeId, res) => {
  var config = {
    method: "get",
    url:
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
      `/api/likes/${likeId}?populate=post`,
    headers: {
      authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(async function (response) {
      try {
        let postSlug =
        response?.data?.data?.attributes?.post?.data?.attributes?.slug;

        if (postSlug) {
          let url = `/post/${postSlug}`;
          await res.revalidate(url);
          if (process.env.NODE_ENV == "production") {
            await purgeCloudFlareCache(url);
          }
        }
        // return res.status(200).json({ views: response.data?.results?.visitors?.value})
      } catch (e) {
        console.log(e);

      }
    })
    .catch(function (error) {
      console.log(error.message);
      return res.status(500).send("Error checking analytics");
    });
};
