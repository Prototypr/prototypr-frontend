
import dynamic from "next/dynamic";

import Container from "@/components/container";
import Image from "next/image";
import SmallCard from "@/components/v4/card/SmallCard/SmallCardB";
import ToolLargeCardProfile from "@/components/v4/card/ToolLargeCardProfile";
import { useRouter } from "next/router";
import Button from "../Primitives/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import gumletLoader from "@/components/new-index/gumletLoader";
import useUser from "@/lib/iron-session/useUser";

import { accountLocations } from "@/lib/constants";
import {CircleWavyCheck } from "phosphor-react";


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
  previewOnly=false,
  unapproved=false
}) =>{
    const router = useRouter();
    const {user} = useUser()

    const [posts,setPosts] = useState()
    const [currentPage,setCurrentPage] = useState()

    const [location, setLocation] = useState()


    useEffect(()=>{
        if(previewOnly){
            let first4 = allPosts?.slice(0,4)
            setPosts(first4)
        }else{
            setPosts(allPosts)
        }
    },[allPosts])

    const [isOwner, setIsOwner] = useState(false)

    useEffect(()=>{
        setIsOwner(user?.profile?.slug==slug)
        if(author?.location){
            for(var x =0;x<accountLocations?.length;x++){
                if(accountLocations[x]?.Code==author?.location){
                    setLocation(accountLocations[x]?.Name)
                }
            }
        }
    },[user, slug, author])

    const onPageNumChange = (pageNum) => {
        setCurrentPage(pageNum)
        router.push(`/people/${slug}/page/${pageNum}`);
      };

    return(
        <Container maxWidth="max-w-[1320px]" >
        {unapproved?<div className="px-6">
            <div className="mt-3 shadow-sm flex w-full bg-purple-300/70 p-4 px-4 rounded-xl text-purple-900">
            <div className="mr-4 my-auto">
            <CircleWavyCheck size="44"/>
            </div>
            <p className="max-w-4xl">
            Your profile is <span className="font-semibold inline">pending approval</span>, and is <span className="font-semibold inline">not publicly visible</span> yet. 
            <br/><Link href="/account"><span className="underline font-semibold">Complete your profile</span></Link> to get approved faster! Profiles are individually approved for quality and community safety.
            <br/>Until then, you can still submit articles and tools, and interact with the site as usual! 💜 
            </p>
            </div>
        </div>:''}
        <div className="mt-8 flex flex-col lg:flex-row px-4 md:px-6">
            
          <div className="w-full lg:w-1/4 lg:block">
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="relative">
                <div
                    className="w-[144px] bg-white h-[144px] rounded-full border border-1 overflow-hidden relative border-black/10 shadow-sm"
                >

                    {unapproved?
                    <img src={author?.avatar?.url?author?.avatar?.url:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}/>
                    :(author?.avatar || author?.legacyAvatar) && (
                    <Link href={`/people/${slug}`}>
                        <Image
                            loader={gumletLoader}
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
                    </Link>
                    )}
                </div>
                <h1 className="text-3xl pt-3 font-semibold leading-normal text-gray-800 mb-3">
                    {`${author?.firstName ? author?.firstName:''} ${author?.lastName ? author?.lastName:''}
                    ${(!author?.firstName && !author?.lastName) ? author?.name:''}`}
                    </h1>
                </div>
            <div className="">
              <div className="mb-3">
               
                {(author && location) && (
                  <div className="text-sm flex leading-normal mt-0 text-gray-600 font-normal capitalize">
                    <img
                      style={{ height: "0.94rem" }}
                      className="my-auto mr-1"
                      src="/static/images/icons/map-pin.svg"
                      data-gumlet="false"
                    />
                    <span>{location}</span>
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
                <div className="text-lg text-gray-700 mt-3 mb-3">
                  <div dangerouslySetInnerHTML={{ __html: author.bio }} />
                </div>
              )}

              {/* {author.role && (
                <h3 className="text-lg font-normal leading-normal mb-2 mt-4 text-gray-800">
                  {author.role}
                </h3>
              )} */}

            {(unapproved==true && author?.tags?.length) ?
            author?.tags?.map((tag, index) => (
                <Link href={`/posts/${tag?.slug}/page/1/`}>
                    <div className={`capitalize inline-block px-2 text-xs py-0.5 bg-[#d8e5f8]/70 rounded-full mr-1.5 mb-1`}>
                    {tag?.name}
                    </div>
                </Link>
              ))
              :(author?.tags?.data?.length) ?
              author?.tags?.data?.map((tag, index) => (
                <Link href={`/posts/${tag.attributes?.slug}/page/1/`}>
                    <div className={`capitalize inline-block px-2 text-xs py-0.5 bg-[#d8e5f8]/70 rounded-full mr-1.5 mb-1`}>
                    {tag.attributes?.name}
                    </div>
                </Link>
              )):''}

              {/* {skills.length > 0 &&
                skills[0].length > 1 &&
                skills.map((skill, index) => (
                  <div
                    key={`author_tags_${skill}`}
                    className="bg-gray-200 capitalize mr-2 mb-2 text-gray-600 text-xs px-2 py-1 rounded inline-block"
                  >
                    {"# " + skill}
                  </div>
                ))} */}

            {isOwner?
            <Link href={`/account`}>
                <div className="pt-4 cursor-pointer text-blue-600 hover:text-blue-500 text-base font-medium">
                    Edit profile
                </div>  
            </Link>
            :''}
            </div>
            </div>

            <div className="mt-3 md:mt-6 top-0 right-0 md:relative">
              {((twitter||dribbble||github || kofi)||(unapproved && (user?.profile?.twitter||user?.profile?.dribbble||user?.profile?.github||user?.profile?.kofi)))?
              <div className="bg-white rounded-xl p-4 mb-20 shadow-sm mt-1 md:mt-3 z-20">
                <h2 className="font-semibold mb-3">Around the web</h2>
                {author && author.url && (
                  <div className="text-sm mb-4 flex leading-normal mt-1 text-gray-600 font-normal">
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
                <div className="flex">
                {(twitter || (unapproved && user?.profile?.twitter)) && (
                  <a
                    className="link block mr-2"
                    href={`https://twitter.com/${twitter||user?.profile?.twitter}`}
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
                {(dribbble || (unapproved && user?.profile?.dribbble)) && (
                  <a
                    className="link block mr-2"
                    href={`https://dribbble.com/${dribbble||user?.profile?.dribbble}`}
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
                {(github || (unapproved && user?.profile?.github))&& (
                  <a
                    className="link block mr-2"
                    href={`https://github.com/${github||user?.profile?.github}`}
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
              {(kofi || (unapproved && user?.profile?.kofi)) && (
              <div className="">
                              <div className="w-full border-b border-black/5 my-3" />

                <h2 className="font-medium text-sm mb-2 text-gray-700">Support {author?.firstName?author?.firstName:''}</h2>
                <KoFiButton
                  color="#53b1e6"
                  label={"Buy me a coffee"}
                  kofiId={kofi||user?.profile?.kofi}
                />
              </div>
              )}
              </div>:''}
            </div>

           
          </div>

          <div className="flex-1 lg:pl-8 xl:pl-12">
            <div className="mx-auto mb-20 xl:max-w-4xl mt-6 lg:mt-0">
              
              {allPosts?.length ?
                <>
                        {currentPage==1 || !currentPage?<h2 className="font-semibold text-base mb-3">Recent posts</h2>:<h2 className="font-semibold text-base mb-3">Page {currentPage}</h2>}
                    <div className="grid grid-cols-12 gap-6">
                        {posts?.map((post,index)=>{
                        let authorData = post.attributes?.author?.data?.attributes
                        let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
                        let url = post?.attributes?.featuredImage?.data?.attributes?.url;
                        const coverImage = url
                            ? url
                            : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;
                        
                        if(post?.attributes?.type=='article'){
                            return(
                                <div className="col-span-12 2md:col-span-6 lg:col-span-12 xl:col-span-6 p-3 bg-white rounded-xl shadow-sm">
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
                                <div className="col-span-12 2md:col-span-6 lg:col-span-12 xl:col-span-6 p-3 bg-white rounded-xl shadow-sm">
                            <ToolLargeCardProfile
                            tool={post?.attributes}
                            />
                            </div>
                            )
                        }
                        })}
                </div>
                </>
            :''}
          {!previewOnly?<div className={`${allPosts?.length?'pt-6':''}`}>
            <NewPagination
                      total={pagination?.total}
                      pageSize={PAGE_SIZE}
                      currentPage={pagination?.page}
                      onPageNumChange={(pageNum, slug) => {
                        onPageNumChange(pageNum, slug);
                      }}
                    />
          </div>:pagination?.total>4?
          <Link href={`/people/${slug}/page/1`}>
            <Button variant="ghostBlue" className="mt-6">
                Show all
                </Button>
          </Link>
            :''}
         {previewOnly? 
         <div className={`${allPosts?.length?'pt-8':''}`}>
             <h2 className="font-semibold text-base mb-3">Recent activity</h2>
             <EmptyState/>
        </div>
        :''}
            </div>
          </div>

        </div>
      </Container>
    )
}

export default ProfilePageLayout


const EmptyState = () =>(
    <div className="mt-3 mx-auto rounded-lg border border-gray-300">
          <div className="pt-8 pb-8 px-6">
            <img
              width="108"
              className=" mx-auto "
              src="https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png"
              style={{ opacity: "0.88" }}
            />
            <h1 className="text-lg text-gray-500 pt-0 mt-4 text-center">
             No activity yet...
            </h1>
            {/* {currentTab=='draft' && (
              <div class="flex justify-center w-full my-3">
                <NewPostDialog button={true}/>
              </div>
            )} */}
          </div>
        </div>
  )