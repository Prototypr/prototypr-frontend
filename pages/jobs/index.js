import Layout from "@/components/layout-dashboard";
import fetchJson from "@/lib/iron-session/fetchJson";
import Link from "next/link";
import { useEffect } from "react";
const qs = require("qs");
var axios = require("axios");
// import useUser from "@/lib/iron-session/useUser";
import { useState } from "react";

const JobPostCard = ({ job }) => {
  const tags = job.tags.split(",");
  const company = job?.company?.data?.attributes;
  return (
    <div className="w-full h-auto p-10 bg-white rounded-[10px] flex flex-row gap-5 border border-black border-opacity-10">
      <div className="w-[100px] h-[100px] bg-[#CEE2FF] rounded"></div>
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h1 className="text-lg m-0 inter-font font-medium">{job.title}</h1>
            <div className="flex flex-row gap-2 text-base inter-font font-regular text-[#A3ACC2]">
              <span>{company?.name}</span>
              <span>•</span>
              <span>{job.location}</span>
            </div>
          </div>
          <div className="gap-2 flex flex-row">
            {tags.map((x, i) => (
              <span
                className="py-1 px-5 text-[12px] rounded-full bg-[#F2BFFF] text-sm "
                key={i}
              >
                {x}
              </span>
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <span className="text-base inter-font font-medium">
              {job.SalaryRange}
            </span>
          </div>
        </div>

        <div>
          <button className="px-6 py-2 bg-[#3C4FFF] font-medium inter-font text-base text-white rounded-[6px]">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const query = qs.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
      let jobEntriesConfig = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?${query}`,
        headers: {},
      };
      const { data } = await axios(jobEntriesConfig);
      setJobs(data?.data);
    };

    fetch();
  }, []);
  return (
    <Layout background="#EFF2F8">
      <div className=" w-full h-full ">
        <div className="w-full max-w-7xl mx-auto  h-full grid grid-cols-4 gap-5">
          <div className="w-full h-full col-start-1 col-end-4 flex flex-col gap-5  pb-10">
            {jobs.map((job, i) => {
              return <JobPostCard job={job.attributes} key={i} />;
            })}
          </div>
          <div className="w-full h-full col-start-4 col-end-5 ">
            <div className="w-full bg-[#2C04CA] h-[150px] rounded-md p-5">
              <Link href="/jobs/post">
                <button className="px-5 text-sm py-2 bg-white text-black rounded">
                  Post a Job
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
