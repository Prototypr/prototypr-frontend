import {
    BrowserIcon,
    EnvelopeIcon,
  } from "@/components/Sponsor/MultiSelectPackages";

const DiscountBadge = ({ selectedTypes }) => {
  return (
    <>
      {selectedTypes.length && !selectedTypes.includes("website") ? (
        <div className="text-gray-700 text-sm mt-3 flex bg-blue-50 p-2 rounded-lg px-3">
          <BrowserIcon className={"my- w-8 h-8"} />
          <div className="flex flex-col ml-3 justify-center">
            <h4 className="text-md font-semibold">Get 5% off</h4>
            <div className="my-auto text-sm">
              Combine 1 newsletter with 1 website sponsorship for a{" "}
              <span className="font-">5% discount</span>.
            </div>
          </div>
        </div>
      ) : selectedTypes.length && !selectedTypes.includes("newsletter") ? (
        <div className="text-gray-700 text-sm mt-3 flex bg-blue-50 p-2 rounded-lg px-3">
          <EnvelopeIcon className={"my- w-8 h-8"} />
          <div className="flex flex-col ml-3 justify-center">
            <h4 className="text-md font-semibold">Get 5% off</h4>
            <div className="my-auto text-sm">
              Combine 1 newsletter with 1 website sponsorship for a{" "}
              <span className="font-">5% discount</span>.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};


export default DiscountBadge;