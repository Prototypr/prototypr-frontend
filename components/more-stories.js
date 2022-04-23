import PostPreview from './post-preview'
import { useIntl } from 'react-intl';

export default function MoreStories({ posts, type, route }) {
  const intl = useIntl();
  const locale = intl.locale ? intl.locale : "en-US";

  return (
    <section>
      <div className={`grid grid-cols-1 ${type === 'toolbox' ? ' md:grid-cols-3' : ' md:grid-cols-2'} md:gap-y-10 gap-y-10 lg:gap-y-10 gap-x-10 md:gap-x-10 pb-16`}>
        {
          posts.map((post) => {
            return (
              <PostPreview
                key={post.attributes.slug}
                title={post.attributes.title}
                coverImage={post.attributes.featuredImage?.data?.attributes?.url ? post.attributes.featuredImage.data.attributes.url:post.attributes.legacyFeaturedImage ?post.attributes.legacyFeaturedImage:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}
                date={post.attributes.date}
                author={(post.attributes.author && post.attributes.author.data) ?post.attributes.author.data.attributes:null}
                slug={post.attributes.slug}
                excerpt={post.attributes.excerpt}
                type={type}
                tag={(post.attributes.tags && (post.attributes.tags.data && post.attributes.tags.data[0])) ? post.attributes.tags.data[0]: null}
            />
            )
        })}
        
      </div>
    </section>
  )
}
