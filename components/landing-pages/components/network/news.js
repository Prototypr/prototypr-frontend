const BlogPostCard = () => {
  return (
    <div className="bg-[#E6F2FF] cursor-pointer transition ease-in-out w-full h-[240px] rounded-lg border border-black border-opacity-5"></div>
  );
};

const NewsContent = () => {
  return (
    <div className="w-full px-0 md:px-5 bg-transparent">
      <div className="p-5 md:p-10 bg-white  rounded-none md:rounded-3xl mb-20 max-w-7xl mx-auto shadow-sm">
        <h2 className="text-[24px] my-4 text-[#0F1F40] font-semibold font-inter max-w-md leading-[32px]">
          More about <br /> Open Design →
        </h2>
        <div className="flex flex-col lg:flex-nowrap lg:flex lg:flex-row md:flex md:flex-wrap md:flex-col gap-5 py-2 ">
          <BlogPostCard />
          <BlogPostCard />
          <BlogPostCard />
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
