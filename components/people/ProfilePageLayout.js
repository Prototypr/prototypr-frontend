
import dynamic from "next/dynamic";

import Container from "@/components/container";
import Image from "next/image";
// import SmallCard from "@/components/v4/card/SmallCard/SmallCardB";
// import ToolLargeCardProfile from "@/components/v4/card/ToolLargeCardProfile";
import { useRouter } from "next/router";
import Button from "../Primitives/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import gumletLoader from "@/components/new-index/gumletLoader";
import useUser from "@/lib/iron-session/useUser";

import { accountLocations } from "@/lib/constants";
import {CircleWavyCheck } from "phosphor-react";

import MediumPost from "../v4/card/SmallCard/MediumPost";
import ToolImageCardSingle from "../v4/card/ToolImageCardSingle";

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
        <div className="mt-8 flex flex-col px-4 md:px-6">
            
          <div className="w-full lg:block">
            <div className="relative p-6 rounded-xl ">
                <div className="relative flex justify-start">
                <div
                    className="w-[160px] bg-white h-[160px] rounded-full border border-1 overflow-hidden relative border-black/10 shadow-sm mr-4"
                >

                    {unapproved?
                    <img src={author?.avatar?.url?author?.avatar?.url:'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'}/>
                    :(author?.avatar || author?.legacyAvatar) && (
                    // <Link href={`/people/${slug}`}>
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
                    // </Link>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl font-semibold leading-normal text-gray-800">
                      {`${author?.firstName ? author?.firstName:''} ${author?.lastName ? author?.lastName:''}
                      ${(!author?.firstName && !author?.lastName) ? author?.name:''}`}
                      </h1>
                      {author.role && (
                        <h3 className="text-lg font-normal mb-3 leading-normal text-gray-800">
                          {author.role}
                        </h3>
                      )} 
                      {/* social row */}
                      {((twitter||dribbble||github || kofi)||(unapproved && (user?.profile?.twitter||user?.profile?.dribbble||user?.profile?.github||user?.profile?.kofi)))?
                        <div className="flex">
                          {author && author.url && (
                            <div className="text-sm mb-4 mr-8 flex leading-normal mt-1 text-gray-600 font-normal">
                              {/* <img
                                style={{ height: "0.94rem" }}
                                className="h-4 my-auto mr-1"
                                src="/static/images/icons/link.svg"
                                data-gumlet="false"
                              /> */}
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
                        {/* {(kofi || (unapproved && user?.profile?.kofi)) && (
                        <div className="">
                                        <div className="w-full border-b border-black/5 my-3" />

                          <h2 className="font-medium text-sm mb-2 text-gray-700">Support {author?.firstName?author?.firstName:''}</h2>
                          <KoFiButton
                            color="#53b1e6"
                            label={"Buy me a coffee"}
                            kofiId={kofi||user?.profile?.kofi}
                          />
                        </div>
                        )} */}
                           
                        </div>:''}
                </div>
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
                  <div className="absolute top-0 right-0 bg-blue-900 mr-8 mt-8 uppercase text-gray-100 text-xs px-3 py-2 rounded inline-block">
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

      

           
          </div>

          <div className="flex-1">
            <div className="mx-auto mb-20 mt-6 lg:mt-0">
              
              {allPosts?.length ?
                <>
                        {currentPage==1 || !currentPage?<h2 className="font-semibold text-base mb-3">Posts</h2>:<h2 className="font-semibold text-base mb-3">Page {currentPage}</h2>}
                    <div className="grid grid-cols-12 gap-6">
                        {posts?.map((post,index)=>{
                        const dummyAvatar = 'https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png'
                        let authorData = post.attributes?.author?.data?.attributes
                        let avatar = authorData?.avatar?.data?authorData?.avatar?.data?.attributes?.url:authorData?.legacyAvatar?authorData?.legacyAvatar:dummyAvatar
                        let url = post?.attributes?.featuredImage?.data?.attributes?.url;
                        const coverImage = url
                            ? url
                            : post?.attributes?.legacyFeaturedImage?.mediaItemUrl;
                        
                        if(post?.attributes?.type=='article'){
                            return(
                                <div className="h-full col-span-12 2md:col-span-3 lg:col-span-3 xl:col-span-3">
                                {/* <SmallCard
                                key={index}
                                showAuthor={false}
                                link={`/post/${post?.attributes?.slug}`}
                                avatar={avatar}
                                author={post?.attributes?.author?.data?.attributes}
                                image={coverImage}
                                date={post?.attributes?.date}
                                title={post?.attributes?.title}
                                tags={post?.attributes?.tags?.data}
                            /> */}
                            <MediumPost
                            showDescription={false}
                            imageSmall={true}
                            showAuthor={false}
                            link={`/post/${post?.attributes?.slug?post?.attributes?.slug:''}`}
                            avatar={avatar}
                            author={post?.attributes?.author?.data?.attributes?post?.attributes?.author?.data?.attributes:null}
                            image={coverImage}
                            date={post?.attributes?.date?post?.attributes?.date:null}
                            title={post?.attributes?.title?post?.attributes?.title:null}
                            excerpt={post?.attributes?.excerpt?post?.attributes?.excerpt:null}
                            tags={post?.attributes?.tags?.data?post?.attributes?.tags?.data:null}
                            />
                            </div>
                            )
                        }else{
                            return(
                                <div className="h-full col-span-12 2md:col-span-3 lg:col-span-3 xl:col-span-3">
                            {/* <ToolLargeCardProfile
                            tool={post?.attributes}
                            /> */}

                                <ToolImageCardSingle post={post} />
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
         {/* {previewOnly? 
         <div className={`${allPosts?.length?'pt-8':''}`}>
             <h2 className="font-semibold text-base mb-3">Recent activity</h2>
             <EmptyState/>
        </div>
        :''} */}
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