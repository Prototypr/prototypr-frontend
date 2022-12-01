import PayoutTable from "@/components/WebMonetization/PayoutTable/PayoutTable";

const PayoutSection = () => {
  return (
    <div className="w-full bg-white p-10">
      <div className="w-full max-w-7xl mx-auto py-0 md:py-32 flex flex-col gap-7 md:gap-4">
        <h3 className="md:text-[40px] text-[30px] text-[#A4A4A4] leading-[40px] md:leading-[50px] font-inter font-semibold">
          Past Payouts <br /> to our Writers
        </h3>
        <div className="w-full flex flex-col gap-5">
          <PayoutTable />
        </div>
      </div>
    </div>
  );
};

export default PayoutSection;
