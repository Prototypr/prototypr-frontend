import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import Container from '@/components/container'
const IssueList = dynamic(() => import("@/components/newsletter/IssueList"));
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const NewPagination = dynamic(() => import("@/components/pagination"));
import Layout from '@/components/layout'
import { FormattedMessage, useIntl } from 'react-intl';
import PostTitle from '@/components/post-title'

import Head from 'next/head'
import { getAllPostsForToolsPage } from '@/lib/api'
const PAGE_SIZE = 12;
export default function NewsletterPage({ allPosts = [], preview, pagination = {} }) {

    const router = useRouter()
    const intl = useIntl();

    const onPageNumChange = (pageNo) => {
        router.push(`/newsletter/page/${pageNo}`)
    }

    return (
        <>
            <Layout
                seo={{
                    title: `Prototypr Design articles – free for everyone | Page ${pagination?.page}`,
                    description:
                        "Design content open and accessible to everyone, no paywall here.",
                    //   image: "",
                    canonical: `https://prototypr.io/posts/page/${pagination?.page}`,
                    url: `https://prototypr.io/posts/page/${pagination?.page}`,
                }}
                activeNav={"posts"} preview={preview}>
                <Head>
                    <title>Open design and tech stories for everyone to read</title>
                </Head>
                <Container>
                    {router.isFallback ? (
                        <PostTitle>Loading…</PostTitle>
                    ) :
                        <>
                            {
                                 allPosts.length > 0 &&
                                 <div className="pt-8">
                                     <IssueList marginTop={false} posts={allPosts} />
                                 </div>
                            }
                        </>
                    }

                    <NewPagination
                        total={pagination?.total}
                        pageSize={PAGE_SIZE}
                        currentPage={pagination?.page}
                        onPageNumChange={(pageNum) => { onPageNumChange(pageNum) }}
                    />

                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps({ preview = null, params, locale }) {
    const pageSize = PAGE_SIZE
    const page = params.pageNo
    const allPosts = await getAllPostsForToolsPage(null, PAGE_SIZE, page, "newsletter") || [];
    const pagination = allPosts.meta.pagination
    return {
        props: { allPosts: allPosts.data, preview, pagination },
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsForToolsPage(null, PAGE_SIZE, 0, "newsletter") || [];
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    const pageCountArr = new Array(pageCount).fill(' ')
    return {
        paths: pageCountArr && pageCountArr.map((pageNo) => {
            return `/newsletter/page/${pageNo}`
        }) || [],
        fallback: true,
    }
}