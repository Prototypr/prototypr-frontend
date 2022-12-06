import PayoutTable from "@/components/WebMonetization/PayoutTable/PayoutTable";

const PayoutSection = () => {
  return (
    <div className="w-full bg-white p-10">
      <div className="w-full max-w-7xl mx-auto py-0 md:py-32 flex flex-col gap-7 md:gap-4">
        <h3 className="md:text-[40px] text-[30px] text-gray-600 leading-[40px] md:leading-[50px] font-inter font-semibold">
          Live Micropayments<br /> 
        </h3>
        <p className="text-base text-gray-500 max-w-lg leading-[28px]">When a <a className="underline text-blue-700" href="https://coil.com">Coil subscriber</a> visits an article, micropayments are streamed 
        at <span className="font-semibold text-gray-700">$0.36 per hour</span> in real time to the author.</p>
        <div className="w-full flex flex-col gap-5">
          <PayoutTable />
        </div>
      </div>
    </div>
  );
};

export default PayoutSection;
