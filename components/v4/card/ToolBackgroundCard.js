// import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const ToolBackgroundCard = ({ post, imageLarge,type, columns, tagNumber }) => {

    let title, slug, coverImage, tags, logo;

    title = post?.attributes?.title?post?.attributes?.title:post?.title;
    slug = post.attributes?.slug?post.attributes?.slug:post?.slug;

    if(tagNumber==1){
      tags = post?.attributes?.tags?.data.slice(0, 1);
      if(!tags && post?.tags?.data){
        tags = post?.tags?.data.slice(0, 1);
      }
    }else{
      tags = post?.attributes?.tags?.data.slice(0, 2);
      if(!tags && post?.tags?.data){
        tags = post?.tags?.data.slice(0, 2);
      }
    }
    // let tool = post.attributes

    // let coverImage =   
    // tool.featuredImage?.data?.attributes?.url
    //   ? tool.featuredImage.data.attributes.url
    //   : tool.legacyFeaturedImage
    //   ? tool.legacyFeaturedImage
    //   : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
      
    //   coverImage = (tool?.legacyMedia?.logoNew || coverImage?.logoNew || tool.legacyMedia?.mediaItemUrl)
      

    if(post?.attributes){
      coverImage = post.attributes?.featuredImage?.data?.attributes?.url
        ? post.attributes.featuredImage.data.attributes.url
        : post.attributes?.legacyFeaturedImage?.mediaItemUrl
        ? post.attributes?.legacyFeaturedImage?.mediaItemUrl
        : post.attributes?.legacyFeaturedImage2?.mediaItemUrl?
        post.attributes?.legacyFeaturedImage2?.mediaItemUrl
        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  
        logo = (post?.attributes?.legacyFeaturedImage?.logoNew || coverImage?.logoNew || post.attributes?.legacyMedia?.mediaItemUrl ||post.attributes?.legacyFeaturedImage?.mediaItemUrl)
      }else {
      coverImage = post.featuredImage?.data?.attributes?.url
        ? post.featuredImage.data.attributes.url
        : post.legacyFeaturedImage?.mediaItemUrl
        ? post.legacyFeaturedImage?.mediaItemUrl
        : post.legacyFeaturedImage2?.mediaItemUrl?
        post.legacyFeaturedImage2?.mediaItemUrl
        : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  
        logo = (post?.legacyFeaturedImage?.logoNew || coverImage?.logoNew || post.legacyMedia?.mediaItemUrl ||post.legacyFeaturedImage?.mediaItemUrl)
    }

    if(!logo){
      logo =   
  // post.legacyMedia?.logoNew?post.legacyMedia?.logoNew:
  // post.legacyMedia?.mediaItemUrl?post.legacyMedia?.mediaItemUrl:
  // post.legacyMedia?.imgUrl?post.legacyMedia?.imgUrl:
  post.attributes?.featuredImage?.data?.attributes?.url
    ? post.attributes?.featuredImage.data.attributes.url
    : post.attributes?.legacyFeaturedImage
    ? post.attributes?.legacyFeaturedImage
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
    
    logo = (post?.attributes?.legacyMedia?.logoNew || logo?.attributes?.logoNew || post.attributes?.legacyMedia?.mediaItemUrl)
    }


  return (
    <div className="h-full">

            <Link href={`/toolbox/${slug}`}>
            <div
        className={
          "flex pt-0 grid grid-col-1 gap-2 flex-grow h-full rounded-t-2xl shadow-md hover:shadow-xl bg-white relative rounded-2xl fade-"
        }
      >
        <div className="rounded-xl px-0 block cursor-pointer"
        >
          <div
            className="rounded-xl relative flex flex-col justify-end"
            style={{
            //   background: this.state.backgroundShimmer,
              display: "flex",
              height:imageLarge?"240px":"290px",
            }}
          >
            <div className="absolute top-0 left-0 z-10 rounded-2xl w-full h-full bg-gradient-to-b from-black/5 to-black/60"></div>
            <Image
              loader={gumletLoader}
              priority={false < 2 ? `true` : `false`}
              data-priority={false < 2 ? `true` : `false`}
              fetchpriority={false < 2 ? "true" : "false"}
              data-gmlazy={false < 2 ? `false` : `true`}
            //   fill={true}
            //   layout="fill"
            //   style={{width:'100%'}}
            //   width="100%"
            //   height="100%"
              alt="Brand logo for external website's link"
              className="object-cover rounded-2xl bg-white shadow-sm"
              src={coverImage}
              fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          <div className="rounded-xl z-20 p-4 flex ">
            <Image
                loader={gumletLoader}
                width={48}
                height={48}
              alt="Brand logo for external website's link"
              className="object-cover flex-none flex-shrink-0 shine rounded-xl shadow"
            //   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            //   data-src={coverImage}
              src={logo}
            />
             <div className="overflow-hidden my-auto ml-3">
            <div className={'line-clamp-1 text-white font-medium'}> {title}</div>
            {/* {this.props.prototool !== true && */}
            {tags?.length && (
                   <div className='text-xs text-white mt-0.5 capitalize'>{tags[0].attributes.name}</div>
                )}
             
            {/* <div className='w-1/4 relative'> {this._getTag()}</div> */}
          </div>
          </div>
          </div>
        </div>


        {/* {this._getFooter()} */}
      </div>
            </Link>
    </div>
  );
};

export default ToolBackgroundCard