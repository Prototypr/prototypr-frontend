import Link from "next/link";

const CompanyProfilePreview = ({ company }) => {
  return (
    <>
      <Link href="/dashboard/partner/edit-company">
        <div className="flex rounded-lg border border-gray-300 p-6 w-[fit-content] pr-8">
          <div className="flex items-center">
            <img
              src={company?.logo?company?.logo:`https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png`}
              className="w-16 h-16 border border-gray-300 rounded-full"
            />
          </div>
          <div className="flex flex-col items-start my-auto ml-3">
            <div className="text-base font-medium">{company?.name}</div>
            <div className="text-gray-500 text-sm font-base">Edit company</div>
          </div>
          {/* <div className="text-sm text-center">{company?.industry}</div> */}
        </div>
      </Link>
    </>
  );
};

export default CompanyProfilePreview;
