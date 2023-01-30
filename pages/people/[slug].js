import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import { transformPostList } from "@/lib/locale/transformLocale";
import ErrorPage from "next/error";

import { getPostsByPageAndAuthor } from "@/lib/api";
import {
  gradient,
  getTwitterHandle,
  getKofiName,
  getDribbbleHandle,
  getGithubHandle,
} from "@/lib/profile-page/profile-page.js";
import ProfilePageLayout from "@/components/people/ProfilePageLayout";

const PostTitle = dynamic(() => import("@/components/post-title"), {
  ssr: true,
});

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
  gradient = "",
  kofi = null,
  github = null,
  twitter = null,
  dribbble = null,
  authorUrl = "",
  skills = [],
}) {
  const router = useRouter();


  if (router.isFallback || !author) {
    return <ErrorPage statusCode={404} />;
  }

  // avatar?.data?.attributes?.avatar?.data?.attributes
  return (
    <Layout
      seo={{
        title: `
        ${author?.firstName ? author?.firstName:''}
                    ${author?.lastName ? ' '+author?.lastName:''}
                    ${(!author?.firstName && !author?.lastName) ? author?.name:''}
        , member profile at Prototypr`,
        description: `Say hi to ${author?.name} on Prototypr - check out their profile!`,
        image: author.avatar?.data?.attributes?.url
          ? author.avatar?.data?.attributes?.url
          : author?.legacyAvatar
          ? author.legacyAvatar
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png",
        canonical: `https://prototypr.io/people/${slug}`,
        url: `https://prototypr.io/people/${slug}`,
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
        previewOnly={true}
        allPosts={allPosts}  
        preview={preview}
        pagination={pagination}
        slug={slug}
        pageNo={pageNo}
        author = {author}
        gradient ={gradient}
        kofi = {kofi}
        github = {github}
        twitter = {twitter}
        dribbble = {dribbble}
        authorUrl = {authorUrl}
        skills = {skills}
        />
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params, locale }) {
  const pageSize = PAGE_SIZE;
  const { slug } = params;
  const pageNo = 1;

  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  /**
   * if a user has not made a post, they will not get a page
   * this was by accident, but it works well against bots - they can't
   * create a profile for backlinks, as you need a published article to
   * have a profile page
   */
  let allPosts =
    (await getPostsByPageAndAuthor(preview, pageSize, pageNo, [slug], sort)) ||
    [];

  if (!allPosts.data[0]) {
    //if no post found, 404
    return {
      props: {
        author: null,
      },
      revalidate: 30,
    };
  }

  const pagination = allPosts.meta.pagination;
  let author =
    allPosts.data.length && allPosts.data[0]
      ? allPosts.data[0].attributes.author
      : {};
  author = author?.data?.attributes ? author?.data?.attributes : null;

  let grad,
    kofi,
    github,
    twitter,
    authorUrl,
    dribbble = "";
  let skills = [];

  if (author) {
    grad = gradient(
      author?.name
        ? author?.name
        : author?.displayName
        ? author?.displayName
        : "",
      "horizontal"
    );
    kofi = getKofiName(author.kofi);
    github = getGithubHandle(author.github);
    twitter = getTwitterHandle(author.twitter);
    dribbble = getDribbbleHandle(author.dribbble);

    if (author.url) {
      authorUrl = author.url.replace(/(^\w+:|^)\/\//, "").replace(/\/+$/, "");
    }
    if (author.skills && author.skills.indexOf(",") > -1) {
      skills = author.skills.split(",");
    } else if (author.skills) {
      //trin string
      var skill = author.skills.substring(0, 22);
      skills.push(skill);
    }
  }

  allPosts = transformPostList(allPosts.data, locale);

  return {
    props: {
      author: author,
      slug,
      kofi: kofi ? kofi : "",
      github: github ? github : "",
      twitter: twitter ? twitter : "",
      dribbble: dribbble ? dribbble : "",
      skills,
      authorUrl:authorUrl?authorUrl:'',
      pageNo,
      preview,
      pagination,
      allPosts: allPosts,
      gradient: grad ? grad : "",
    },
    revalidate: 20,
  };
}

export async function getStaticPaths({ locale }) {
  let pageCountArr = [];
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  for (let index = 0; index < ALL_SLUGS.length; index++) {
    const allPosts =
      (await getPostsByPageAndAuthor(
        null,
        PAGE_SIZE,
        0,
        [ALL_SLUGS[index]],
        sort
      )) || [];
    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    let arr = new Array(pageCount).fill("");
    let newArr = arr.map((i, index) => {
      return `/people/${ALL_SLUGS[index]}`;
    });
    pageCountArr = pageCountArr.concat(newArr);
  }
  return {
    paths: pageCountArr || [],
    fallback: "blocking",
  };
}
