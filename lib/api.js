import homeQuery from "./queries/homeQuery"
import postsQuery from "./queries/postsQuery"
import singlePostQuery from "./queries/singlePostQuery"
import singleToolQuery from "./queries/singleToolQuery"

import toolsQuery from "./queries/toolsQuery"
import toolsPageQuery from "./queries/toolsPageQuery"

import toolsSubcategoryQuery from "./queries/toolsSubcategoryQuery"
import toolsSubcategoryPageQuery from "./queries/toolsSubcategoryPageQuery"

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

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
  query Posts{
    posts(filters:{type:{eq:"article"}}) {
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
export async function getAllToolsWithSlug() {
  const data = await fetchAPI(`
  query Tools{
    posts(filters:{type:{eq:"tool"}}) {
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
export async function getAllPostsForPostsPage(preview) {
  const data = await fetchAPI(
    postsQuery,
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
export async function getAllPostsForToolsPage(preview, limit, start) {
  const data = await fetchAPI(
    toolsQuery,
    {
      variables: {
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
          "start": start,
          "limit": limit
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


export async function getAllPostsForToolsSubcategoryPage(preview, limit, start) {
  const data = await fetchAPI(
    toolsSubcategoryQuery,
    {
      variables: {
        where: {
          ...(preview ? {} : {"status":{"eq":"publish"}}),
          "start": start,
          "limit": limit
        },
      },
    }
  )
  return data?.posts
}

export async function getPostsByPageForToolsSubcategoryPage(preview, pageSize, page, tags) {
  const data = await fetchAPI(
    toolsSubcategoryPageQuery,
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

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    singlePostQuery,
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
