import Image from "next/image";

const SponsorBubble = () => {
  return (
    <div className="z-10 absolute right-0 bottom-0 p-3">
      <a href="https://letter.so?ref=prototypr?utm=headerbadge" target="_blank">
        <div className="flex bg-gray-100 backdrop-blur-sm bg-opacity-90 rounded-3xl p-0.5">
          <div
            className={`relative w-9 h-9 overflow-hidden rounded-full border border-gray-100`}
          >
            <Image
              className="object-cover"
              layout="fill"
              src={`/static/images/placeholder/letter-logo.png`}
            />
          </div>
          <div className="pl-1 my-auto text-xs font-medium pr-3 text-gray-500">
            Supported <br /> by Letter
          </div>
        </div>
      </a>
    </div>
  );
};
export default SponsorBubble;
