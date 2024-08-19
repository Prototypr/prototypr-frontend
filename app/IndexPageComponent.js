"use client";
import Layout from "@/components/new-index/layoutForIndex";
import IntroBanner from "@/components/v4/hero/IntroBanner2";
import TagsNavRow from "@/components/v4/section/TagsNavRow";
import Container from "@/components/container";
import NewsColumn from "@/components/v4/layout/NewsColumn";
import HeroArticleSection from "@/components/v4/section/HeroArticleSection";
import CardColumn from "@/components/v4/layout/CardColumn";
import NewsletterSection from "@/components/v4/section/NewsletterSection";
import ToolsCarouselSection from "@/components/v4/section/ToolsCarouselSection";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
import TopicSectionHome from "@/components/v4/section/TopicSectionHome";
import Footer from "@/components/footer";

import { IntlProvider } from 'react-intl';


export default async function IndexPageComponent({locale,user, data}) {
//   const data = await getData(locale);

  return (
    <IntlProvider locale={locale}>
    <>
     {!user && <IntroBanner sponsor={data.sponsors?.length ? data.sponsors[0] : null} />}
      <TagsNavRow />
      <Container>
        {/* Your main content here, using data fetched above */}
        <NewsColumn
          groupedNewsPosts={data.groupedNewsPosts}
          sponsor={data.navSponsor}
          posts={data.allNews}
        />
        <HeroArticleSection
          heroPost={data.heroPost}
          viewablePosts={data.morePosts}
        />
        <CardColumn sponsor={data.navSponsor} tools={data.allTools} />
      </Container>
      <NewsletterSection />
      <ToolsCarouselSection
        toolsList={data.allTools}
        sponsors={data.sponsors}
      />
      {/* ... other sections ... */}
      <Footer />
    </>
    </IntlProvider>
  );
}
