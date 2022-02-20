import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/tools/intro'
import Layout from '@/components/layout'
import { getAllPostsForToolsPage } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'

export default function Index({ allPosts, preview }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  const coverImage = heroPost.attributes.legacyFeaturedImage ? heroPost.attributes.legacyFeaturedImage:''

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.attributes.title}
              coverImage={coverImage}
              date={heroPost.attributes.date}
              author={(heroPost.attributes.author &&heroPost.attributes.author.data) ?heroPost.attributes.author.data.attributes:'https://prototypr.gumlet.io/wp-content/uploads/2021/09/2021-09-17-10-09-02.2021-09-17-10_10_54-f3ijc-1.gif'}
              slug={heroPost.attributes.slug}
              excerpt={heroPost.attributes.excerpt}
              type="toolbox"
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} type="toolbox" />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getAllPostsForToolsPage(preview)) || []
  console.log(allPosts)
  return {
    props: { allPosts:allPosts.data, preview },
  }
}
