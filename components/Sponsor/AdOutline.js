const AdOutline = ({ selectedProduct }) => {
  return (
    <>
      <div className="mb-3">
        <h1 className="text-xl font-semibold mx-auto mb-2">Choose Package</h1>
        {/* <p className="text-gray-600">Sponsor our newsletter of ~25k subscribers.</p> */}
      </div>
      {selectedProduct ? (
        <div>
          {/* <h3 className="text-lg font-medium">{selectedProduct.titleShort} Details</h3> */}

          <h4 className="font-medium mb-3 mt-6">Package Overview</h4>

          <div className="relative mb-6 overflow-x-auto border border-b-0 border-gray-300/50">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="border-b odd:bg-white even:bg-gray-50">
                  <td className="py-1 px-2 font-semibold">Name</td>
                  <td className="py-1 px-2">{selectedProduct?.title}</td>
                </tr>
                <tr className="border-b odd:bg-white even:bg-gray-50">
                  <td className="py-1 px-2 font-semibold">Duration</td>
                  <td className="py-1 px-2">{selectedProduct?.duration}</td>
                </tr>
                <tr className="border-b odd:bg-white even:bg-gray-50">
                  <td className="py-1 px-2 font-semibold">Price</td>
                  <td className="py-1 px-2">{selectedProduct?.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4 className="font-medium mb-3 mt-6 border-b">Outline</h4>
          <div className="text-gray-800 mb-6">{selectedProduct?.desp}</div>
          <ul>
            <h4 className="font-medium mb-3 mt-6 border-b">Placements</h4>
            {selectedProduct?.placements?.map((item, index) => {
              return (
                <li className="list-disc ml-4 text-gray-800" key={index}>
                  <p className="mb-2">{item.description}:</p>
                  <a href={item.image} target="_blank" className="">
                    <img
                      key={item.image}
                      className="rounded-xl mb-6 w-[140px] hover:shadow-md hover:scale-[1.02] transition transition-all duration-400 object-cover"
                      src={item?.image}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          {/* <div
            style={{
              backgroundImage: `url("${selectedProduct?.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            className="w-full h-[200px] bg-gray-100 rounded-lg relative overflow-hidden"
          ></div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">
              {selectedProduct?.title}
            </h3>
            <p className="text-[#7A7A7A] text-base">{selectedProduct?.desp}</p>
          </div> */}
        </div>
      ) : null}
    </>
  );
};

export default AdOutline;
