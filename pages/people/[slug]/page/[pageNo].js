import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import Image from "next/image";

import { getPostsByPageAndAuthor } from "@/lib/api";
import {
  getTwitterHandle,
  getKofiName,
  getDribbbleHandle,
  getGithubHandle,
} from "@/lib/profile-page/profile-page.js";
// import ToolLargeCardProfile from "@/components/v4/card/ToolLargeCardProfile";
// import SmallCard from "@/components/v4/card/SmallCard/SmallCardB";
import ProfilePageLayout from "@/components/people/ProfilePageLayout";
import { formatToolContent } from "@/lib/utils/formatToolContent";
import { createB64WithFallback } from "@/lib/utils/blurHashToDataURL";

const PostTitle = dynamic(() => import("@/components/post-title"), {
  ssr: true,
});

const NewPagination = dynamic(() => import("@/components/pagination"));
const PAGE_SIZE = 12;
const ALL_SLUGS = [
  "hoangnguyen",
  "clos",
  "ebruaksoy",
  "giovanitier",
  "atharvapatil",
  "alexanderigwe",
  "kelechiu",
  "tamarasredojevic",
  "leandrofernandez",
  "alexandragrochowski",
  "chamansharma",
];

export default function PeoplePage({
  allPosts = [],
  preview,
  pagination,
  slug = "",
  pageNo = 1,
  author = {},
  kofi = null,
  github = null,
  twitter = null,
  dribbble = null,
  authorUrl = "",
  skills = [],
}) {
  const withAuthUser = {};
  const router = useRouter();

  const onPageNumChange = pageNum => {
    router.push(`/people/${slug}/page/${pageNum}`);
  };

  const avatar = author.avatar?.data?.attributes
    ? author.avatar.data.attributes.url
    : author?.legacyAvatar
      ? author.legacyAvatar
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  return (
    <Layout
      seo={{
        title: `${author?.firstName ? author?.firstName : ""}
        ${author?.lastName ? " " + author?.lastName : ""}
        ${!author?.firstName && !author?.lastName ? author?.name : ""}, member profile at Prototypr`,
        description: `Say hi to ${author?.firstName ? author?.firstName : ""}
        ${author?.lastName ? " " + author?.lastName : ""}
        ${!author?.firstName && !author?.lastName ? author?.name : ""} on Prototypr - check out their profile!`,
        image: author.avatar?.data?.attributes
          ? author.avatar.data.attributes.url
          : author?.legacyAvatar
            ? author.legacyAvatar
            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png",
        canonical: `https://prototypr.io/people/${slug}/page/${pageNo}`,
        url: `https://prototypr.io/people/${slug}/page/${pageNo}`,
      }}
      activeNav={"people"}
      preview={preview}
      padding={false}
    >
      {router.isFallback ? (
        <Container>
          <PostTitle>Loading…</PostTitle>
        </Container>
      ) : (
        <>
          <ProfilePageLayout
            allPosts={allPosts}
            preview={preview}
            pagination={pagination}
            slug={slug}
            pageNo={pageNo}
            author={author}
            kofi={kofi}
            github={github}
            twitter={twitter}
            dribbble={dribbble}
            authorUrl={authorUrl}
            skills={skills}
          />
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const { pageNo, slug } = params;

  let allPosts =
    (await getPostsByPageAndAuthor(preview, pageSize, pageNo, [slug])) || [];

  //add blurhash to allPosts images
  for (var x = 0; x < allPosts.data?.length; x++) {
    allPosts.data[x].attributes.base64 = createB64WithFallback(
      allPosts?.data[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
    );
  }

  const pagination = allPosts.meta.pagination;
  let author =
    allPosts.data.length && allPosts.data[0]
      ? allPosts.data[0].attributes.author
      : {};
  author = author?.data?.attributes;

  const kofi = getKofiName(author.kofi);
  const github = getGithubHandle(author.github);
  const twitter = getTwitterHandle(author.twitter);
  const authorUrl = author?.url
    ? author?.url?.replace(/(^\w+:|^)\/\//, "")?.replace(/\/+$/, "")
    : "";
  const dribbble = getDribbbleHandle(author.dribbble);

  let skills = [];
  if (author?.skills?.indexOf(",") > -1) {
    skills = author.skills.split(",");
  } else {
    //trin string
    var skill = author?.skills?.substring(0, 22);
    if (skill) {
      skills.push(skill);
    }
  }

  allPosts = allPosts.data;
  //loop through all posts and if the post type is a tool, run the tool function
  allPosts = allPosts?.map(post => {
    if (post.attributes.type == "tool") {
      // use the formatAllTools function to format the tool content
      post = formatToolContent({ post, tagNumber: 1 });
    }
    return post;
  });

  return {
    props: {
      author: author,
      slug,
      kofi,
      github,
      twitter,
      dribbble,
      skills,
      authorUrl,
      pageNo,
      preview,
      pagination,
      allPosts: allPosts,
    },
    revalidate: 20,
  };
}

export async function getStaticPaths() {
  let pageCountArr = [];

  for (let index = 0; index < ALL_SLUGS.length; index++) {
    let allPosts =
      (await getPostsByPageAndAuthor(null, PAGE_SIZE, 0, [ALL_SLUGS[index]])) ||
      [];

    //add blurhash to allPosts images
    for (var x = 0; x < allPosts.data?.length; x++) {
      allPosts.data[x].attributes.base64 = createB64WithFallback(
        allPosts?.data[x]?.attributes?.featuredImage?.data?.attributes?.blurhash
      );
    }

    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    let arr = new Array(pageCount).fill("");
    let newArr = arr.map((i, index) => {
      return `/people/${ALL_SLUGS[index]}/page/${index + 1}`;
    });
    pageCountArr = pageCountArr.concat(newArr);
  }
  return {
    paths: pageCountArr || [],
    fallback: true,
  };
}
