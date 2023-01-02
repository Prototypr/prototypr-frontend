import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "@/components/container";
import PostTitle from "@/components/post-title";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));

const ToolBoxDisplay = ({ posts, type }) => {
  return (
    <div className="grid grid-cols-2 p-6 gap-6 w-full flex-wrap">
      {posts.map((post, i) => {
        const coverImage = post.attributes.featuredImage?.data?.attributes?.url
          ? post.attributes.featuredImage.data.attributes.url
          : post.attributes.legacyFeaturedImage
          ? post.attributes.legacyFeaturedImage
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

        return (
          <div
            key={post.attributes.slug}
            className="w-auto flex flex-row justify-between gap-6 p-5 bg-white rounded-2xl border border-black border-opacity-10"
          >
            <div className="flex flex-row gap-4">
              {coverImage?.logoNew && (
                <div
                  className="p-1 rounded-2xl overflow-hidden bg-gray-50"
                  style={{ height: "75px", width: "75px" }}
                >
                  <Image
                    loader={gumletLoader}
                    priority={false < 2 ? `true` : `false`}
                    data-priority={false < 2 ? `true` : `false`}
                    fetchpriority={false < 2 ? "true" : "false"}
                    data-gmlazy={false < 2 ? `false` : `true`}
                    width="100"
                    height="100"
                    alt="Brand logo for external website's link"
                    className=" border rounded-2xl bg-white"
                    src={coverImage?.logoNew}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <p className="font-semibold line-clamp-3">
                  {post.attributes.title}
                </p>
                <p className="text-[#989898]">Pro Editing for everyone</p>
              </div>
            </div>
            <div>
              <Link href={`/toolbox/${post.attributes.slug}`}>
                <button className="px-8 py-2 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  Get
                </button>
              </Link>
            </div>
          </div>
          // <PostPreview
          //   key={post.attributes.slug}
          //   title={post.attributes.title}
          //   coverImage={
          //     post.attributes.featuredImage?.data?.attributes?.url
          //       ? post.attributes.featuredImage.data.attributes.url
          //       : post.attributes.legacyFeaturedImage
          //       ? post.attributes.legacyFeaturedImage
          //       : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
          //   }
          //   date={post.attributes.date}
          //   author={
          //     post.attributes.author && post.attributes.author.data
          //       ? post.attributes.author.data.attributes
          //       : null
          //   }
          //   slug={post.attributes.slug}
          //   excerpt={post.attributes.excerpt}
          //   type={type}
          //   route={route}
          //   tag={
          //     post.attributes.tags &&
          //     post.attributes.tags.data &&
          //     post.attributes.tags.data[0]
          //       ? post.attributes.tags.data[0]
          //       : null
          //   }
          // />
        );
      })}
    </div>
  );
};

const ToolboxIndexPage = ({
  title,
  description,
  pagination,
  urlRoot,
  breadcrumbs,
  allPosts,
  pageSize,
  filterCategories,
  currentSlug,
  paginationRoot,
}) => {
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/${urlRoot}/page/${pageNo}`);
  };

  return (
    <>
      <div className="">
        <div
          style={{ backgroundImage: `url(${"/static/images/proto-bg.svg"})` }}
          className={`border-b h-auto bg-[#22866D] border-gray-900 border-opacity-10 -mt-6 pt-10 -mx-8 px-6 pb-9 overflow-hidden relative`}
        >
          <div className="max-w-[1440px] relative flex flex-col mx-auto md:px-6 text-sm">
            <div className="flex flex-col gap-4 w-auto py-20">
              <div className="w-[100px] h-[100px] bg-white rounded-3xl shadow-md"></div>
              <h1 className="text-5xl text-white font-bold tracking-tighter leading-tight capitalize">
                {title}
              </h1>
              <div>
                <div className="relative w-auto  bg-white p-4 rounded-xl">
                  <Breadcrumbs
                    urlRoot={urlRoot}
                    title={title}
                    currentSlug={currentSlug}
                    links={breadcrumbs.links}
                    pageNo={pagination?.page}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            {allPosts.length > 0 && (
              <div className="w-full h-full grid grid-cols-12 gap-1">
                <Sidebar
                  paginationRoot={paginationRoot}
                  urlRoot={urlRoot}
                  filterCategories={filterCategories}
                  slug={currentSlug}
                />
                <div className="w-full px-3 md:px-8 lg:px-0 pt-8 mx-auto pb-20 gap-2 col-span-12 md:col-span-10 pb-10">
                  <div className="col-span-3">
                    <ToolBoxDisplay posts={allPosts} type="toolbox" />
                    <NewPagination
                      total={pagination?.total}
                      pageSize={pageSize}
                      currentPage={pagination?.page}
                      onPageNumChange={(pageNum) => {
                        onPageNumChange(pageNum);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ToolboxIndexPage;

const Sidebar = ({ filterCategories, paginationRoot, urlRoot, slug }) => {
  return (
    <div className="hidden md:block relative col-span-2 max-w-[410px] border-r border-opacity-20">
      <div className="w-full min-h-screen pt-8 flex flex-col">
        <FilterCategory
          urlRoot={urlRoot}
          paginationRoot={paginationRoot}
          items={filterCategories}
          key={"uxtools_item_"}
          slug={slug}
        />
      </div>
    </div>
  );
};
