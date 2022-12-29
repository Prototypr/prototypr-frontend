import BigCard from "../card/BigCard";
import SmallCard from "../card/SmallCard";
const LargePostGrid = ({ largePost, smallPosts }) => {
  console.log(largePost);
  console.log(smallPosts);
  let url = largePost?.attributes?.featuredImage?.data?.attributes?.url;
  const largeCoverImage = url
    ? url
    : largePost?.attributes?.legacyFeaturedImage?.mediaItemUrl;
  return (
    <div className="flex flex-col">
      <div>
        <BigCard
          avatar={
            largePost?.attributes?.author?.data?.attributes?.avatar?.data
              ?.attributes?.url
          }
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
            return (
              <div key={index} className="w-full 2md:mt-3">
                <SmallCard
                  avatar={
                    post?.attributes?.author?.data?.attributes?.avatar?.data
                      ?.attributes?.url
                  }
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
