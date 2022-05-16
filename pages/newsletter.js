import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";

import Head from "next/head";
import { getAllPostsForToolsPage } from "@/lib/api";
const Footer = dynamic(() => import('@/components/footer')) 
const SourcePanel = dynamic(() => import("@/components/new-index/SourcePanel"));
// const TitleBlock = dynamic(() => import("@/components/newsletter/TitleBlock"));
const IssueList = dynamic(() => import("@/components/newsletter/IssueList"));
const NewPagination = dynamic(() => import("@/components/pagination"));
import { useIntl } from "react-intl";
const PAGE_SIZE = 8;

export default function NewsLetter({
  preview,
  allPosts = [],
  pagination = {},
}) {
  const intl = useIntl();
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/newsletter/page/${pageNo}`);
  };
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>
            {intl.formatMessage({ id: "index.header.title" })}
            👾.
          </title>
        </Head>
        <Container>
          {/* <TitleBlock /> */}
          <div>
            <SourcePanel
              title={intl.formatMessage({ id: "navbar.contentitem.title2" })}
              desc={intl.formatMessage({ id: "sourcepanel.desc2" })}
            />
          </div>
          <IssueList marginTop="mt-12 mb-6" posts={allPosts} />
          <div className="pb-6">
            <NewPagination
              total={pagination?.total}
              pageSize={PAGE_SIZE}
              currentPage={pagination?.page}
              onPageNumChange={(pageNum) => onPageNumChange(pageNum)}
            />
          </div>
        </Container>
      </Layout>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const allPosts =
    (await getAllPostsForToolsPage(null, PAGE_SIZE, 0, "newsletter")) || [];
  const pagination = allPosts.meta.pagination;
  return {
    props: {
      preview,
      allPosts: allPosts?.data,
      pagination,
    },
  };
}
