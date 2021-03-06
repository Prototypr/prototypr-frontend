import postsQuery from "./queries/postsQuery";
import postsPageQuery from "./queries/postsPageQuery";
import singlePostQuery from "./queries/singlePostQuery";
import singleToolQuery from "./queries/singleToolQuery";

import toolsQuery from "./queries/toolsQuery";
import toolsPageQuery from "./queries/toolsPageQuery";

import newHomeQuery from "./queries/newHomeQuery";
import allToolQuery from "./queries/allToolQuery";
import commonQuery from "./queries/commonQuery";
import toolsSubcategoryQuery from "./queries/toolsSubcategoryQuery";
import toolsSubcategoryPageQuery from "./queries/toolsSubcategoryPageQuery";

import singleNewsletterQuery from "./queries/singleNewsletterQuery";

import singleNewsQuery from "./queries/singleNewsQuery";
import peopleQuery from "./queries/peopleQuery";
import newPeopleQuery from "./queries/newPeopleQuery";
import newHomeQueryStatic from "./queries/newHomeQueryStatic";
import allToolQueryStatic from "./queries/allToolQueryStatic";
import axios from "axios";

/**
 * main fetch
 * @param {*} query
 * @param {*} param1
 * @returns
 */
async function fetchAPI(query, { variables } = {}) {
  const data = await axios({
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + credentials.t
    },
    // withCredentials: true,
    data: JSON.stringify({ query, variables }),
  })
    .then((response) => {
      return response.data?.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Failed to fetch API");
    });

  return data;

  // const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables,
  //   }),
  // });

  // const json = await res.json();
  // if (json.errors) {
  //   console.error(json.errors);
  //   throw new Error("Failed to fetch API");
  // }

  // return json.data;
}

/**
 * get post previews
 * @param {*} slug
 * @returns
 */
export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  );
  return data?.posts[0];
}

/*****************************
 * HOME PAGE QUERIES
 *****************************/
/**
 * Get posts ordered by featured
 * @param {*} preview
 * @param {*} limit
 * @param {*} start
 * @param {*} sort
 * @returns
 */
export async function getCombinedPostsForHome(
  preview,
  limit = 5,
  start = 0,
  sort
) {
  const data = await fetchAPI(newHomeQuery, {
    variables: {
      start: parseInt(start),
      limit: parseInt(limit),
      sort: sort,
    },
  });
  return data?.posts;
}
export async function getCombinedPostsForHomeStatic(
  preview,
  limit = 20,
  start = 0,
  sort
) {
  const data = await fetchAPI(newHomeQueryStatic, {
    variables: {
      start: parseInt(start),
      limit: parseInt(limit),
      sort: sort,
    },
  });
  return data?.posts;
}

/**
 * Tools list for homepage
 * @param {*} preview
 * @param {*} limit
 * @param {*} start
 * @param {*} sort
 * @returns
 */
export async function getAllToolsForHome(preview, limit, start, sort) {
  const data = await fetchAPI(allToolQuery, {
    preview,
    variables: {
      ...(preview ? "" : "published"),
      start: parseInt(start),
      limit: parseInt(limit),
      sort,
    },
  });
  return data?.posts;
}
export async function getAllToolsForHomeStatic(preview, limit, start, sort) {
  const data = await fetchAPI(allToolQueryStatic, {
    preview,
    variables: {
      ...(preview ? "" : "published"),
      start: parseInt(start),
      limit: parseInt(limit),
      sort,
    },
  });
  return data?.posts;
}

/*****************************
 * HOMEPAGE STATIC GENERATION
 *****************************/
/**
 * get all post slugs for static generation
 * @param {*} postType
 * @returns
 */
export async function getAllPostsWithSlug(postType, pageSize = 20) {
  const data = await fetchAPI(`
  query Posts{
    posts(filters:{type:{eq:"${postType}"}}, pagination:{pageSize:${pageSize}}) {
      data{
        attributes{
          slug
        }
      }
    }
  }
  `);
  return data?.posts;
}

/*****************************
 * POSTS PAGE QUERIES
 *****************************/
/**
 * POSTS PAGE
 * @param {*} preview
 * @param {*} limit
 * @param {*} start
 * @param {*} slugs
 * @param {*} sort
 * @returns
 */
export async function getPost(slug, preview, type) {
  const data = await fetchAPI(singlePostQuery, {
    preview,
    variables: {
      ...(preview ? "" : ""),
      slug: slug,
      type: type ? type : "article",
    },
  });

  data.morePosts = data.relatedPosts;
  return data;
}

export async function getCommonQuery(
  preview,
  tags,
  type,
  limit,
  start,
  sort = ["featured:desc", "tier:asc", "date:desc"]
) {
  const data = await fetchAPI(commonQuery, {
    preview,
    variables: {
      type: type,
      tags: tags,
      limit: limit,
      start: start,
      sort,
    },
  });
  return data?.posts;
}

export async function getAllPostsForPostsPage(
  preview,
  limit,
  start,
  slugs = [],
  sort = ["featured:desc", "tier:asc", "date:desc"]
) {
  const data = await fetchAPI(postsQuery, {
    variables: {
      start: parseInt(start),
      limit: parseInt(limit),
      slugs: slugs,
      sort,
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  });
  return data?.posts;
}

export async function getPostsByPageForPostsPage(
  preview,
  pageSize,
  page,
  slugs = [],
  sort = ["featured:desc", "tier:asc", "date:desc"]
) {
  let variables = {
    variables: {
      pageSize: parseInt(pageSize),
      page: parseInt(page),
      sort,
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  };
  /**
   * fix for /posts page - when slugs is an empty
   * array, it finds 0 posts. So exclude slugs if it's got no length:
   */
  if (slugs.length) {
    variables.variables.slugs = slugs;
  }

  const data = await fetchAPI(postsPageQuery, {
    variables: variables.variables,
  });
  return [data?.posts, data?.tags];
}

/*****************************
 * PEOPLE PAGE QUERIES
 *****************************/
/**
 * get posts with author
 * @param {*} preview
 * @param {*} pageSize
 * @param {*} page
 * @param {*} authorSlugs
 * @param {*} sort
 * @returns
 */
export async function getPostsByPageAndAuthor(
  preview,
  pageSize,
  page,
  authorSlugs = [],
  sort = ["date:desc"]
) {
  const data = await fetchAPI(peopleQuery, {
    variables: {
      sort,
      pageSize: parseInt(pageSize),
      page: parseInt(page),
      slugs: authorSlugs,
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  });
  return data?.posts;
}

export async function getPeopleByPage(preview, pageSize, page) {
  const data = await fetchAPI(newPeopleQuery, {
    variables: {
      pageSize: parseInt(pageSize),
      page: parseInt(page),
      // where: {
      //   ...(preview ? {} : { status: { eq: "publish" } }),
      // },
    },
  });
  return data?.usersPermissionsUsers;
}

/*****************************
 * TOOLS PAGE QUERIES
 *****************************/
export async function getAllPostsForToolsPage(
  preview,
  pageSize,
  page,
  type = "tool"
) {
  const data = await fetchAPI(toolsQuery, {
    variables: {
      pageSize: parseInt(pageSize),
      page: parseInt(page),
      type,
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  });
  return data?.posts;
}

export async function getPostsByPageForToolsPage(
  preview,
  pageSize,
  page,
  sort = ["date:desc"]
) {
  const data = await fetchAPI(toolsPageQuery, {
    variables: {
      pageSize: parseInt(pageSize),
      page: parseInt(page),
      sort,
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  });
  return data?.posts;
}

export async function getAllPostsForToolsSubcategoryPage(
  preview,
  limit,
  start,
  slugs = []
) {
  const data = await fetchAPI(toolsSubcategoryQuery, {
    variables: {
      start: parseInt(start),
      limit: parseInt(limit),
      slugs: slugs,
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  });
  return data?.posts;
}

export async function getPostsByPageForToolsSubcategoryPage(
  preview,
  pageSize,
  page,
  slugs,
  sort = ["date:desc"]
) {
  const data = await fetchAPI(toolsSubcategoryPageQuery, {
    variables: {
      pageSize: parseInt(pageSize),
      page: parseInt(page),
      slugs,
      sort,
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  });
  return data?.posts;
}

/*****************************
 * SINGLE POST QUERIES
 *****************************/
/**
 * NEWSLETTER
 * @param {*} slug
 * @param {*} preview
 * @param {*} type
 * @returns
 */
export async function getNewsletter(slug, preview, type) {
  const data = await fetchAPI(singleNewsletterQuery, {
    preview,
    variables: {
      ...(preview ? "" : ""),
      slug: slug,
      type: type ? type : "article",
    },
  });

  data.morePosts = data.relatedPosts;
  return data;
}

/**
 * NEWS
 * @param {*} slug
 * @param {*} preview
 * @param {*} type
 * @returns
 */
export async function getNewsAndMoreNews(slug, preview, type) {
  const data = await fetchAPI(singleNewsQuery, {
    preview,
    variables: {
      ...(preview ? "" : "published"),
      slug: slug,
      type: type ? type : "bite",
    },
  });
  return data;
}

export async function getTool(slug, preview) {
  const data = await fetchAPI(singleToolQuery, {
    preview,
    variables: {
      ...(preview ? "" : "published"),
      slug: slug,
    },
  });
  return data;
}

export async function getAllPostsForSitemap(postType, page) {
  const data = await fetchAPI(
    `
  query Posts($page:Int, $postType:String){
    posts(sort: ["date:desc"],filters:{type:{eq:$postType}}, pagination:{pageSize:20, page:$page}) {
      meta {
        pagination {
          total
          pageSize
          page
          pageCount
        }
      }
      data{
        attributes{
          slug
          date
        }
      }
    }
  }
  `,
    {
      variables: {
        postType,
        page,
      },
    }
  );
  return data;
}
