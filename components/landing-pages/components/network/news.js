import Link from "next/link";

const BlogPostCard = ({img, title, link}) => {
  return (
    <div className="w-full my-5 md:my-0">
    <Link href={link}>
    <div style={{backgroundImage:`url("${img}")`, backgroundPosition:'center', backgroundSize:'cover'}} className=" cursor-pointer transition ease-in-out w-full h-[240px] rounded-lg border border-black border-opacity-5"></div>
    </Link>
    <Link href={link}>
    <p className="text-[16px] mt-3 font-semibold text-gray-900 ">{title}</p>
    </Link>
    </div>
  );
};

const NewsContent = () => {
  return (
    <div className="bg-white">
      <div className="w-full bg-[#F8B700] p-10 rounded-b-[40px] -translate-y-1"></div>

      <div className="w-full px-0 md:px-5 bg-white py-10 ">
        <div className="p-5 bg-[#fff] ] max-w-7xl mx-auto">
          <h2 className="text-[24px] my-4 text-[#0F1F40] font-semibold  max-w-md leading-[32px]">
            More about <br /> Open Design →
          </h2>
          <div className="flex flex-col lg:flex-nowrap lg:flex lg:flex-row md:flex md:flex-wrap md:flex-col md:space-x-5 py-2 ">
            <BlogPostCard link="/post/open-web" title="What is Open Design?" img={'/static/images/unlock2.png'} />
            <BlogPostCard link="/post/open-design" title="What is the Open Web?" img={'/static/images/globepen.png'} />
            <BlogPostCard link="/post/future-design-open-source-figma" title="The Future of Design is Open Source" img={`https://prototyprio.gumlet.io/strapi/2272daa0caea148d74b94bc636722b51.png?format=webp&w=700&dpr=2.0`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
