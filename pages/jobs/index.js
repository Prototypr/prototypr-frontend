import Container from "@/components/container";
import Layout from "@/components/layout";

import { getAllJobs } from "@/lib/api";

import Link from "next/link";
import Button from "@/components/Primitives/Button";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import Contributors from "@/components/toolbox/Contributors";
import JobPostCard from "@/components/Jobs/JobCard";

const PAGE_SIZE = 12;

const seo = {
  title: "Designer Jobs Board",
  description:"A job board for designers, developers, and creative people. Find your next remote job, or one in your location.",
  url:"https://prototypr.io/jobs",
  image:"https://prototypr.io/static/images/jobs-seo.png"
}

const Index = ({jobs}) => {

  return (
    <Layout seo={seo} showWriteButton={false} background="#fafafa">
      <Container>
      <div className=" w-full h-full">
        <div className="pt-6 w-full max-w-7xl mx-auto  h-full grid grid-cols-6 gap-5">
          <div className="mb-2 col-start-1 col-end-4 md:col-start-1 md:col-end-5">
            <h1 className="text-lg md:text-xl font-medium">Now Hiring</h1>
          </div>
          <div className="w-full h-full col-start-5 col-end-7 md:col-start-5 md:col-end-7 ">
          <div className="w-full">
              <Link href="/jobs/post">
                <Button variant="fullWidthJob" className="px-0 py-1">
                  Post a Job for $200
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full h-full col-start-1 col-end-7 md:col-start-1 md:col-end-5 flex flex-col gap-5  pb-10">
            {jobs.map((job, i) => {
              return <JobPostCard job={job} key={i} />;
            })}
          </div>
          <div className="w-full h-full col-start-1 col-end-7 md:col-start-5 md:col-end-7 ">
            {/* <div className="w-full bg-[#2C04CA] h-[150px] <rounded-md p-5">
              <Link href="/jobs/post">
                <button className="px-5 text-sm py-2 bg-white text-black rounded">
                  Post a Job
                </button>
              </Link>
            </div> */}
            <div className="w-full bg-blue-50 rounded-md p-5 border border-gray-300">
              <h3 className="text-xl font-medium mb-2 text-gray-900">Get Prototypr Weekly</h3>
              <p className="text-base text-gray-600 mb-6">Stay up to date with design news, tools, and jobs.</p>
            <SignupSidebar/>

            </div>
            <Contributors className="border border-gray-300 rounded"/>
          </div>
        </div>
      </div>
      </Container>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const page = 0;
  let allPosts =(await getAllJobs(preview, pageSize, page)) || [];
 
  const pagination = allPosts?.meta?.pagination;
  return {
    props: { 
      // jobs: allPosts?.data?allPosts.data:null, 
      jobs: allPosts, 
      preview, 
      pagination:pagination?pagination:null
    },
    revalidate:20
  };
}
