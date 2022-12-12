import Container from "@/components/container";
import Layout from "@/components/layout";

import { getAllJobs } from "@/lib/api";

import Link from "next/link";
import Button from "@/components/Primitives/Button";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
import Contributors from "@/components/toolbox/Contributors";

import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
import { useEffect, useState } from "react";

const PAGE_SIZE = 12;

const seo = {
  title: "Designer Jobs Board",
  description:"A job board for designers, developers, and creative people. Find your next remote job, or one in your location.",
  url:"https://prototypr.io/jobs",
  image:"https://prototypr.io/static/images/jobs-seo.png"
}

const Index = () => {

    const [weekNumber, setWeekNumber] = useState()
    
    useEffect(()=>{
        const week = currentWeekNumber()
        setWeekNumber(week)
    },[])

  return (
    <Layout seo={seo} showWriteButton={false} background="#fafafa">
      <Container>
      <div className=" w-full">
        <div className="flex pt-6 w-full max-w-7xl mx-auto  h-full">
          <div className="w-full md:w-2/3">
          <h1 className="text-lg md:text-3xl font-medium mb-12">Sponsor Prototypr</h1>

          <div className="mb-16">
            <div className="mb-6">
              <h1 className="text-lg md:text-xl font-medium">Featured Sponsor</h1>
              <p className="mb-3">The large banner in the newsletter, and featured on the website:</p>
              <div className="flex flex-col md:flex-row">
              <img style={{maxWidth:300}} className="mb-3 md:mb-0 md:mr-3 object-cover rounded border border-gray-200 shadow" src="https://ucarecdn.com/2963e430-e355-473d-bada-a5b9f2499d01/screenshot-2020-09-22-at-20.56.18.png"/>
              <img style={{maxHeight:200}} className="height-auto rounded border border-gray-200 shadow" src="https://ucarecdn.com/c855f91d-3882-4611-98c0-e62e0f2f4504/single-pages.png"/>

              </div>
            </div>
            <div className="w-full">
              <Link href="/sponsor/booking">
                  <Button variant="confirm">
                    Buy for $600
                  </Button>
                </Link>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h1 className="text-lg md:text-xl font-medium">Sponsored Link</h1>
              <p className="mb-3">A sponsored article or tool in the newsletter</p>
              <img style={{maxWidth:300}} className="rounded border border-gray-200 shadow" src="https://ucarecdn.com/27e76335-6f67-4d5b-a037-310a25b07711/featured-article-sponsor.png"/>

            </div>
            <div className="w-full">
              <Link href="/sponsor/booking">
                  <Button variant="confirm">
                    Buy for $300
                  </Button>
                </Link>
            </div>
          </div>
          </div>
          <div className="w-1/3">
            <div className="w-full ">
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
    revalidate:40
  };
}
