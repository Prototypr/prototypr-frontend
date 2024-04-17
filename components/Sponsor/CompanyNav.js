import Link from "next/link";
const EditIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
  </svg>
);

const CompanyNav = ({ user, showEditLink }) => {
  return (
    <>
      {/*  sub nav for company */}
      {user?.profile?.activeCompany ? (
        <div className="fixed top-[88px] z-20 left-0 flex mb-6 border -mt-6 border-gray-300/60 bg-white p-2 w-full">
          <div className="max-w-[1160px] mx-auto md:px-3 w-full flex">
            <Link className="" href={`/dashboard/partner/edit-company`}>
              <div className="w-full flex">
                {/* {user?.profile?.activeCompany?.logo && ( */}
                  <img
                    src={user?.profile?.activeCompany?.logo?user?.profile?.activeCompany?.logo:'https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png'}
                    className="my-auto rounded-md mr-2 w-[32px] h-[32px] object-cover"
                  />
                {/* )} */}
                <div className="flex cursor-pointer flex-col justify-center">
                  <h1 className="pr-2 font-semibold">
                    {user?.profile?.activeCompany?.name}
                  </h1>
                  {/* <div className="pr-2 text-gray-500" dangerouslySetInnerHTML={{__html:postObject?.description}}></div> */}
                </div>
                {showEditLink !== false && (
                  <div className="ml-2 text-gray-500 text-sm my-auto cursor-pointer">
                    {EditIcon}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CompanyNav;
