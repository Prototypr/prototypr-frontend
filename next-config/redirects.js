const redirects = [
    {
      source: "/home",
      destination: "/",
      permanent: true,
    },
    {
      source: "/prototyping-tools",
      destination: "/toolbox",
      permanent: true,
    },
    {
      source: "/toolbox/zeplin",
      destination: "/toolbox/zeplin-2",
      permanent: true,
    },
    {
      source: "/toolbox/canvas-flip",
      destination: "/toolbox/canvas-for-chrome",
      permanent: true,
    },
    {
      source: "/toolbox/vectary%E2%80%8A-%E2%80%8A3d-design-collaboration",
      destination: "/toolbox/vectarye2808a-e2808a3d-design-collaboration",
      permanent: true,
    },
    {
      source: "/toolbox/siftery%E2%80%8A-%E2%80%8A-product-comparisons",
      destination: "/toolbox/sifterye2808a-e2808a-product-comparisons",
      permanent: true,
    },
    {
      source:
        "/post/the-ai-companion-who-doesnt-care---lf6ra6yx0c2fgy2pbws",
      destination: "/post/conversational-ai-companion",
      permanent: true,
    },
    {
      source:
        "/toolbox/gradient-hunt%E2%80%8A-%E2%80%8Abeautiful-color-gradients",
      destination:
        "/toolbox/gradient-hunte2808a-e2808abeautiful-color-gradients",
      permanent: true,
    },
    {
      source: "/toolbox/%F0%9F%8E%A8-macos-big-sur-icons",
      destination: "/toolbox/f09f8ea8-macos-big-sur-icons",
      permanent: true,
    },
    {
      source: "/toolbox/%E2%80%8Eentity-pro",
      destination: "/toolbox/e2808eentity-pro",
      permanent: true,
    },
    {
      source:
        "/toolbox/coolhue-2-0%E2%80%8A-%E2%80%8Acoolest-gradient-hues-and-swatches",
      destination:
        "/toolbox/coolhue-2-0e2808a-e2808acoolest-gradient-hues-and-swatches",
      permanent: true,
    },
    {
      source:
        "/toolbox/gradient-hunt%E2%80%8A-%E2%80%8Abeautiful-color-gradients",
      destination:
        "/toolbox/gradient-hunte2808a-e2808abeautiful-color-gradients",
      permanent: true,
    },
    {
      source: "/toolbox/ux-challenges",
      destination: "/post/ux-challenges",
      permanent: true,
    },
    {
      source: "/toolbox/aesthetic%E2%80%89app-icons",
      destination: "/toolbox/aesthetice28089app-icons",
      permanent: true,
    },
    {
      source: "/toolbox/conversational-design-tools",
      destination: "/toolbox/conversational-design-tools/page/1",
      permanent: true,
    },
    {
      source: "/toolbox/ux-tools",
      destination: "/toolbox/ux-tools/page/1",
      permanent: true,
    },
    {
      source: "/toolbox/mmm-page-·-ᴬᴸᴾᴴᴬ",
      destination: "/toolbox/mmm-page-c2b7-e1b4ace1b4b8e1b4bee1b4b4e1b4ac",
      permanent: true,
    },
    {
      source:
        "/post/:slug(announcing-prototypr-grant-for-the-web-flagship-project-%F0%9F%8E%89)",
      destination:
        "/post/announcing-prototypr-grant-for-the-web-flagship-project-f09f8e89",
      permanent: true,
    },
    {
      source:
        "/post/microsoft-designer-ai-prompt-design-principles---lbzz9kvwx9e13fo5rj",
      destination: "/post/microsoft-designer-ai-prompt-design-principles",
      permanent: true,
    },
    {
      source: "/prototyping-tool/:slug*",
      destination: "/toolbox/:slug*", // Matched parameters can be used in the destination
      permanent: true,
    },
    {
      source: "/p",
      destination: "/dashboard/drafts",
      permanent: true,
    },
    {
      source: "/dashboard",
      destination: "/dashboard/drafts",
      permanent: true,
    },
  ];
  
  module.exports = redirects;