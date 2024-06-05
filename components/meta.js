import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import { NextSeo, ArticleJsonLd, ProductJsonLd } from "next-seo";
export default function Meta({ seo, articleJsonLd, productJsonLd }) {
  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            name:"monetization",
            content: (seo?.monetization && seo?.monetization!=='null')
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
          seo?.title
            ? seo.title
            : "Prototypr: Design, UX, Front-end development, and beyond."
        }
        description={
          seo?.description
            ? seo.description
            : "Discover UX prototyping tools for designing mobile and desktop experiences. From UX design to front end development - find the right tool for the job."
        }
        canonical={
          seo?.canonical
            ? seo.canonical
            : seo?.url
            ? seo.url
            : "https://prototypr.io"
        }
        openGraph={{
          url: seo?.url ? seo.url : "https://prototypr.io",
          title: seo?.title
            ? seo?.title
            : "Prototypr: Design, UX, Front-end development, and beyond.",
          description: seo?.description
            ? seo.description
            : "'Discover UX prototyping tools for designing mobile and desktop experiences. From UX design to front end development - find the right tool for the job.",
          images: [{ url: seo?.image ? seo.image : HOME_OG_IMAGE_URL }],
          site_name: "Prototypr",
        }}
        twitter={{
          handle: "@prototypr",
          site: "@prototypr",
          cardType: "summary_large_image",
        }}
      />
      {/* {articleJsonLd && (
        <ArticleJsonLd
          url="https://example.com/article"
          title="Article headline"
          images={[
            "https://example.com/photos/1x1/photo.jpg",
            "https://example.com/photos/4x3/photo.jpg",
            "https://example.com/photos/16x9/photo.jpg",
          ]}
          datePublished="2015-02-05T08:00:00+08:00"
          dateModified="2015-02-05T09:00:00+08:00"
          authorName={["Jane Blogs", "Mary Stone"]}
          publisherName="Gary Meehan"
          publisherLogo="https://www.example.com/photos/logo.jpg"
          description="This is a mighty good description of this article."
        />
      )} */}
      {/* {productJsonLd && (
        <ProductJsonLd
          url="https://example.com/article"
          title="Article headline"
          images={[
            "https://example.com/photos/1x1/photo.jpg",
            "https://example.com/photos/4x3/photo.jpg",
            "https://example.com/photos/16x9/photo.jpg",
          ]}
          datePublished="2015-02-05T08:00:00+08:00"
          dateModified="2015-02-05T09:00:00+08:00"
          authorName={["Jane Blogs", "Mary Stone"]}
          publisherName="Gary Meehan"
          publisherLogo="https://www.example.com/photos/logo.jpg"
          description="This is a mighty good description of this article."
        />
      )} */}
      {/* {typeof window &&<script type="text/javascript" async="async" dangerouslySetInnerHTML={{ __html: `var _paq = window._paq = window._paq || []; _paq.push(["trackPageView"]); _paq.push(["enableLinkTracking"]);  function embedTrackingCode() { var u="https://analytics.prototypr.io/";    _paq.push(["setTrackerUrl", u+"matomo.php"]);    _paq.push(["setSiteId", "1"]);     var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";    g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);     }  if (window.addEventListener) { window.addEventListener("load", embedTrackingCode, false);  } else if (window.attachEvent) {  window.attachEvent("onload",embedTrackingCode);  } else { embedTrackingCode(); }` }} />} */}
      
      
      {/* gumlet */}
      {/* don't need this - using gumletloader and the loader in next config - this is for js only */}
      {/* {typeof window &&<script type="text/javascript" async="async" dangerouslySetInnerHTML={{ __html: `window.GUMLET_CONFIG={hosts:[{current:"prototypr-media.sfo2.digitaloceanspaces.com",gumlet:"prototyprio.gumlet.io"}], lazy_load: true,srcset: true},d=document,s=d.createElement("script"),s.src="https://cdn.gumlet.com/gumlet.js/2.1/gumlet.min.js",s.async=1,d.getElementsByTagName("head")[0].appendChild(s);` }} />} */}
      {/* <script type="text/javascript" async="async" dangerouslySetInnerHTML={{ __html: `window.GUMLET_CONFIG={hosts:[{current:"prototypr-media.sfo2.digitaloceanspaces.com",gumlet:"prototyprio.gumlet.io"}], lazy_load: true,srcset: true},d=document,s=d.createElement("script"),s.src="https://cdn.gumlet.com/gumlet.js/2.1/gumlet.min.js",s.async=1,d.getElementsByTagName("head")[0].appendChild(s);` }} /> */}
      
      
      {/* CODEPEN AND TWITTER EMBED */}
      {typeof window &&<script defer async="async" src="https://static.codepen.io/assets/embed/ei.js"></script>}
      {typeof window &&<script defer async="async" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>}

      {typeof window && <script id="support-script"async="async" defer dangerouslySetInnerHTML={{__html:`
          (function(d,t) {
            var BASE_URL="https://chatwoot-3n2v4-u6349.vm.elestio.app";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'oh8AKRPnciiHjLwsjNZ1hTW7',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
      `}}></script>}
      
    </>
  );
}
