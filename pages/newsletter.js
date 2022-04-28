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
    allPosts
}) {
    const intl = useIntl();
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
                    <IssueList />
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps({ preview = null }) {
    const allPosts = await getAllPostsForToolsPage(null, PAGE_SIZE, 0 ,"newsletter") || [];
    console.log("post***********" + JSON.stringify(allPosts));
    return {
        props: {
            preview,
            allPosts: allPosts?.data
        }
    }
}