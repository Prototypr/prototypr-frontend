import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Layout from '@/components/layout'
/**new index components */
import Intro from '@/components/new-index/Intro'
import EditorPick from '@/components/new-index/EditorPick'
import ProductList from '@/components/new-index/ProductList'

import { getAllPostsForHome } from '@/lib/api'
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
          <title>Prototypr - Prototyping, UX Design, Front-end Development and Beyond 👾.</title>
        </Head>
        <Container>
          <Intro />
          <EditorPick />
          <ProductList />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  return {
    props: { allPosts:allPosts.data, preview },
  }
}
