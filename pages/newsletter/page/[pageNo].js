import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import Container from '@/components/container'
const IssueList = dynamic(() => import("@/components/newsletter/IssueList"));
// const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const NewPagination = dynamic(() => import("@/components/pagination"));
import Layout from "@/components/new-index/layoutForIndex";
import { FormattedMessage, useIntl } from 'react-intl';
import PostTitle from '@/components/post-title'

import Head from 'next/head'
import { getAllPostsForToolsPage } from '@/lib/api'
import NewsletterPageHero from "@/components/v4/section/NewsletterPageHero";
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
                padding={false}
                maxWidth={"max-w-[1400px] search-wide"}
                activeNav={"posts"} preview={preview}>
                {/* <Head>
                    <title>Open design and tech stories for everyone to read</title>
                </Head> */}
        <Container maxWidth="relative mb-6 px-0" padding={false}>
        <div className="relative bg-white -mt-[96px] pt-[86px] md:pt-[96px] pb-8 mb-20 overflow- px-1 xs:px-3 sm:px-6">
                    <NewsletterPageHero/>
                                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundColor: "#f6f6f6",
                    opacity: 0.4,
                    backgroundImage: "radial-gradient(#444cf7 0.5px, #ededf9 0.5px)",
                    backgroundSize: "10px 10px"
                    }}/>
                    </div>
                    <div className="max-w-[1320px] mx-auto px-6 md:px-3">
                        {router.isFallback ? (
                            <PostTitle>Loading…</PostTitle>
                        ) :
                            <>
                                {
                                    allPosts.length > 0 &&
                                    <div className="pt-8">
                                        <IssueList currentPage={pagination?.page} marginTop={false} posts={allPosts} />
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
                    </div>


                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps({ preview = null, params, locale }) {
    const pageSize = PAGE_SIZE
    const page = params.pageNo
    const allPosts = (await getAllPostsForToolsPage(null, PAGE_SIZE, page, "newsletter")) || [];
    const pagination = allPosts.meta.pagination
    return {
        props: { allPosts: allPosts.data, preview, pagination },
    }
}

export async function getStaticPaths() {
    const allPosts = (await getAllPostsForToolsPage(null, PAGE_SIZE, 0, "newsletter")) || [];
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