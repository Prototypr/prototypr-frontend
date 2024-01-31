// import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import gumletLoader from "@/components/new-index/gumletLoader";

const ToolImageCard = ({ posts, type, columns, tagNumber }) => {
  return (
    <div className={`grid grid-cols-1 ${columns?columns:'lg:grid-cols-3'} gap-8 w-full flex-wrap`}>
      {posts.map((post, i) => {
        let title, slug, coverImage, tags, logo;


          title = post?.attributes?.title;
          slug = post.attributes?.slug;
          if(tagNumber==1){
            tags = post?.attributes?.tags?.data.slice(0, 1);
          }else{
            tags = post?.attributes?.tags?.data.slice(0, 2);
          }
          // let tool = post.attributes

          // let coverImage =   
          // tool.featuredImage?.data?.attributes?.url
          //   ? tool.featuredImage.data.attributes.url
          //   : tool.legacyFeaturedImage
          //   ? tool.legacyFeaturedImage
          //   : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
            
          //   coverImage = (tool?.legacyMedia?.logoNew || coverImage?.logoNew || tool.legacyMedia?.mediaItemUrl)
            

          coverImage = post.attributes?.featuredImage?.data?.attributes?.url
            ? post.attributes.featuredImage.data.attributes.url
            : post.attributes?.legacyFeaturedImage?.mediaItemUrl
            ? post.attributes?.legacyFeaturedImage?.mediaItemUrl
            : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";


            console.log(post)
            logo = (post?.attributes?.legacyFeaturedImage?.logoNew || coverImage?.logoNew || post.attributes?.legacyMedia?.mediaItemUrl ||post.attributes?.legacyFeaturedImage?.mediaItemUrl)


        return (
            <Link href={`/toolbox/${slug}`}>
            <div
        className={
          "flex flex-col- pt-4 pb-1 grid grid-col-1 gap-4 flex-grow h-full rounded-t-2xl shadow-md hover:shadow-xl bg-white relative rounded-2xl fade-"
        }
      >
        <div className="rounded-xl px-4 block cursor-pointer"
        >
          <div
            className="rounded-xl relative flex"
            style={{
            //   background: this.state.backgroundShimmer,
              display: "flex",
              height: "195px",
            }}
          >
            <div className="absolute top-0 left-0 z-10 rounded-xl w-full h-full bg-gradient-to-b from-black/5 via-black/10 to-black/40"></div>
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
              className="object-cover rounded-2xl bg-white"
              src={coverImage}
              fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div
            style={{ position: "absolute", marginTop: "-6px", left: "28px" }}
            className="rounded-xl bg-white z-20"
          >
            <Image
                loader={gumletLoader}
                width={48}
                height={48}
              alt="Brand logo for external website's link"
              className="object-cover flex-shrink-0 shine rounded-xl border-2 border-white bg-white shadow -mt-[22px]"
            //   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            //   data-src={coverImage}
              src={logo}
            />
          </div>
        </div>
        <div className="px-4 mb-3 mt-3 flex" >

        {/* <Image
                loader={gumletLoader}
                width={48}
                height={48}
              alt="Brand logo for external website's link"
              className="object-cover flex-none shine rounded-xl border-2 border-white bg-white shadow"
            //   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            //   data-src={coverImage}
              src={logo}
            /> */}
          {/* <div className="pl-3 overflow-hidden mt-1"> */}
          <div className="pl-3 overflow-hidden my-auto">
            <div className={'line-clamp-1 font-medium'}> {title}</div>
            {/* {this.props.prototool !== true && */}
            {tags?.length && (
                   <div className='text-xs text-gray-500 mt-0.5'>{tags[0].attributes.name}</div>
                )}
             
            {/* <div className='w-1/4 relative'> {this._getTag()}</div> */}
          </div>
          {/* {this.props.voteButton} */}
        </div>


        {/* {this._getFooter()} */}
      </div>
            </Link>
        );
      })}
    </div>
  );
};

export default ToolImageCard