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
  console.log(data)
  return data?.posts[0]
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
  query Posts{
    posts {
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
    `
    query Posts($where: PostFiltersInput) {
      posts(sort: "date:desc", pagination:{limit:10}, filters:$where) {
        data {
          attributes {
            title
            status
            slug
            excerpt
            date
            legacyFeaturedImage{
              id
              mediaItemUrl
              srcSet
              thumb
            }
            author {
              data {
                attributes {
                  displayName
                  firstName
                  lastName
                  avatar
                }
              }
            }
          }
        }
      }
    }
  `,
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

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
    query PostBySlug($status: String, $slug: String) {
      posts(filters: {status:{eq:$status}, slug:{eq:$slug}}) {
        data {
          attributes {
            title
            slug
            content
            date
            ogImage: seo {
              opengraphImage
            }
            legacyFeaturedImage {
              id
              mediaItemUrl
              srcSet
              thumb
            }
            author {
              data {
                attributes {
                  displayName
                  firstName
                  lastName
                  avatar
                }
              }
            }
          }
        }
      }
    
      morePosts: posts(sort: "date:desc", pagination:{limit: 2}, filters: {slug:{eq:$slug},status:{eq:$status}}) {
        data {
          attributes {
            title
            slug
            excerpt
            date
            legacyFeaturedImage {
              id
              mediaItemUrl
              srcSet
              thumb
            }
            author {
              data {
                attributes {
                  displayName
                  firstName
                  lastName
                  avatar
                }
              }
            }
          }
        }
      }
    }
  `,
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
