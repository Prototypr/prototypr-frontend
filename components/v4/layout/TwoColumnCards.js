import Link from "next/link";

const TwoColumnCards = ({
  posts,
  image = "",
  color = "#2F9A75",
  repeat = true,
  imageSize = "40%",
  backgroundPosition = "center center,",
  content = {
    title: "Placeholder title",
    description: "Discover tools, automate everything.",
  },
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: imageSize ? imageSize : "40%",
        backgroundRepeat: repeat ? "repeat" : "no-repeat",
        backgroundPosition: backgroundPosition
          ? backgroundPosition
          : "center center",
      }}
      className="flex flex-col w-full h-auto sm:h-[300px] overflow-hidden rounded-3xl "
    >
      <div
        style={{
          backgroundImage: `linear-gradient(91.39deg, ${color} 30.49%, rgba(48, 155, 118,0) 50.61%)`,
        }}
        className="w-[200%] sm:w-[100%] h-full p-6 sm:p-10 flex flex-col gap-2"
      >
        <div className="flex flex-col gap-0">
          <h3 className="font-bold text-white text-[24px] sm:text-[36px]">
            {content.title}
          </h3>

          <p className="text-white max-w-[300px] sm:max-w-md text-opacity-70 text-[16px] sm:text-[24px]">
            {content.description}
          </p>
        </div>
        <div>
          <button className="px-6 py-4 font-medium bg-white rounded-full text-black text-xs">
            Explore Tools {"->"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnCards;
