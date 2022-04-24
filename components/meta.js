import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import { NextSeo } from "next-seo";
export default function Meta({ seo }) {
  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            property: "monetization",
            content: seo.monetization
              ? seo.monetization
              : "$ilp.uphold.com/KFf2ZdYLXnj9",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/favicon/apple-touch-icon.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon/favicon-32x32.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon/favicon-16x16.png",
          },
          {
            rel: "manifest",
            href: "/favicon/site.webmanifest",
          },
          {
            rel: "mask-icon",
            href: "/favicon/safari-pinned-tab.svg",
            color: "#000000",
          },
          {
            rel: "shortcut icon",
            href: "/favicon/favicon.ico",
            color: "#000000",
          },
          {
            rel: "msapplication-TileColor",
            content: "#000000",
          },
          {
            rel: "msapplication-config",
            content: "/favicon/browserconfig.xml",
          },
          {
            rel: "theme-color",
            content: "#000",
          },
          {
            rel: "alternate",
            type: "application/rss+xml",
            href: "/feed.xml",
          },
        ]}
        title={
          seo.title
            ? seo.title
            : "Prototypr: Design, UX, Front-end development, and beyond."
        }
        description={
          seo.description
            ? seo.description
            : "Discover UX prototyping tools for designing mobile and desktop experiences. From UX design to front end development - find the right tool for the job."
        }
        canonical={
          seo.canonical
            ? seo.canonical
            : seo.url
            ? seo.url
            : "https://prototypr.io"
        }
        openGraph={{
          url: seo.url ? seo.url : "https://prototypr.io",
          title: seo.title
            ? seo.title
            : "Prototypr: Design, UX, Front-end development, and beyond.",
          description: seo.description
            ? seo.description
            : "'Discover UX prototyping tools for designing mobile and desktop experiences. From UX design to front end development - find the right tool for the job.",
          images: [{ url: seo.image ? seo.image : HOME_OG_IMAGE_URL }],
          site_name: "Prototypr",
        }}
        twitter={{
          handle: "@prototypr",
          site: "@prototypr",
          cardType: "summary_large_image",
        }}
      />
    </>
  );
}
// export default function Meta() {
//   return (
//     <Head>
//       <link
//         rel="apple-touch-icon"
//         sizes="180x180"
//         href="/favicon/apple-touch-icon.png"
//       />
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="32x32"
//         href="/favicon/favicon-32x32.png"
//       />
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="16x16"
//         href="/favicon/favicon-16x16.png"
//       />
//       <link rel="manifest" href="/favicon/site.webmanifest" />
//       <link
//         rel="mask-icon"
//         href="/favicon/safari-pinned-tab.svg"
//         color="#000000"
//       />
//       <link rel="shortcut icon" href="/favicon/favicon.ico" />
//       <meta name="msapplication-TileColor" content="#000000" />
//       <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
//       <meta name="theme-color" content="#000" />
//       <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
//       <meta
//         name="description"
//         content={`A statically generated blog example using Next.js and ${CMS_NAME}.`}
//       />
//       <meta property="og:image" content={HOME_OG_IMAGE_URL} />
//     </Head>
//   );
// }
