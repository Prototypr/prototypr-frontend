import Link from "next/link";
import { Envelope, FolderPlus, ListChecks, User } from "phosphor-react";
const ShootingStar = ({ size, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "32"}
      height={size ? size : "32"}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M239.35,70.08a13.41,13.41,0,0,0-11.77-9.28l-36.94-2.92L176.43,24.22a13.51,13.51,0,0,0-24.86,0L137.36,57.88,100.42,60.8a13.39,13.39,0,0,0-7.66,23.58l28.06,23.68-8.56,35.39a13.32,13.32,0,0,0,5.1,13.91,13.51,13.51,0,0,0,15,.69L164,139l31.65,19.06a13.54,13.54,0,0,0,15-.69,13.34,13.34,0,0,0,5.09-13.91l-8.56-35.39,28.06-23.68A13.32,13.32,0,0,0,239.35,70.08ZM193.08,99a8,8,0,0,0-2.61,8l8.28,34.21L168.13,122.8a8,8,0,0,0-8.25,0l-30.62,18.43L137.54,107a8,8,0,0,0-2.62-8L108,76.26l35.52-2.81a8,8,0,0,0,6.74-4.87L164,35.91l13.79,32.67a8,8,0,0,0,6.74,4.87l35.53,2.81Zm-105,24.18L29.66,181.66a8,8,0,0,1-11.32-11.32l58.45-58.45a8,8,0,0,1,11.32,11.32Zm10.81,49.87a8,8,0,0,1,0,11.31L45.66,237.66a8,8,0,0,1-11.32-11.32l53.27-53.26A8,8,0,0,1,98.92,173.08Zm73-1a8,8,0,0,1,0,11.32l-54.28,54.28a8,8,0,0,1-11.32-11.32l54.29-54.28A8,8,0,0,1,171.94,172.06Z"></path>
    </svg>
  );
};
const SignPost = ({ size, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "32"}
      height={size ? size : "32"}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M246,106.65,212.33,69.3A16,16,0,0,0,200.44,64H136V32a8,8,0,0,0-16,0V64H40A16,16,0,0,0,24,80v64a16,16,0,0,0,16,16h80v64a8,8,0,0,0,16,0V160h64.44a16,16,0,0,0,11.89-5.3L246,117.35A8,8,0,0,0,246,106.65ZM200.44,144H40V80H200.44l28.8,32Z"></path>
    </svg>
  );
};
const UserSquare = ({ size, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "32"}
      height={size ? size : "32"}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM68.67,208A64.36,64.36,0,0,1,87.8,182.2a64,64,0,0,1,80.4,0A64.36,64.36,0,0,1,187.33,208ZM208,208h-3.67a79.9,79.9,0,0,0-46.68-50.29,48,48,0,1,0-59.3,0A79.9,79.9,0,0,0,51.67,208H48V48H208V208Z"></path>
    </svg>
  );
};
const Building = ({ size, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "32"}
      height={size ? size : "32"}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M248,208H232V96a8,8,0,0,0,0-16H184V48a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16V208H24a8,8,0,0,0,0,16H248a8,8,0,0,0,0-16ZM216,96V208H184V96ZM56,48H168V208H144V160a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v48H56Zm72,160H96V168h32ZM72,80a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,80Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H128A8,8,0,0,1,120,80ZM72,120a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,120Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H128A8,8,0,0,1,120,120Z"></path>
    </svg>
  );
};
const DashboardNavigation = ({ activeTab }) => {
  return (
    <div className="flex md:w-[240px] mt-6 flex-row flex-wrap md:flex-col  md:mb-6 ">
      <Link href="/dashboard/partner" className="mb-2">
        <div className={"text-gray-700 "}>
          <div
            className={`${activeTab == 0 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              <Building size={18} className="mr-3" />
              <div className="my-auto text-center mx-auto text-sm">
                Overview
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link href="/dashboard/partner/edit-company" className="mb-2">
        <div className={"text-gray-700"}>
          <div
            className={`${activeTab == 1 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              <UserSquare size={18} className="mr-3" />
              <div className="my-auto text-center text-sm">Company</div>
            </div>
          </div>
        </div>
      </Link>
      <Link href="/dashboard/partner/ads" className="mb-2">
        <div className={"text-gray-700 "}>
          <div
            className={`${activeTab == 2 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              <ShootingStar size={18} className="mr-3" />
              <div className="my-auto text-center mx-auto text-sm">Ads</div>
            </div>
          </div>
        </div>
      </Link>
      <Link href="/dashboard/partner/jobs" className="mb-2">
        <div className={"text-gray-700"}>
          <div
            className={`${activeTab == 3 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              <SignPost size={18} className="mr-3" />
              <div className="my-auto text-center text-sm">Jobs</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default DashboardNavigation;
