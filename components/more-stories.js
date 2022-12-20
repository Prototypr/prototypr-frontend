import PostPreview from "./post-preview";

export default function MoreStories({ posts, type, route }) {

  return (
    <section>
      <div
        className={`grid grid-cols-1 ${
          type === "toolbox"
            ? " sm:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 px-6"
            : " md:grid-cols-2"
        } -mx-6 md:mx-0 gap-y-10 xl:gap-y-6 md:gap-y-6 gap-x-10 md:gap-x-6 xl:gap-x-6`}
      >
        {posts.map((post, i) => {
            return (
              <PostPreview
                key={post.attributes.slug}
                title={post.attributes.title}
                coverImage={
                  post.attributes.featuredImage?.data?.attributes?.url
                    ? post.attributes.featuredImage.data.attributes.url
                    : post.attributes.legacyFeaturedImage
                    ? post.attributes.legacyFeaturedImage
                    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                }
                date={post.attributes.date}
                author={
                  post.attributes.author && post.attributes.author.data
                    ? post.attributes.author.data.attributes
                    : null
                }
                slug={post.attributes.slug}
                excerpt={post.attributes.excerpt}
                type={type}
                route={route}
                tag={
                  post.attributes.tags &&
                  post.attributes.tags.data &&
                  post.attributes.tags.data[0]
                    ? post.attributes.tags.data[0]
                    : null
                }
              />
            );
          
        })}
      </div>
    </section>
  );
}
