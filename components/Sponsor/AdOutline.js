const AdOutline = ({selectedProduct}) => {
  return (
    <>
      {selectedProduct ? (
        <div className="bg-white h-auto flex flex-col justify-start items-start gap-4 w-full rounded-2xl p-6 border border-opacity-20">
          {/* <h3 className="text-lg font-semibold">{selectedProduct.titleShort} Details</h3> */}
          <h3 className="text-lg font-semibold">Package Details</h3>
          <div className="text-gray-800">{selectedProduct?.desp}</div>
          <ul>
            <h4 className="font-semibold mb-3">Placements</h4>
            {selectedProduct?.screenshots?.map((item, index) => {
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
            <h3 className="text-base font-semibold">
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
