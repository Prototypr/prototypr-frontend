import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import { SearchBarToolbox } from "@/components/toolbox/toolboxSearchBox";
import Link from "next/link";
import SignupHorizontal from "../newsletter/SignupHorizontal";

export const MotionSliderToolCard = ({ title, subtext, image, slug }) => {
  return (
    <div className="w-[400px] h-[90px] cursor-pointer relative rounded-3xl border border-opacity-10 bg-white grid grid-items-center shadow-xs p-3">
        <Link href={`/toolbox/${slug}`}>
        <div className="flex flex-row">
          <div className="mr-3 w-[64px] h-[64px] bg-gray-100 overflow-hidden rounded-[12px] relative">
            <img src={image} className="w-full h-full"></img>
          </div>
          <div className="w-full max-w-[200px] my-auto flex flex-col gap-0">
            <p className="text-base font-semibold line-clamp-1">{title}</p>
            <p className="text-sm font-normal text-gray-600 line-clamp-1">
              {subtext}
            </p>
          </div>
        </div>
      </Link>
      </div>
  );
};

const ProductListData = [
  {
    title: "Obsidian Canvas",
    slug:'obsidian-canvas',
    description: "Easily visualize and make sense of your ideas",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/11e11ee480da2a5ff39551e333f0a6ec.jpg?updated_at=2023-01-05T22%3A07%3A03.315Z%3Fw%3D256&q=75&format=webp&compress=true&dpr=2&w=70",
  },
  {
    title: "Bloom Objects",
    slug:'bloom-objects',
    description: "Abstract 3D illustrations",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/9c94a6d7a9d541dfe7a188e0c767aa7d.jpg?updated_at=2023-01-05T16%3A00%3A22.365Z%3Fw%3D256&q=75&format=webp&compress=true&dpr=2&w=70",
  },
  {
    title: "Microsoft Bing Image Creator",
    slug:'microsoft-bing-image-creator',
    description: "Generate AI images with DALL-E",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/c41fbc86e63824c71c1d5eeb691a46b6.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
  {
    title: "Stark",
    description: "Build products that are accessible, ethical, and inclusive.",
    slug:'stark',
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/www_prototypr_io_HcsoZ-150x150.?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "The Design System Encyclopedia",
    slug:'the-design-system-encyclopedia',
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
    slug:'feenancy-3d-icons',
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/556129ef-c783-40c0-b1e1-f4adfbef4a70-150x150.gif?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Toy Faces 3D",
    description: "Fun diverse library of 3D avatars",
    slug:'toy-faces-3d-avatar-library',
    image:
      "https://wp.prototypr.io/wp-content/uploads/2021/01/static1_squarespace_com_ueDe0-150x150.?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Maze Templates",
    slug:'maze-templates',
    description: "Go from idea to action with Templates",
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/06/Screenshot-2021-06-21-at-21.44.33.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
  {
    title: "Cabana 4",
    slug:'cabana-4',
    description: "Latest Design System for Sketch",
    image:
      "https://wp.prototypr.io/wp-content/uploads/2020/11/3348b430-1d8b-48a7-94fc-24840be0863e.jpeg?w=256&q=75&format=auto&compress=true&dpr=2",
  },
  {
    title: "Magicul",
    description: "Design file converter.",
    slug:'magicul-convert-any-ui-ux-design-file',
    image:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/06/Screenshot-2021-06-29-at-12.25.34.png?w=256&q=75&format=webp&compress=true&dpr=2",
  },
];

const ToolBoxHeroWithSignup = ({user}) => {
  return (
    <div className="w-full h-full bg-white toolboxheroGradient pt-20 pb-8 -mt-[96px] border-b mb-14">
      <div className="w-full h-auto pt-16 pb-12 relative z-2">
        <div className="max-w-7xl mx-auto grid place-items-center h-full">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="rounded-[16px] overflow-hidden shadow-xl">
              <img
                className=" w-20 h-20 bg-transparent  border-black border-opacity-10"
                src={"/static/images/toolbox/toolbox-icon.svg"}
                alt="Prototypr Logo"
              />
            </div>
            {user?.isLoggedIn?
            <div>
                <h1 className="text-[40px] md:text-[52px] text-center leading-[52px] md:leading-[63px] font-bold mb-2">
                Find the tool, <br /> make your thing.
                </h1>
                <div>
                <SearchBarToolbox />
                </div>
            </div>
            :
            <div>
                <h1 className="text-[40px] md:text-5xl text-center font-bold mb-2">
                The best tools <span className="text-underline">every week.</span>
                </h1>
                <div className="text-center text-gray-600 max-w-[600px] text-lg mt-3 mx-auto">Join 25k+ readers receiving Prototypr Weekly. Improve your workflow with the latest tools, news and design resources.</div>
                <div className="mt-12 mb-2">
                <SignupHorizontal showNoSpam={true} className="sm:flex justify-center mx-auto w-[505px] mt-5 mb-6" />
                </div>
            </div>
            }
          </div>
        </div>
      </div>
      <div className="w-full max-w-full relative py-5 flex flex-col gap-2  overflow-hidden">
        <div className=" flex flex-col items-center max-w-7xl mx-auto grid gap-5 top-0 w-full ">
          <MotionSlider
            duration={60}
            slides={ProductListData.map((data, i) => {
              return (
                <MotionSliderToolCard
                  title={data.title}
                  slug={data.slug}
                  subtext={data.description}
                  image={data.image}
                />
              );
            })}
          />
          <MotionSlider
            duration={45}
            slides={ProductListData2.map((data, i) => {
              return (
                <MotionSliderToolCard
                  slug={data.slug}
                  title={data.title}
                  subtext={data.description}
                  image={data.image}
                />
              );
            })}
          />
        </div>
        {/* <Link href="/toolbox/page/1" className="mx-auto">
          <p className="mx-auto mt-7 font-medium text-base text-gray-800 hover:text-gray-500">See tool directory →</p>
        </Link> */}
      </div>
      <div></div>
    </div>
  );
};

export default ToolBoxHeroWithSignup;
