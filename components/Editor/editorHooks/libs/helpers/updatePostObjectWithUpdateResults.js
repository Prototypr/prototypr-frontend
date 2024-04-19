/**
 * updatePostObject
 * get the main fields that need to be updated
 * 
 * and overwrite the existing fields with the updated fields 
 * @param {*} param0 
 */
export const updatePostObject = ({updatedObject, existingObject}) => {
    console.log('existingObject', existingObject)

    const newFields={
        content: updatedObject.content,
        date: updatedObject.date,
        title: updatedObject.title,
        type: updatedObject.type,

        featuredImage: updatedObject.featuredImage?.data?.attributes?.url,
        seo:updatedObject.seo,
        legacyFeaturedImage: updatedObject.legacyFeaturedImage?.mediaItemUrl || updatedObject.legacyAttributes?.imgUrl,
        
        seo: updatedObject.seo,
        published_at: updatedObject.publishedAt,
        
        status: updatedObject.status,
        tier: updatedObject.tier,
        slug:updatedObject.slug,

        excerpt: updatedObject.excerpt,
    }

    const updatedFields = {
        ...existingObject,
        ...newFields
    }

    return updatedFields;

};

/**
 * format looks like this:
 *
 *
 */

// const exampleObject = {
//   content: "htlm content",
//   date: "2022-11-14T21:28:53.240Z",
//   deal: null,
//   excerpt: "UI Tips are everywhere",
//   featuredImage:
//     "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/e7569c8beb86c4640176eb4a8ba7f89b.png",
//   gallery: null,
//   id: "7301",
//   legacyFeaturedImage:
//     "https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/07/Frame-1-22-1.png",
//   legacyLogo: null,
//   link: null,
//   localizations: [],
//   logo: null,
//   owner: "717",
//   published_at: "2022-07-13T09:46:17.000Z",
//   seo: {
//     id: 8053,
//     metaRobotsNoindex: null,
//     metaRobotsNofollow: null,
//     canonical: null,
//     metaDesc:
//       "UI Tips are everywhere – is it me, or is it my twi…m seeing lots and lots of ‘UI/UX Tips’. Lists of ",
//   },
//   slug: "are-ui-tips-the-new-clickbait-for-designers---lajhxqoobpq7a3lpjk",
//   status: "publish",
//   tier: 5,
//   title: "Are UI Tips the New Clickbait for Designers?✨",
//   type: "article",
// };

/**
 * update object looks like this:
 */

// const updateObject = {
//     content: exampleObject.content,
//     date: exampleObject.date,
//     legacyId: parseInt(exampleObject.id),
//     title: exampleObject.title,
//     excerpt: exampleObject.excerpt,
//     slug: exampleObject.slug,
//     createdAt: exampleObject.published_at,
//     updatedAt: exampleObject.updatedAt,
//     publishedAt: exampleObject.published_at,
//     locale: exampleObject.locale,
//     type: exampleObject.type,
//     link: exampleObject.link,
//     status: exampleObject.status,
//     featured: false,
//     tier: exampleObject.tier,
//     esES: false,
//     template: 1,
//     postViewMilestone: null,
//     promoted: null,
//     seo: {
//         id: exampleObject.seo.id,
//         metaRobotsNoindex: null,
//         metaRobotsNofollow: null,
//         canonical: null,
//         metaDesc: exampleObject.seo.metaDesc,
//         opengraphDescription: exampleObject.seo.metaDesc,
//         opengraphModifiedTime: null,
//         opengraphPublishedTime: null,
//         opengraphTitle: exampleObject.title,
//         opengraphUrl: null,
//         opengraphImage: exampleObject.featuredImage.data.attributes.url,
//         twitterDescription: exampleObject.seo.metaDesc,
//         twitterImage: exampleObject.featuredImage.data.attributes.url,
//         twitterTitle: exampleObject.title,
//         schemaSeo: null,
//     },
//     featuredImage: {
//         data: {
//             id: exampleObject.featuredImage.data.id,
//             attributes: {
//                 url: exampleObject.featuredImage.data.attributes.url,
//             },
//         },
//     },
//     legacyFeaturedImage: {
//         id: exampleObject.legacyFeaturedImage.id,
//         mediaItemUrl: exampleObject.legacyFeaturedImage.mediaItemUrl,
//     },
//     legacyAttributes: {
//         id: exampleObject.legacyAttributes.id,
//         imgUrl: exampleObject.legacyAttributes.imgUrl,
//     },
//     tags: {
//         data: exampleObject.tags.data.map((tag) => ({
//             id: tag.id,
//             attributes: {
//                 createdAt: tag.attributes.createdAt,
//                 updatedAt: tag.attributes.updatedAt,
//                 locale: tag.attributes.locale,
//                 slug: tag.attributes.slug,
//                 name: tag.attributes.name,
//             },
//         })),
//     },
// };
