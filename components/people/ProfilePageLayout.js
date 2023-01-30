
import dynamic from "next/dynamic";

import Container from "@/components/container";
import Image from "next/image";
import SmallCard from "@/components/v4/card/SmallCard/SmallCardB";
import ToolLargeCardProfile from "@/components/v4/card/ToolLargeCardProfile";
import { useRouter } from "next/router";

const KoFiButton = dynamic(() => import("@/components/people/KoFiButton"), {
    ssr: true,
  });

  const PAGE_SIZE = 12;
const NewPagination = dynamic(() => import("@/components/pagination"));
const ProfilePageLayout = ({
    allPosts = [],
  preview,
  pagination,
  slug = "",
  pageNo = 1,
  author = {},
  gradient = "",
  kofi = null,
  github = null,
  twitter = null,
  dribbble = null,
  authorUrl = "",
  skills = [],
}) =>{
    const router = useRouter();

    const onPageNumChange = (pageNum) => {
        router.push(`/people/${slug}/page/${pageNum}`);
      };

    return(
        <Container maxWidth="max-w-[1320px]" >
        <div className="mt-8 flex flex-col md:flex-row px-4 md:px-6">
          <div className="w-full md:w-1/4 lg:block">
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative">
                <div
                    className="w-[128px] bg-white h-[128px] rounded-full border border-1 overflow-hidden relative border-black/10 shadow-sm"
                >

                    {(author?.avatar || author?.legacyAvatar) && (
                    <Image
                        layout="fill"
                        objectFit="cover"
                        src={
                        author.avatar?.data?.attributes
                            ? author.avatar.data.attributes.url
                            : author?.legacyAvatar
                            ? author.legacyAvatar
                            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
                        }
                        className="rounded-full "
                        alt="Author profile picture"
                    />
                    )}
                </div>
                <h1 className="text-2xl pt-3 font-semibold leading-normal text-gray-800 mb-3">
                    {`${author?.firstName ? author?.firstName:''} ${author?.lastName ? author?.lastName:''}
                    ${(!author?.firstName && !author?.lastName) ? author?.name:''}`}
                    </h1>
                </div>
            <div className="">
              <div className="mb-3">
               
                {author && author.location && (
                  <div className="text-sm flex leading-normal mt-0 text-gray-600 font-normal uppercase">
                    <img
                      style={{ height: "0.94rem" }}
                      className="my-auto mr-1"
                      src="/static/images/icons/map-pin.svg"
                      data-gumlet="false"
                    />
                    <span>{author.location}</span>
                  </div>
                )}
                {author && author.url && (
                  <div className="text-sm flex leading-normal mt-1 text-gray-600 font-normal">
                    <img
                      style={{ height: "0.94rem" }}
                      className="h-4 my-auto mr-1"
                      src="/static/images/icons/link.svg"
                      data-gumlet="false"
                    />
                    <span>
                      <a
                        className="underline"
                        target="_blank"
                        rel="nofollow"
                        href={author.url}
                      >
                        {authorUrl}
                      </a>
                    </span>
                  </div>
                )}
              </div>
              {author.availability == "1" && (
                <a
                  className="hidden md:block cursor-pointer mb-1 inline-block"
                  rel="nofollow"
                  target="_blank"
                  href={`${author.url ? author.url : "#"}`}
                >
                  <div className=" bg-blue-900 mr-2 mb-2 uppercase text-gray-100 text-xs px-3 py-2 rounded inline-block">
                    <span className="hidden sm:block">
                      🔥 Available for hire
                    </span>
                    <span className="sm:hidden">🔥 Hire me</span>
                  </div>
                </a>
              )}

            {author.bio && (
                <div className="text-sm text-gray-700 mt-3 mb-3">
                  <div dangerouslySetInnerHTML={{ __html: author.bio }} />
                </div>
              )}
              {/* {author.role && (
                <h3 className="text-lg font-normal leading-normal mb-2 mt-4 text-gray-800">
                  {author.role}
                </h3>
              )} */}

              {skills.length > 0 &&
                skills[0].length > 1 &&
                skills.map((skill, index) => (
                  <div
                    key={`author_tags_${skill}`}
                    className="bg-gray-200 capitalize mr-2 mb-2 text-gray-600 text-xs px-2 py-1 rounded inline-block"
                  >
                    {"# " + skill}
                  </div>
                ))}


            </div>
            </div>

            <div className="mt-3 md:mt-6 top-0 right-0 md:relative">
              {twitter||dribbble||github || kofi?
              <div className="bg-white rounded-xl p-4 shadow-sm mt-1 md:mt-3 z-20">
                <h2 className="font-semibold mb-3">Around the web</h2>
                <div className="flex">
                {twitter && (
                  <a
                    className="link block mr-2"
                    href={`https://twitter.com/${twitter}`}
                    target="_blank"
                  >
                    <img
                      style={{ width: "28px" }}
                      className=" bg-white rounded-full shadow-sm hover:shadow-md"
                      src="/static/images/icons/twitter.svg"
                      data-gumlet="false"
                    />
                  </a>
                )}
                {dribbble && (
                  <a
                    className="link block mr-2"
                    href={`https://dribbble.com/${dribbble}`}
                    target="_blank"
                  >
                    <img
                      style={{ width: "28px" }}
                      className=" bg-white rounded-full shadow-sm hover:shadow-md"
                      src="/static/images/icons/dribbble.svg"
                      data-gumlet="false"
                    />
                  </a>
                )}
                {github && (
                  <a
                    className="link block mr-2"
                    href={`https://github.com/${github}`}
                    target="_blank"
                  >
                    <img
                      style={{ width: "28px" }}
                      className=" bg-white rounded-full shadow-sm hover:shadow-md"
                      src="/static/images/icons/github.svg"
                      data-gumlet="false"
                    />
                  </a>
                )}
              </div>
              {kofi && (
              <div className="">
                              <div className="w-full border-b border-black/5 my-3" />

                <h2 className="font-medium text-sm mb-2 text-gray-700">Support {author?.firstName?author?.firstName:''}</h2>
                <KoFiButton
                  color="#53b1e6"
                  label={"Buy me a coffee"}
                  kofiId={kofi}
                />
              </div>
              )}
              </div>:''}
            </div>

           
          </div>

          <div className="flex-1 pl-12">
            <div className="mx-auto mb-20 max-w-4xl">
              {allPosts.length ?
              <div className="grid grid-cols-12 gap-6">
                {allPosts.map((post,index)=>{
                  let authorData = post.attributes?.author?.data?.attributes
                  let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
                  let url = post?.attributes?.featuredImage?.data?.attributes?.url;
                  const coverImage = url
                    ? url
                    : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;
                   
                  if(post?.attributes?.type=='article'){
                      return(
                        <div className="col-span-6 p-3 bg-white rounded-xl shadow-sm">
                        <SmallCard
                        key={index}
                        showAuthor={false}
                        link={`/post/${post?.attributes?.slug}`}
                        avatar={avatar}
                        author={post?.attributes?.author?.data?.attributes}
                        image={coverImage}
                        date={post?.attributes?.date}
                        title={post?.attributes?.title}
                        tags={post?.attributes?.tags?.data}
                      />
                      </div>
                      )
                  }else{
                    return(
                      <div className="col-span-6 p-3 bg-white rounded-xl shadow-sm">
                      <ToolLargeCardProfile
                      tool={post?.attributes}
                      />
                      </div>
                    )
                  }
                })}
          </div>:''}
          <div className="pt-6">
            <NewPagination
                      total={pagination?.total}
                      pageSize={PAGE_SIZE}
                      currentPage={pagination?.page}
                      onPageNumChange={(pageNum, slug) => {
                        onPageNumChange(pageNum, slug);
                      }}
                    />
          </div>
            </div>
          </div>

        </div>
      </Container>
    )
}

export default ProfilePageLayout