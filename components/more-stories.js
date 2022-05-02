import PostPreview from "./post-preview";
import PeoplePostPreview from "./people-post-preview";
import { useIntl } from "react-intl";

export default function MoreStories({ posts, type, route }) {
  const intl = useIntl();
  const locale = intl.locale ? intl.locale : "en-US";

  return (
    <section>
      <div
        className={`grid grid-cols-1 ${
          type === "toolbox" || type === "people"
            ? " md:grid-cols-3"
            : " md:grid-cols-2"
        } md:gap-y-10 gap-y-10 lg:gap-y-10 gap-x-10 md:gap-x-10 pb-16`}
      >
        {posts.map((post, i) => {
          if (type !== "people") {
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
          } else {
            return (
              <PeoplePostPreview
                key={`peoplecard_${
                  post.attributes.slug ? post.attributes.slug : i
                }`}
                location={post.attributes?.location}
                bio={post.attributes?.bio}
                title={post.attributes.username}
                slug={post.attributes.slug}
                legacyAvatar={post.attributes.legacyAvatar}
                avatar={post.attributes.avatar?.data?.attributes?.url}
                skills={post.attributes.skills}
              />
            );
          }
        })}
      </div>
    </section>
  );
}
