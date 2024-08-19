import React from "react";
import IndexPageComponent from "./IndexPageComponent";
import { fetchUser } from "./actions";

import {
  getCombinedPostsForHome,
  getAllToolsForHome,
  // getRandomPostsForHome,
  getCommonQuery,
  getAllNews,
} from "@/lib/api";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";
import { TAB_ITEMS } from "@/lib/constants";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";
import getSponsors from "@/lib/utils/getSponsors";
import { groupPostsByDate } from "@/lib/utils/groupPostsByDate";
import { transformPostListOld } from "@/lib/locale/transformLocale";
import { formatAllTools } from "@/lib/utils/formatToolContent";

import Layout from "@/components/new-index/layoutForApp";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es-ES" }];
}

export const metadata = {
  title: "Typr Editor - Open-Source Writing Tool by Prototypr",
  description:
    "A customizable WYSIWYG editor with publishing flows and user state management for React.js. Built with Tiptap and ProseMirror.",
  openGraph: {
    title: "Typr Editor - Open-Source Writing Tool by Prototypr",
    description:
      "A customizable WYSIWYG editor with publishing flows and user state management for React.js. Built with Tiptap and ProseMirror.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/static/images/typr-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Tiptypr Editor Preview",
      },
    ],
  },
};

async function getData(locale) {
  console.log("getData", locale);
  const preview = false;
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  let allPosts = (await getCombinedPostsForHome(preview, 12, 0, sort)) || [];

  // let randomPosts = (await getRandomPostsForHome()) || [];
  let toolCount = 20;
  let allTools =
    (await getAllToolsForHome(preview, toolCount, 0, [
      "featured:desc",
      "date:desc",
    ])) || [];

  for (var x = 0; x < allTools?.data?.length; x++) {
    //generate blurhash here
    allTools.data[x].attributes.logoBase64 = createB64WithFallback(
      allTools.data[x]?.attributes?.logo?.data?.attributes?.blurhash
    );
    allTools.data[x].attributes.base64 = createB64WithFallback(
      allTools.data[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
    );
  }

  let allNews = (await getAllNews(preview, 15, 0)) || [];

  // let jobs = (await getAllJobs(null, 5, 1)) || [];
  // topic sections
  let topicRes = {};
  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    let res =
      (await getCommonQuery(preview, [tag], "article", 12, 0, sort)) || [];

    //add blurhash to the images
    for (var x = 0; x < res?.data?.length; x++) {
      res.data[x].attributes.base64 = createB64WithFallback(
        res.data[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
      );
    }

    const topicToolsRes =
      (await getCommonQuery(
        preview,
        [TAB_ITEMS[index].toolSlug],
        "tool",
        8,
        0,
        sort
      )) || [];

    //extract authors from the postss while we don't have an endpoint for it
    const authors = makeAuthorList(res);

    //shuffle so it's different each time
    shuffleArray(res.data);
    shuffleArray(authors);
    shuffleArray(topicToolsRes.data);

    //add blurhash to the images
    for (var x = 0; x < topicToolsRes?.data?.length; x++) {
      topicToolsRes.data[x].attributes.logoBase64 = createB64WithFallback(
        topicToolsRes.data[x]?.attributes?.logo?.data?.attributes?.blurhash
      );
      topicToolsRes.data[x].attributes.base64 = createB64WithFallback(
        topicToolsRes.data[x]?.attributes?.featuredImage?.data?.attributes
          ?.blurhash
      );
    }

    const topicData = {
      authors: authors,
      posts: res.data,
      tools: topicToolsRes.data,
    };
    topicRes[tag] = topicData;
  }

  // const popularTags =
  //   (await getPopularTopics({ postType: "article", pageSize: 34 })) || [];

  allPosts = transformPostListOld(allPosts?.data, locale);
  if (locale !== "es-ES") {
    // dont shuffle for now
    // shuffleArray(allPosts);
  }
  allTools = transformPostListOld(allTools?.data, locale);

  //add blurhash to allPosts images
  for (var x = 0; x < allPosts?.length; x++) {
    allPosts[x].attributes.base64 = createB64WithFallback(
      allPosts[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
    );
  }

  // shuffleArray(allTools)
  // await generateCombinedRSS({ allPosts, allTools });
  // otherPosts = transformPostListOld(otherPosts.data, locale);
  allTools = formatAllTools({ tools: allTools, tagNumber: 1 });
  allNews = formatAllTools({ tools: allNews.data, tagNumber: 0 });

  const { navSponsor, sponsors } = await getSponsors();

  // for(var x = 0; x<allNews.tools.length;x++){
  //   allNews.tools[x].attributes.base64 = createB64WithFallback(allNews.tools[x]?.attributes?.featuredImage?.data?.blurhash);
  //   allTools.data[x].attributes.logoBase64 = createB64WithFallback(allTools.data[x]?.attributes?.logo?.data?.blurhash);
  // }

  let groupedNewsPosts = groupPostsByDate(allNews);

  return {
    heroPost: allPosts?.length ? allPosts[0] : null,
    morePosts: allPosts?.length > 1 ? allPosts.slice(1) : null,
    allTools: allTools?.length ? allTools : null,
    allNews: allNews?.length ? allNews : null,
    groupedNewsPosts: groupedNewsPosts ? groupedNewsPosts : null,
    // popularTags,
    // otherPosts: otherPosts,
    // interviewPosts: interviews.data,
    topicRes: topicRes ? topicRes : null,
    preview,
    // jobs,
    // randomPosts: randomPosts.slice(0, 8),
    sponsors: sponsors?.length ? sponsors : [],
    navSponsor,
    // ... other data ...
  };
}

export default async function IndexPage({ params: { locale } }) {
  const userData = await fetchUser();

  const data = await getData(locale);
  return (
    <Layout sessionUser={userData?.user?.id} background={"#fbfcff"}>
        {/* {data ? ( */}
          <IndexPageComponent user={userData?.user} locale={locale} data={data} />
        {/* ) : (
          <div>Loading...</div>
        )} */}
    </Layout>
  );
}
