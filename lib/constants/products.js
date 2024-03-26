export const SponsorPackages = {
    newsletter: [
      {
        image: "/static/images/sponsor-nl-main-cover.png",
        title: "Featured Sponsor (1 issue)",
        titleShort:'Featured Newsletter',
        desp: "The main newsletter sponsor with 3 placements including the header, a banner and newsletter footer.",
        ctaText: "Learn more",
        screenshots:[
            {   
                description:<><span className="font-medium">Large newsletter banner</span> - 300h x 600w image in middle of newsletter</>,
                image:'https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/fca49c3ac490fa197fe92d3a933ac137.png'
            },
            {   
                description:<><span className="font-medium">Newsletter header mention</span> - 'supported by' brand mention</>,
                image:'https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/4fb3579b8365d9fb90ef7eec259497cc.png'
            },
        ],
        productId:process.env.NEXT_PUBLIC_PRICE_NEWSLETTER_1,
        price:'$600'
      },
      {
        image: "/static/images/sponsor-nl-main-cover.png",
        title: "Sponsored Article (1 issue)",
        titleShort:'Sponsored Article',
        desp: "A featured article on a standalone card near the article section of the newsletter.",
        ctaText: "Learn more",
        screenshots:[
            {   
                description:<><span className="font-medium">Sponsored Article</span> - a slot with image next to the article section of the newsletter including a standalone card with image, title, and description. Good for articles, but can be used for offers too!</>,
                image:'https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/d59bd8cfd65d9783a0aac8827cb0c3bb.png'
            },
            {   
                description:<><span className="font-medium">Weekly rundown mention</span> - Your article will also be mentioned with a link back in the Prototypr weekly rundown blog post.</>,
                // image:'https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/d59bd8cfd65d9783a0aac8827cb0c3bb.png'
            },
        ],
        productId:process.env.NEXT_PUBLIC_PRICE_NEWSLETTER_2,
        price:'$300'
      },
      {
        image: "/static/images/sponsor-nl-link-cover.png",
        title: "Toolbox Link (1 issue)",
        desp: "A sponsored tool in the tools section of the newsletter with your logo.",
        ctaText: "Learn more",
        titleShort:'Sponsored Link',
        screenshots:[
            {   
                description:<><span className="font-medium">Toolbox Newsletter Slot</span> - Your thumbnail and tagline in the weekly recommended tools section</>,
                image:'https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/3eeaabd10d205678c6eab1986f80f358.png'
            },
        ],
        productId:process.env.NEXT_PUBLIC_PRICE_NEWSLETTER_3,
        price:'$250'
      },
    ],
    website: [
      {
        image: "/static/images/sponsor-web-main.png",
        title: "Main Sponsor  (1 month)",
        desp: "A sponsor card on the homepage and article pages",
        ctaText: "Book for $900",
        titleShort:'Main Website Sponsor',
        link: "",
        productId:process.env.NEXT_PUBLIC_PRICE_WEBSITE_1,
        price:'$900'
      },
      {
        image: "/static/images/sponsor-web-topic.png",
        title: "Topic Sponsor (1 month)",
        desp: "A sponsor card on a topic page and related articles.",
        ctaText: "Book for $900",
        link: "",
        titleShort:'Website Topic Sponsor',
        productId:process.env.NEXT_PUBLIC_PRICE_WEBSITE_2,
        price:'$900'
      },
      // {
      //   image: "/static/images/sponsor-web-tool.png",
      //   title: "Sponsored Tool (One Week)",
      //   desp: "A sponsored tool in the toolbox. Showed on every toolbox page.",
      //   ctaText: "Book for $100",
      //   link: "",
      //   productId:'306910'
      // },
    ],
  };
  