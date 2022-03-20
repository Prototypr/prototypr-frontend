import PostPreview from './post-preview'

export default function MoreStories({ posts, type, route }) {

  return (
    <section>
      {/* <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More {type=='toolbox'?'Tools':'Posts'}
      </h2> */}
      <div className={`grid grid-cols-1 ${type === 'toolbox' ? ' md:grid-cols-3' : ' md:grid-cols-2'} md:gap-y-10 gap-y-10 lg:gap-y-10 gap-x-10 md:gap-x-10 pb-16`}>
        {posts.map((post) => (
          <PostPreview
            key={post.attributes.slug}
            title={post.attributes.title}
            coverImage={post.attributes.legacyFeaturedImage ?post.attributes.legacyFeaturedImage:null}
            date={post.attributes.date}
            author={(post.attributes.author && post.attributes.author.data) ?post.attributes.author.data.attributes:null}
            slug={post.attributes.slug}
            excerpt={post.attributes.excerpt}
            type={type}
            tag={(post.attributes.tags && (post.attributes.tags.data && post.attributes.tags.data[0])) ? post.attributes.tags.data[0]: null}
          />
        ))}
      </div>
    </section>
  )
}
