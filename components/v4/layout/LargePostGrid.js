import BigCard from "../card/BigCard/BigCardB";
import SmallCard from "../card/SmallCard/SmallCardE";
const LargePostGrid = ({ largePost, smallPosts }) => {
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl;

    let authorData = largePost.attributes?.author?.data?.attributes
    const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
    let largePostAvatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
  return (
    <div className="flex flex-col max-w-[1320px]">
      <div>
        <BigCard
          link={`/post/${largePost?.attributes?.slug}`}
          avatar={largePostAvatar}
          excerpt={largePost?.attributes?.excerpt}
          author={largePost?.attributes?.author?.data?.attributes}
          image={largeCoverImage}
          date={largePost?.attributes?.date}
          title={largePost?.attributes?.title}
          tags={largePost?.attributes?.tags?.data}
        />
      </div>
      <div className="flex flex-col grid grid-cols-1 md:grid-cols-2 2md:flex-row gap-6 mt-8">
        {smallPosts?.length ? (
          smallPosts.map((post, index) => {
            let url = post?.attributes?.featuredImage?.data?.attributes?.url;
            const coverImage = url
              ? url
              : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;
              let authorData = post.attributes?.author?.data?.attributes
              let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
            return (
              <div key={index} className="w-full 2md:mt-3">
                <SmallCard
                  link={`/post/${post?.attributes?.slug}`}
                  avatar={avatar}
                  author={post?.attributes?.author?.data?.attributes}
                  image={coverImage}
                  date={post?.attributes?.date}
                  title={post?.attributes?.title}
                  tags={post?.attributes?.tags?.data}
                />
              </div>
            );
          })
        ) : (
          // mock posts
          <>
            <div className="w-full mt-6 2md:mt-0">
              <SmallCard
                image="/static/images/storybook/smallcard.png"
                title="Microsoft Designer: AI Prompt Design Principles"
                tags={[
                  { attributes: { name: "Accessibility", link: "/" } },
                  { attributes: { name: "Code", link: "/" } },
                ]}
              />
            </div>
            <div className="w-full mt-6 2md:mt-0">
              <SmallCard
                image="/static/images/storybook/smallcard.png"
                title="Microsoft Designer: AI Prompt Design Principles"
                tags={[
                  { attributes: { name: "Accessibility", link: "/" } },
                  { attributes: { name: "Code", link: "/" } },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default LargePostGrid;
