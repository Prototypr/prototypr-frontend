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
import NewsletterSection from "@/components/v4/section/NewsletterSection";
import NewsletterPageHero from "@/components/v4/section/NewsletterPageHero";
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
      <Layout preview={preview}
       padding={false}
       maxWidth={"max-w-[1400px] search-wide"}
      >
        <Head>
          <title>
            {intl.formatMessage({ id: "index.header.title" })}
            👾.
          </title>
        </Head>
        <Container maxWidth="relative mb-6 px-0" padding={false}>
          {/* <TitleBlock /> */}
          <div className="relative bg-white -mt-[96px] pt-[86px] md:pt-[96px] pb-8 mb-20 overflow- px-1 xs:px-3 sm:px-6">
            {/* <NewsletterSection/> */}
            {/* <SourcePanel
              title={intl.formatMessage({ id: "navbar.contentitem.title2" })}
              desc={intl.formatMessage({ id: "sourcepanel.desc2" })}
            /> */}
            <NewsletterPageHero/>
            <div className="absolute  top-0 left-0 w-full h-full" 
            style={{
  backgroundColor: "#f6f6f6",
  opacity: 0.4,
  backgroundImage: "radial-gradient(#444cf7 0.5px, #ededf9 0.5px)",
  backgroundSize: "10px 10px"
}}
/>
          {/* <img src='/static/images/toolbox/squares.svg' className="rounded-b-[3.4rem] opacity absolute w-full h-full object-cover top-0 left-0"/> */}
          </div>
          <div className="max-w-[1320px] mx-auto px-6 md:px-3">
            <IssueList marginTop="mt-8 mb-6" posts={allPosts} />
            <div className="pb-6">
              <NewPagination
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum) => onPageNumChange(pageNum)}
              />
            </div>
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
    revalidate:20
  };
}
