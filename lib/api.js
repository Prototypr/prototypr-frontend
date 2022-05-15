import homeQuery from "./queries/homeQuery";
import postsQuery from "./queries/postsQuery";
import postsPageQuery from "./queries/postsPageQuery";
import singlePostQuery from "./queries/singlePostQuery";
import singleToolQuery from "./queries/singleToolQuery";

import relatedPostsByTag from "./queries/relatedPostsByTag";

import toolsQuery from "./queries/toolsQuery";
import toolsPageQuery from "./queries/toolsPageQuery";

import newHomeQuery from "./queries/newHomeQuery";
import allToolQuery from "./queries/allToolQuery";
import commonQuery from "./queries/commonQuery";
import toolsSubcategoryQuery from "./queries/toolsSubcategoryQuery";
import toolsSubcategoryPageQuery from "./queries/toolsSubcategoryPageQuery";
import toolsRelatedQuery from "./queries/toolsRelatedQuery";
import newsRelatedQuery from "./queries/newsRelatedQuery";

import singleNewsQuery from "./queries/singleNewsQuery";
import peopleQuery from "./queries/peopleQuery";
import newPeopleQuery from "./queries/newPeopleQuery";
async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

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

export async function getAllPostsWithSlug(postType) {
  const data = await fetchAPI(`
  query Posts{
    posts(filters:{type:{eq:"${postType}"}}) {
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

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(homeQuery, {
    variables: {
      where: {
        ...(preview ? {} : { status: { eq: "publish" } }),
      },
    },
  });
  return data?.posts;
}

export async function getCombinedPostsForHome(preview, limit = 5, start = 0, sort) {
  // console.log(sort)
  const data = await fetchAPI(newHomeQuery, {
    variables: {
      start: parseInt(start),
      limit: parseInt(limit),
      sort:sort
    },
  });
  // const posts = data && data?.posts ? data.posts: null
  // const results = { posts }
  return data?.posts;
}

export async function getAllToolsForHome(preview, limit, start, sort) {
  const data = await fetchAPI(allToolQuery, {
    preview,
    variables: {
      ...(preview ? "" : "published"),
      start: parseInt(start),
      limit: parseInt(limit),
      sort
    },
  });
  return data?.posts;
}

export async function getAllPostsForPostsPage(
  preview,
  limit,
  start,
  slugs = [],
  sort = ["featured:desc","tier:asc",  "date:desc"]
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
  sort = ["featured:desc","tier:asc",  "date:desc"]
) {
  let variables = {variables: {
    pageSize: parseInt(pageSize),
    page: parseInt(page),
    sort,
    where: {
      ...(preview ? {} : { status: { eq: "publish" } }),
    },
  }}
  /**
   * fix for /posts page - when slugs is an empty
   * array, it finds 0 posts. So exclude slugs if it's got no length:
   */
  if(slugs.length) 
  {
    variables.variables.slugs = slugs
  }

  const data = await fetchAPI(postsPageQuery, {
    variables:variables.variables
  });
  return [data?.posts, data?.tags];
}

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

export async function getAllPostsForToolsPage(preview, pageSize, page, type ="tool") {
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

export async function getPeopleByPage(
  preview,
  pageSize,
  page,
) {
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

export async function getPostsByPageForToolsPage(preview, pageSize, page, sort = ["date:desc"]) {
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

export async function getCommonQuery(preview, tags, type, limit, start, sort = ["featured:desc","tier:asc", "date:desc"]) {
  const data = await fetchAPI(commonQuery, {
    preview,
    variables: {
      type: type,
      tags: tags,
      limit: limit,
      start: start,
      sort
    },
  });
  return data?.posts;
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
export async function getRelatedTools(tags, slug, preview) {
  const data = await fetchAPI(toolsRelatedQuery, {
    preview,
    variables: {
      ...(preview ? "" : "published"),
      tags: tags,
      slug: slug,
    },
  });
  return data;
}
export async function getRelatedNews(tags, slug, preview) {
  const data = await fetchAPI(newsRelatedQuery, {
    preview,
    variables: {
      ...(preview ? "" : "published"),
      tags: tags,
      slug: slug,
    },
  });
  return data;
}


export async function getAllPostsForSitemap(postType, page) {
  const data = await fetchAPI(`
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
    }
  });
  return data;
}