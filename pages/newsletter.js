import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import Footer from "@/components/footer";
import Head from "next/head";

import SourcePanel from "@/components/new-index/SourcePanel";
import TitleBlock from "@/components/newsletter/TitleBlock";
import IssueList from "@/components/newsletter/IssueList";
import { FormattedMessage, useIntl } from 'react-intl';
export default function NewsLetter({
    preview
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
    return {
        props: {
            preview,
        }
    }
}