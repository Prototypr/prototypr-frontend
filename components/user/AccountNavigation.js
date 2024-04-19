import Link from "next/link";
import { Envelope, FolderPlus, ListChecks, User } from "phosphor-react";
const AccountNavigation = ({ activeTab }) => {
  return (
    <div className="flex md:w-[240px] mt-6 flex-row flex-wrap md:flex-col  md:mb-6 ">
      {/* <div className="md:w-1/4 flex flex-row md:flex-col mb-6 "> */}
      {/* <div><h1 className="text-2xl px-2 text-gray-900 font-bold mb-10 mt-3">Account</h1></div> */}

      <Link href="/account" className="mb-2">
        <div className={"text-gray-700 "}>
          <div
            className={`${activeTab == 1 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              {/* <svg className="w-4 h-4 mr-3 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16 20V4H4v15a1 1 0 0 0 1 1h11zm3 2H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM6 6h6v6H6V6zm2 2v2h2V8H8zm-2 5h8v2H6v-2zm0 3h8v2H6v-2z" fill="currentColor"/></svg> */}
              <User size={18} className="mr-3" />
              <div className="my-auto text-center mx-auto text-sm">General</div>
            </div>
          </div>
        </div>
      </Link>
      <Link href="/account/topics" className="mb-2">
        <div className={"text-gray-700"}>
          <div
            className={`${activeTab == 2 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              {/* <svg className="w-4 h-4 mr-3 my-auto"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 9h8v2H8V9zm0 4h8v2H8v-2z" fill="currentColor"/></svg> */}
              <FolderPlus size={18} className="mr-3" />
              <div className="my-auto text-center text-sm">Topics</div>
            </div>
          </div>
        </div>
      </Link>
      <Link href="/account/interests" className="mb-2">
        <div className={"text-gray-700"}>
          <div
            className={`${activeTab == 3 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              {/* <svg className="w-4 h-4 mr-3 my-auto"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 9h8v2H8V9zm0 4h8v2H8v-2z" fill="currentColor"/></svg> */}
              <ListChecks size={18} className="mr-3" />
              <div className="my-auto text-center text-sm">Interests</div>
            </div>
          </div>
        </div>
      </Link>
      <Link href="/account/newsletters" className="mb-2">
        <div className={"text-gray-700"}>
          <div
            className={`${activeTab == 4 ? "bg-blue-100 font-semibold text-blue-900" : "hover:bg-blue-100/80"} flex justify-start p-2.5 px-4 rounded-xl text-sm cursor-pointer w-full`}
          >
            <div className="flex justify-start">
              <Envelope size={18} className="mr-3" />
              {/* <svg className="w-4 h-4 mr-3 my-auto"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 9h8v2H8V9zm0 4h8v2H8v-2z" fill="currentColor"/></svg> */}
              <div className="my-auto text-center text-sm">Newsletters</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default AccountNavigation;
