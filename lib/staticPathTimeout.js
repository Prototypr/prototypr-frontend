import { TOTAL_STATIC_POSTS } from "@/lib/constants";
import { getAllPostsWithSlug } from "@/lib/api";

function staticPathTimeout(ms) {
  return new Promise(resolve => setTimeout(() => resolve("dummy"), ms));
}

export async function getPostsWithRetry({maxRetries = 3, postType="article"}) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const allPosts = await Promise.race([
        getAllPostsWithSlug(
          postType,
          process.env.NODE_ENV ||
            process.env.NEXT_PUBLIC_HOME_URL.indexOf("localhost") > -1
            ? 20
            : TOTAL_STATIC_POSTS
        ),
        staticPathTimeout(26000), // Set your desired timeout in milliseconds
      ]);

      // If a dummy response is received, retry the request
      if (allPosts === "dummy") {
        continue;
      }

      return allPosts;
    } catch (error) {
      console.error(error);
    }
  }

  // If the maximum number of retries is reached, return a default value
  console.log(
    `Failed to get posts after ${maxRetries} retries. Continuing with default value.`
  );
  return { data: [] }; // Replace with a suitable default value for your application
}
