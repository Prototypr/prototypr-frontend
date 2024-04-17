import { FacebookLogo, TwitterLogo, LinkedinLogo } from "phosphor-react";

export default function SocialShare({ slug, authorTwitter, title = "" }) {
  const titleUrl = encodeURI(title);
  //   const url = encodeURI(slug);

  return (
    <div className="my-auto px-1 grid grid-cols-3 gap-4 w-[fit-content]">
      <div>
        <a
          target="_blank"
          href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fprototypr.io%2Fpost%2F${slug}%2F&via=prototypr&text=Recommended%20read:%20%22${titleUrl}%22${authorTwitter ? "%20by%20" + authorTwitter : ""}%20✨%20check%20it%20out!`}
        >
          <TwitterLogo width={28} height={28}/>
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href={`http://www.facebook.com/share.php?u=https%3A%2F%2Fprototypr.io%2Fpost%2F${slug}`}>
        <FacebookLogo width={28} height={28}/>
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fprototypr.io%2Fpost%2F${slug}`}
        >
                  <LinkedinLogo width={28} height={28}/>

        </a>
      </div>
    </div>
  );
}


export function SocialShareVertical({ slug, authorTwitter, title = "" }) {
  const titleUrl = encodeURI(title);
  //   const url = encodeURI(slug);

  return (
    <div className="my-auto px-1 grid grid-cols-1 gap-4 w-[fit-content]">
      <div className="text-gray-500 hover:text-black">
        <a
          target="_blank"
          href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fprototypr.io%2Ftoolbox%2F${slug}%2F&via=prototypr&text=Check%20it%20out%20%22${titleUrl}%22${authorTwitter ? "%20by%20" + authorTwitter : ""}%20on%20@Prototypr%20✨`}
        >
          <TwitterLogo width={24} height={24}/>
        </a>
      </div>
      <div className="text-gray-500 hover:text-black">
        <a
          target="_blank"
          href={`http://www.facebook.com/share.php?u=https%3A%2F%2Fprototypr.io%2Ftoolbox%2F${slug}`}>
        <FacebookLogo width={24} height={24}/>
        </a>
      </div>
      <div className="text-gray-500 hover:text-black">
        <a
          target="_blank"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fprototypr.io%2Ftoolbox%2F${slug}`}
        >
                  <LinkedinLogo width={24} height={24}/>

        </a>
      </div>
    </div>
  );
}
