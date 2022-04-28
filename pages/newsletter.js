import { useRouter } from "next/router";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import Footer from "@/components/footer";
import Head from "next/head";
import { getAllPostsForToolsPage } from '@/lib/api'
import SourcePanel from "@/components/new-index/SourcePanel";
import TitleBlock from "@/components/newsletter/TitleBlock";
import IssueList from "@/components/newsletter/IssueList";
import { FormattedMessage, useIntl } from 'react-intl';
const PAGE_SIZE = 8;

export default function NewsLetter({
    preview,
    allPosts =[]
}) {
    const intl = useIntl();
    const router = useRouter();
    return (
        <>
            <Layout preview={preview}>
                <Head>
                    <title>
                        {intl.formatMessage({id: "index.header.title"})}
                        👾.
                    </title>
                </Head>
                <Container>
                    <TitleBlock />
                    <SourcePanel />
                    <IssueList posts={allPosts} />
                </Container>
            </Layout>
            <Footer />
        </>
    )
}

export async function getStaticProps({ preview = null }) {
    const allPosts = await getAllPostsForToolsPage(null, PAGE_SIZE, 0 ,"newsletter") || [];
    return {
        props: {
            preview,
            allPosts: allPosts?.data
        }
    }
}