import homeQuery from "./queries/homeQuery"
import postsQuery from "./queries/postsQuery"
import postsPageQuery from "./queries/postsPageQuery"
import singlePostQuery from "./queries/singlePostQuery"
import singleToolQuery from "./queries/singleToolQuery"

import toolsQuery from "./queries/toolsQuery"
import toolsPageQuery from "./queries/toolsPageQuery"

import toolsSubcategoryQuery from "./queries/toolsSubcategoryQuery"
import toolsSubcategoryPageQuery from "./queries/toolsSubcategoryPageQuery"
import toolsRelatedQuery from "./queries/toolsRelatedQuery"
import newHomeQuery from "./queries/newHomeQuery"
import allToolQuery from "./queries/allToolQuery"
import commonQuery from "./queries/commonQuery"
import peopleQuery from "./queries/peopleQuery"

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
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
  )
  return data?.posts[0]
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
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    homeQuery,
    {
      variables: {
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      },
    }
  )
  return data?.posts
}

export async function getCombinedPostsForHome(preview, limit = 5, start = 0) {
  const data = await fetchAPI(
    newHomeQuery,
    {
      variables: {
        "start": parseInt(start),
        "limit": parseInt(limit)
      },
    }
  )
  // const posts = data && data?.posts ? data.posts: null
  // const results = { posts }
  return data?.posts
}

export async function getAllToolsForHome(preview, limit, start) {
  const data = await fetchAPI(
    allToolQuery,
    {
      preview,
      variables: 
      { 
        ...(preview ? "" : "published"),
        "start": parseInt(start),
        "limit": parseInt(limit)
      }
    }
  )
  return data?.posts
}


export async function getAllPostsForPostsPage(preview, limit, start,slugs = []) {
  const data = await fetchAPI(
    postsQuery,
    {
      variables: {
        "start": parseInt(start),
        "limit": parseInt(limit),
        "slugs": slugs,
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      },
    }
  )
  return data?.posts
}

export async function getPostsByPageForPostsPage(preview, pageSize, page, slugs = []) {
  const data = await fetchAPI(
    postsPageQuery,
    {
      variables: {
        "pageSize": parseInt(pageSize),
        "page": parseInt(page),
        "slugs": slugs,
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      }
    }
  )
  return data?.posts
}

export async function getPostsByPageAndAuthor(preview, pageSize, page, authorSlugs = []) {
  const data = await fetchAPI(
    peopleQuery,
    {
      variables: {
        "pageSize": parseInt(pageSize),
        "page": parseInt(page),
        "slugs": authorSlugs,
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      }
    }
  )
  return data?.posts
}

export async function getAllPostsForToolsPage(preview, limit, start) {
  const data = await fetchAPI(
    toolsQuery,
    {
      variables: {
        "start": parseInt(start),
        "limit": parseInt(limit),
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      },
    }
  )
  return data?.posts
}

export async function getPostsByPageForToolsPage(preview, pageSize, page) {
  const data = await fetchAPI(
    toolsPageQuery,
    {
      variables: {
        "pageSize": parseInt(pageSize),
        "page": parseInt(page),
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      },
    },
  )
  return data?.posts
}


export async function getAllPostsForToolsSubcategoryPage(preview, limit, start,slugs = []) {
  const data = await fetchAPI(
    toolsSubcategoryQuery,
    {
      variables: {
        "start": parseInt(start),
        "limit": parseInt(limit),
        "slugs": slugs,
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      },
    }
  )
  return data?.posts
}

export async function getPostsByPageForToolsSubcategoryPage(preview, pageSize, page, slugs) {
  const data = await fetchAPI(
    toolsSubcategoryPageQuery,
    {
      variables: {
        "pageSize": parseInt(pageSize),
        "page": parseInt(page),
        "slugs": slugs,
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
        },
      },
    },
  )
  return data?.posts
}

export async function getPostAndMorePosts(slug, preview, type) {
  const data = await fetchAPI(
    singlePostQuery,
    {
      preview,
      variables: 
      { 
        ...(preview ? "" : "published"),
        "slug":slug,
        "type":type?type:'article'
      }
    }
  )
  return data
}

export async function getCommonQuery(preview, tags,type,limit, start) {
  const data = await fetchAPI(
    commonQuery,
    {
      preview,
      variables:
      {
        "type": type,
        "tags": tags,
        "limit": limit,
        "start": start
      }
    }
  )
  return data?.posts
}

export async function getToolsAndMoreTools(slug, preview) {
  const data = await fetchAPI(
    singleToolQuery,
    {
      preview,
      variables: 
      { 
        ...(preview ? "" : "published"),
        "slug":slug
      }
    }
  )
  return data
}
export async function getRelatedTools(tags,slug, preview) {

  const data = await fetchAPI(
    toolsRelatedQuery,
    {
      preview,
      variables: 
      { 
        ...(preview ? "" : "published"),
        "tags":tags,
        "slug":slug
      }
    }
  )
  return data
}
