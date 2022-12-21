const Tabs = [
    { label: "Top Picks", color: "#4053FF", id: "top_picks", slug: "top_picks" },
    { label: "Branding", color: "#FFC10F", id: "branding", slug: "branding" },
    {
      label: "Product Design",
      color: "#FE9BE8",
      id: "product_design",
      slug: "product-design",
    },
    { label: "UX Design", color: "#9360FF", id: "ux", slug: "ux" },
  
    { label: "Artificial Intelligence", color: "#4053FF", id: "vr", slug: "ai" },
    {
      label: "Psychology",
      color: "#22AA79",
      id: "service",
      slug: "design-psychology",
    },
  ];
  
const TabSwitcher = ({ selectedTab, onTabChange }) => {
    return (
      <div className="px-4 lg:px-0">
      <h1 className="font-semibold mt-3">Popular topics</h1>
  
      <div className="flex flex-wrap my-3">
        <div className="w-full ">
          <div className="flex flex-wrap">
            {Tabs.map((tab, i) => {
              return (
                <span
                  onClick={() => onTabChange(tab)}
                  className={`px-4 py-2 mb-2 block font-inter tracking-tight font-medium cursor-pointer cursor text-sm  mr-2 rounded-full ${
                    selectedTab === tab.id
                      ? "bg-blue-600 font-semibold text-white"
                      : "bg-transparent text-gray-600"
                  }  border border-gray-300 hover:bg-blue-600 hover:text-white`}
                >
                  {tab.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default TabSwitcher