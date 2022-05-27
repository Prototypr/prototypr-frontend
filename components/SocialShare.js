export default function SocialShare({ slug, authorTwitter, title = "" }) {
  const titleUrl = encodeURI(title);
  //   const url = encodeURI(slug);

  return (
    <div className="my-auto px-1">
      <a
        target="_blank"
        href={`
        https://twitter.com/intent/tweet?url=https%3A%2F%2Fprototypr.io%2F${slug}%2F&via=prototypr&text=Recommended%20read:%20%22${titleUrl}%22${
          authorTwitter ? "%20by%20" + authorTwitter : ""
        }%20✨%20check%20it%20out!`}
      >
        <img
          alt="Share on twitter"
          className="w-6 h-6"
          src="/static/icons/twitter.svg"
        />
      </a>
    </div>
  );
}
