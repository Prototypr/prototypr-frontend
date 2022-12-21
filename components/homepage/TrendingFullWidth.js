import Link from "next/link";
import Container from "@/components/container";
import gumletLoader from "../new-index/gumletLoader";
import Image from "next/image";

const TrendingFullWidth = ({ tools, sponsor }) => {
  console.log(sponsor)
    return (
      <Container maxWidth='max-w-[984px] pt-28 px-6 lg:px-3 '>
              <h1 className="font-semibold mt-2">Trending tools</h1>

              <div className="overflow-hidden overflow-x-scroll md:overflow-x-hidden">
                <div className="flex flex-row-reverse w-[140%] md:w-full mt-4 flex-row md:grid md:grid-cols-12 md:gap-4 justify-end items-end">
                {tools.map((item, index) => {
                  const { title, legacyFeaturedImage, tags, slug } =
                  item.attributes;
                  // const coverImage = legacyFeaturedImage?.mediaItemUrl?legacyFeaturedImage?.mediaItemUrl:'/static/images/placeholder/letter-ad.png'
                  const coverImage = legacyFeaturedImage?.mediaItemUrl?legacyFeaturedImage?.mediaItemUrl:'/static/images/placeholder/letter-ad.png'
                  const logo = legacyFeaturedImage?.logoNew?legacyFeaturedImage?.logoNew:'/static/images/placeholder/letter-ad.png'
              // return  <LargeCardWithImage type={type} data={post} />
              return  (
                <Link className="w-1/3 md:w-auto mr-3 md:mr-0 md:col-span-3 rounded-xl overflow-hidden" href={`/toolbox/${slug}`}>
                  <div className="h-[156px] w-full overflow-hidden relative rounded" >
                    <div className="w-full h-full absolute z-10 bg-gradient-to-b from-gray-800 to-black opacity-50"/>
                    <Image
                      loader={gumletLoader}
                      priority={`true`}
                      data-priority={`true`}
                      layout="fill"
                      data-gmlazy={`false`}
                      className="object-cover contrast-130 relative w-full h-full"
                      src={coverImage || "/static/images/placeholder/letter-ad.png"}
                    />
                    <div className="z-20 flex flex-col justify-end h-full w-full absolute p-3">
                      <div className="flex">
                        <div style={{flex: '0 0 42px'}} className="h-[42px] w-[42px] rounded-lg shadow-xl relative overflow-hidden">
                          <Image
                            loader={gumletLoader}
                            priority={`true`}
                            data-priority={`true`}
                            layout="fill"
                            data-gmlazy={`false`}
                            className="object-cover contrast-130 relative w-full h-full"
                            src={logo || "/static/images/placeholder/letter-ad.png"}
                          />
                        </div>
                        <h2 className="opacity-0 md:opacity-100 text-white clamp-2 overflow-hidden ml-2 my-auto font-semibold text-sm">{title}</h2>
                      </div>
                    </div>
                  </div>
                </Link>
                
                )
              })}
                <a target="_blank" className="w-1/3 md:w-auto mr-4 md:mr-0 col-span-4 md:col-span-3 rounded-xl overflow-hidden" href={sponsor?.link?sponsor.link:`https://letter.so`}>
                  <div className="h-[156px] w-full overflow-hidden relative rounded" >
                    <div className="w-full h-full absolute z-10 bg-black opacity-50"/>
                    <Image
                      loader={gumletLoader}
                      priority={`true`}
                      data-priority={`true`}
                      layout="fill"
                      data-gmlazy={`false`}
                      className="object-cover contrast-130 relative w-full h-full"
                      src={sponsor?.featuredImage?sponsor.featuredImage:"/static/images/placeholder/letter-ad.png"}
                    />
                  <div className="z-20 flex flex-col justify-end h-full w-full absolute p-3">
                  <div className="flex">
                    <div className="absolute top-0 right-0 mt-3 mr-3">
                      <span className="capitalize bg-gray-100 font-inter px-2 py-0.5 border border-black border-opacity-5 text-black text-xs rounded-full">Promoted</span>
                    </div>
                    <div style={{flex: '0 0 42px'}} className="h-[42px] w-[42px] rounded-lg shadow-xl relative overflow-hidden">
                        <Image
                          loader={gumletLoader}
                          priority={`true`}
                          data-priority={`true`}
                          layout="fill"
                          data-gmlazy={`false`}
                          className="object-cover contrast-150 relative w-full h-full"
                          src={"/static/images/placeholder/letter-logo.png"}
                        />
                      </div>
                      <h2 className="opacity-0 md:opacity-100 text-white clamp-2 overflow-hidden ml-2 my-auto font-semibold text-sm">{sponsor?.title?sponsor?.title:'Letter: Beautiful, Faster Emails'}</h2>

                    </div>
                  </div>
                  </div>
                </a>
              </div>
              </div>

       
      </Container>
    );
  };
export default TrendingFullWidth