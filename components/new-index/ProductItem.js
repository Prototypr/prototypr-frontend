

export default function ProductItem({}) {
  return (
    <div
      className="grid-cols-1 flex items-center cursor-pointer"
      style={{ border: "1px solid blue" }}
    >
      <div className="w-36 h-36 rounded-lg" style={{ border: "1px solid red" }}></div>
      <div className="flex-1 ml-4">
        <div className="flex">
          <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # illustration
          </div>
          <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
            # product design
          </div>
        </div>
        <h4 className="font-bold text-lg leading-7 text-gray-1">
          Designing for Different Cultures: Localisation ≠ Translation
        </h4>
        <div className="mt-3 flex items-center">
          <div className="w-9 h-9 rounded-full" style={{ border: "1px solid red" }}></div>
          <div className="font-medium text-base ml-3">
            Sophie Clifton-Tucker
          </div>
        </div>
      </div>
    </div>
  );
}
