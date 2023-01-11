import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import { SearchBarToolbox } from "@/components/toolbox/toolboxSearchBox";

const MotionSliderToolCard = ({ title, subtext, image }) => {
  return (
    <div className="w-[450px] h-auto cursor-pointer relative rounded-2xl border border-opacity-20 bg-white grid grid-items-center p-4">
      <div className="flex flex-row gap-3">
        <div className="w-18 h-18 bg-gray-100 border border-black border-opacity-10 overflow-hidden rounded-xl relative">
          <img src={image} className="w-full h-full"></img>
        </div>
        <div className="w-full max-w-[200px] flex flex-col gap-0">
          <p className="text-base font-semibold line-clamp-1">{title}</p>
          <p className="text-base font-normal text-[#989898] line-clamp-1">
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductListData = [
  {
    title: "Obsidian Canvas",
    description: "Easily visualize and make sense of your ideas",
    image:
      "https://prototyprio.gumlet.io/strapi/11e11ee480da2a5ff39551e333f0a6ec.jpg?updated_at=2023-01-05T22%3A07%3A03.315Z%3Fw%3D256&q=75&format=webp&compress=true&dpr=2&w=70",
  },
  {
    title: "Bloom Objects",
    description: "Abstract 3D illustrations",
    image:
      "https://prototyprio.gumlet.io/strapi/9c94a6d7a9d541dfe7a188e0c767aa7d.jpg?updated_at=2023-01-05T16%3A00%3A22.365Z%3Fw%3D256&q=75&format=webp&compress=true&dpr=2&w=70",
  },
  {
    title: "Microsoft Bing Image Creator",
    description: "Generate AI images with DALL-E",
    image:
      "https://prototyprio.gumlet.io/strapi/c41fbc86e63824c71c1d5eeb691a46b6.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
  {
    title: "Stark",
    description: "Build products that are accessible, ethical, and inclusive.",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/www_prototypr_io_HcsoZ-150x150.?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "The Design System Encyclopedia",
    description:
      "The Design Encyclopedia is a vast collection of meticulously documented design tokens, components, page layouts, interaction patterns, and visualizations.",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2020/09/Frame-1-33-150x150.png?w=256&q=75&format=auto&compress=true&dpr=2",
  },
];

const ProductListData2 = [
  {
    title: "Feenancy 3D Icons",
    description: "Customizable Fintech 3D Icons",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/556129ef-c783-40c0-b1e1-f4adfbef4a70-150x150.gif?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Toy Faces 3D",
    description: "Fun diverse library of 3D avatars",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/static1_squarespace_com_ueDe0-150x150.?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Maze Templates",
    description: "Go from idea to action with Templates",
    image:
      "https://prototyprio.gumlet.io/wp-content/uploads/2021/06/Screenshot-2021-06-21-at-21.44.33.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
  {
    title: "Cabana 4",
    description: "Latest Design System for Sketch",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2020/11/3348b430-1d8b-48a7-94fc-24840be0863e.jpeg?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Magicul",
    description: "Design file converter.",
    image:
      "https://prototyprio.gumlet.io/wp-content/uploads/2021/06/Screenshot-2021-06-29-at-12.25.34.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
];

const ToolBoxHero = () => {
  return (
    <div className="w-full h-full bg-white toolboxheroGradient pt-32 pb-20">
      <div className="w-full h-auto py-20 relative z-2">
        <div className="max-w-7xl mx-auto grid place-items-center h-full">
          <div className="flex flex-col justify-center items-center gap-2">
            <div>
              <img
                className=" w-20 h-20 shadow-xl border-black border-opacity-10"
                src={"/static/images/toolbox/toolbox-icon.svg"}
                alt="Prototypr Logo"
              />
            </div>
            <h1 className="text-[40px] md:text-[52px] text-center leading-[52px] md:leading-[63px] font-bold">
              Discover Tools, <br /> make life easier.
            </h1>
            <div>
              <SearchBarToolbox />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full relative py-5 flex flex-col gap-2  overflow-hidden">
        <div className=" flex flex-col items-center max-w-7xl mx-auto gap-5 top-0 w-full ">
          <MotionSlider
            duration={15}
            slides={ProductListData.map((data, i) => {
              return (
                <MotionSliderToolCard
                  title={data.title}
                  subtext={data.description}
                  image={data.image}
                />
              );
            })}
          />
          <MotionSlider
            duration={20}
            slides={ProductListData2.map((data, i) => {
              return (
                <MotionSliderToolCard
                  title={data.title}
                  subtext={data.description}
                  image={data.image}
                />
              );
            })}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ToolBoxHero;
