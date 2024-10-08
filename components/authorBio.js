import SocialShare from "@/components/SocialShare";
import Image from "next/image";
// import dynamic from "next/dynamic";
import { DribbbleLogo, GithubLogo, TwitterLogo } from "./icons";


import '~/react-kofi/dist/kofi.css';
import {KoFiButton} from "react-kofi";

export default function AuthorBio({ author, slug, title, showShare = true }) {
  const pic = author?.avatar?.data?.attributes?.url
    ? author?.avatar?.data?.attributes?.url
    : author?.legacyAvatar
      ? author?.legacyAvatar
      : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";

  const github = getGithubHandle(author?.github);
  const twitter = getTwitterHandle(author?.twitter);
  const dribbble = getDribbbleHandle(author?.dribbble);
  const kofi = getKofiHandle(author?.kofi);

  return (
    <div className="py-4">
      {showShare && <div
        className="flex md:px-0 justify-between mx-auto"
        style={{ maxWidth: "60rem" }}
      >
        <div className="my-auto mx-auto text-center pt-12">
          {/* <div className="w-full border-b border-gray-300 my-8" /> */}
          <div className="text-xs uppercase mb-4 mx-auto font-medium text-gray-600">
            Share to your friends
          </div>

          <div className="flex justify-center mt-1 max-w-md flex-wrap ">
            <SocialShare
              slug={slug}
              title={title}
              authorTwitter={author?.twitter}
            />
          </div>
        </div>
      </div>}
      <div className=" mx-auto" style={{ maxWidth: "60rem" }}>
        {showShare && <div className="w-full border-b border-gray-200 my-10" />}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex flex-col w-full">
            <div className="w-32 mx-auto flex justify-center">
              <a href={"/people/" + author?.slug}>
                <Image
                  width={100}
                  height={100}
                  alt="Author avatar"
                  className="flex-shrink-0 shine mb-2 w-[100px] h-[100px] cursor-pointer mt-2 rounded-full object-cover bg-white rounded-full "
                  src={pic}
                />
              </a>
            </div>
            <div className="w-full text-center">
              <h1 className="text-xl mt-1 font-semibold leading-normal text-black/90">
                {/* {author?.name ? author?.name : ""} */}
                {`${author?.firstName ? author?.firstName : ""}
                  ${author?.lastName ? " " + author?.lastName : ""}
                  ${!author?.firstName && !author?.lastName ? author?.name : ""}`}
              </h1>

              {author?.jobrole && (
                <h3 className="text-base font-normal leading-normal mb-1 text-black/80">
                  {author?.jobrole}
                </h3>
              )}
              {/* {author?.bio && (
                <div
                  style={{ maxWidth: "40rem" }}
                  className="text-lg text-gray-600 mt-3 pr-3 max-w-lg mx-auto"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: author.bio,
                    }}
                  />
                </div>
              )} */}
              <div className="flex mt-5 mb-3 z-20 justify-center">
                {author?.url && (
                  <a href={author?.url}>
                    <div
                      style={{
                        width: "25px",
                        height: "25px",
                        marginTop: "2px",
                      }}
                      className="text-sm flex justify-center flex-start leading-normal mr-2 text-gray-600 font-normal p-1 bg-gray-200 shadow-sm rounded-full p-1"
                    >
                      <img
                        className=" my-auto "
                        data-src="/static/images/icons/link.svg"
                      />
                      {/* <div className=""><a className="underline text-gray-600" target="_blank" href={this.props.user.url}>{this.props.user.url.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "")}</a></div> */}
                    </div>
                  </a>
                )}

                {kofi ? (
                  <div className="mr-4 inline-block">
                    <KoFiButton
                      color="#53b1e6"
                      label={"Buy me a coffee"}
                      kofiId={kofi}
                    />
                  </div>
                ) : (
                  ""
                )}

                {twitter && (
                  <a
                    className="link block mr-2"
                    href={`https://x.com/${twitter}`}
                    target="_blank"
                  >
                    <TwitterLogo color="rgba(0,0,0,0.8)" size={24} />
                  </a>
                )}
                {dribbble && (
                  <a
                    className="link block mr-2"
                    href={`https://dribbble.com/${dribbble}`}
                    target="_blank"
                  >
                    <DribbbleLogo color="rgba(0,0,0,0.8)" size={24} />
                  </a>
                )}
                {github && (
                  <a
                    className="link block mr-2"
                    href={`https://github.com/${github}`}
                    target="_blank"
                  >
                    <GithubLogo color="rgba(0,0,0,0.8)" size={24} />
                  </a>
                )}
              </div>
              {author?.availability == "1" && (
                <a
                  className="cursor-pointer"
                  target="_blank"
                  href={`${author?.url ? author?.url : "#"}`}
                >
                  <div className="bg-blue-800 mr-2 mb-2 mt-4 uppercase text-white text-xs px-3 py-2 rounded inline-block">
                    <span className="hidden sm:block">
                      🔥 Available for hire
                    </span>
                    <span className="sm:hidden">🔥 Hire me</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTwitterHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("twitter.com", "");
  result = result.replace("x.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return "@" + result;
}
function getDribbbleHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("dribbble.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
}
function getGithubHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("github.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
}

function getKofiHandle(string) {
  if (!string) {
    return false;
  }
  //https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  //remove protocols
  var result = string.replace(/(^\w+:|^)\/\//, "");
  result = result.replace(/\//g, "");
  result = result.replace("kofi.com", "");
  result = result.replace("www.", "");
  result = result.replace("@", "");

  return result;
}
