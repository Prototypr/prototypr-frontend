import AuthorListItem from "../listItem/AuthorListItem";

const SidePanelAuthors = ({ list, topic }) => {
  return (
    <div className="flex rounded-lg flex-col gap-0 px-2">
      <div className="flex flex-row justify-between items-baseline">
        <h3 className=" my-0.5 font-bold text-gray-800 text-sm">
        <span className="capitalize">{topic}</span> contributors
        </h3>
      </div>
      <div className="flex flex-col grid my-2">
        {list && list.map((item, i) => {
          return (
            <AuthorListItem
              author={item}
              slug={item.slug}
              index={i}
            />
          );
        })}

        {/* <Link href={"/jobs"}>
          <div className=" mt-1 text-gray-600 cursor-pointer text-xs flex">
            <div className="my-auto">See All</div>
          <CaretRight className="my-auto" size={12} />
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default SidePanelAuthors;
