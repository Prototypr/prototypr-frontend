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

import userArticlesQuery from "./queries/userArticlesQuery";
import adminArticlesQuery from "./queries/adminArticlesQuery";
import userArticleQuery from "./queries/userArticleQuery";
import userArticleById from "./queries/userArticleById";
import getArticleSlugById from "./queries/getArticleSlugById";

import userJobById from "./queries/userJobById";
import jobsQuery from "./queries/jobsQuery2";
import sponsorSlotsQuery from "./queries/sponsorSlotsQuery";

import axios from "axios";
import singleJobQuery from "./queries/singleJobQuery";
import userBySponsorPostId from "./queries/userBySponsorPostId";
import partnerPostsQuery from "./queries/partnerPostsQuery";
import partnerJobsQuery from "./queries/partnerJobsQuery";


/**
 * main fetch
 * @param {*} query
 * @param {*} param1
 * @returns
 */
async function fetchAPI(query, { variables } = {}) {
  // console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL);
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
}
async function fetchAPIAuthenticated(user, query, variables = {}) {
  // console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL);
  const data = await axios({
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.jwt,
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

/**
 * User articles
 * (only works when signed in)
 */

// const getPostById = `
// query UserArticle($slug:ID!) {
//   userPostId(id: $slug) {
//     id
//     slug
//     title
//     date
//     status
//     content
//     localizations
//   }
// }
// `;

export async function getUserArticles({user, postStatus, pageSize,offset}) {
  const data = await fetchAPIAuthenticated(user, userArticlesQuery, {status:postStatus, pageSize, offset});
  return data;
}
export async function getAdminArticles({user, postStatus, pageSize,offset, userIdFilter}) {
  const data = await fetchAPIAuthenticated(user, adminArticlesQuery, {status:postStatus, pageSize, offset, user:userIdFilter});

  return data;
}
export async function getPartnerPosts({user, pageSize,offset}) {
  const data = await fetchAPIAuthenticated(user, partnerPostsQuery, {pageSize, offset});
  return data;
}
export async function getPartnerJobs({user, pageSize,offset}) {
  const data = await fetchAPIAuthenticated(user, partnerJobsQuery, {pageSize, offset});
  return data;
}
export async function getUserArticle(user, slug) {
  // console.log("user haha ->", user);

  // userArticleQuery
  const data = await fetchAPIAuthenticated(user, userArticleById, { slug });
  return data;
}

export async function getSlugFromArticleId(user, slug) {
  // userArticleQuery
  const data = await fetchAPIAuthenticated(user, getArticleSlugById, { slug });
  return data;
}


//jobs
export async function getUserJobById(user, id) {
  // console.log("user haha ->", user);

  // userArticleQuery
  const data = await fetchAPIAuthenticated(user, userJobById, { id });
  return data;
}


/***
 * JOBS POSTS
 */

 export async function getAllJobs(
  preview,
  limit,
  start,
  slugs = [],
  sort = ["promoted:desc", "date:desc"]
) {
  // const data = await fetchAPI(jobsQuery, {
  //   variables: {
  //     start: parseInt(start),
  //     limit: parseInt(limit),
  //     sort,
  //   },
  // });
  const data = await fetchAPI(jobsQuery, {
    variables: {
      start: parseInt(start),
      limit: parseInt(limit),
      sort,
    },
  });
  // return data?.jobs;
  // console.log(data)
  let jobs = data?.allJobs?.posts
  return jobs
}

/*****************************
 * JOB PAGE STATIC GENERATION
 *****************************/
/**
 * get all post slugs for static generation
 * @param {*} postType
 * @returns
 */
 export async function getAllJobsWithId(pageSize = 20) {
  const data = await fetchAPI(`
  query Jobs{
    jobs(pagination:{pageSize:${pageSize}}){
      data{
        id
        attributes{
					slug
        }
      }
    }
  }
  `);
  return data?.jobs;
}

 export async function getAllLocations(pageSize = 250) {
  const data = await fetchAPI(`
  query Locations{
    locations(pagination:{pageSize:${pageSize}}){
      data{
        id
        attributes{
					name
          code
        }
      }
    }
  }
  `);
  return data?.locations;
}
 export async function getAllSkills(pageSize = 250) {
  const data = await fetchAPI(`
  query Skills{
    skills(pagination:{pageSize:${pageSize}}){
      data{
        id
        attributes{
					name
          slug
        }
      }
    }
  }
  `);
  return data?.skills;
}

export async function getJobPage(id) {
  const data = await fetchAPI(singleJobQuery, {
    variables: {
      id,
    },
  });
  console.log(data)
  return data;
}

/****
 * SPONSORS
 */

 export async function getUpcomingSponsorSlots(
  {preview,
  limit=57,
  start=0,
  type='combo',
  sort = ["promoted:desc", "date:desc"]}
) {
  // const data = await fetchAPI(jobsQuery, {
  //   variables: {
  //     start: parseInt(start),
  //     limit: parseInt(limit),
  //     sort,
  //   },
  // });
  const data = await fetchAPI(sponsorSlotsQuery, {
    variables: {
      pageSize: parseInt(limit),
      type:type,
      page: parseInt(start),
      sort,
    },
  });
  // return data?.jobs;
  let sponsors = data?.bookedSponsors?.posts
  return sponsors
}

//jobs
export async function getUserBySponsorPostId(user, id) {
  // console.log("user haha ->", user);

  // userArticleQuery
  const data = await fetchAPIAuthenticated(user, userBySponsorPostId, { id });
  return data;
}