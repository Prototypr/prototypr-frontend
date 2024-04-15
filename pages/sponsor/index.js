import Container from "@/components/container";
// import Layout from "@/components/layout";
import Layout from "@/components/layoutForBlogPost";

import { getAllJobs, getAllProducts } from "@/lib/api";

// import Link from "next/link";
// import Button from "@/components/Primitives/Button";
import SignupSidebar from "@/components/newsletter/SignupSidebar";
// import Contributors from "@/components/toolbox/Contributors";

import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import PrototyprNetworkCTA from "@/components/Sidebar/NetworkCTA";
import SponsorSidebarCard from "@/components/SponsorSidebarCard";
import { SIDEBAR_STICKY_OFFSET } from "@/lib/constants";
import { SponsorPackages } from "@/lib/constants/products";

const PAGE_SIZE = 12;

const seo = {
  title: `Sponsor Prototypr`,
  description: `Sponsor the Prototypr weekly newsletter and support the platform.`,
  // image:``,
  canonical: `https://prototypr.io/sponsor`,
  url: `https://prototypr.io/sponsor`,
};

const Index = ({ allProducts, newsletterProducts, websiteProducts }) => {
  const [weekNumber, setWeekNumber] = useState();
  // const [selectedPackage, setSelectedPackage] = useState("Newsletter");
  const [selectedNewsletterPackage, setNewsletterPackage] = useState(false);
  const [selectedWebsitePackage, setWebsitePackage] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const week = currentWeekNumber();
    setWeekNumber(week);

    const hashchange = () => {
      if (window.location.hash) {
        window.scrollTo(window.scrollX, window.scrollY - 60);
      }
    };
    window.addEventListener("hashchange", hashchange);

    return () => {
      window.removeEventListener("hashchange", hashchange);
    };
  }, []);

  return (
    <>
      {/* <div className="w-full h-full pt-20 pb-8 w-full mb-14 absolute top-0 h-[100vh] z-10"></div> */}

      <Layout
        maxWidth={"max-w-[1320px] search-wide"}
        seo={seo}
        showWriteButton={false}
        background="#fbfcff"
        padding={false}
      >
        <Container padding={false} maxWidth="px-0">
          <div className=" z-30 relative mx-auto w-full h-full ">
            <div
              style={{ backgroundPosition: "10px 10px" }}
              className="absolute w-full h-[25%] -mt-[96px] rounded-3xl bg-[url('/static/images/toolbox/gridsquare.svg')] absolute inset-0 [mask-image:linear-gradient(0deg,rgba(251,252,255,0),#eef2ff)]"
            />
            <div className="max-w-[1320px] relative mx-auto  px-6 md:px-3 grid grid-cols-1 gap-1">
              <div className=" mx-auto pb-20 px-3 md:px-8 xl:px-0 gap-2 col-span-12 lg:col-span-8">
                <div
                  // style={{"backgroundImage":"linear-gradient(rgba(32, 52, 144,0.16) 1px, transparent 1px), linear-gradient(to right, rgba(32, 52, 144,0.16) 1px, rgba(247, 247, 247,0.16) 1px)","backgroundSize":"26px 26px"}}
                  className="relative -mt-[96px] md:-mt-0 pt-[64px] md:pt-0 mx-auto w-[1301px] max-w-full z-10 px-6 md:px-3"
                >
                  <div className="pt-4">
                    <div className=" flex mb-3 justify-center flex-wrap">
                      <div
                        className={`inline-block capitalize text-base px-3 py-1 cursor-pointer bg-blue-100/60 rounded-full mb-3 text-blue-900 text-[15px] font-base outline outline-1 outline-blue-200 flex flex-col justify-center`}
                      >
                        Sponsor
                      </div>
                    </div>
                  </div>
                  <div className="pb-[20px]">
                    <h1 className="text-5xl md:text-6.5xl w-full leading-tight mx-auto text-black/80 font-inter font-bold text-center drop-shadow-sm">
                      Promote your product <br /> on Prototypr
                    </h1>
                    <p className="mx-auto text-center text-md my-3 text-black/70">
                      Reach 25k+ readers and support the platform.
                    </p>
                  </div>
                </div>

                <div className="mt-20 w-full">
                  <div className="flex w-full">
                    <div className="w-full rounded-2xl  mx-auto">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-2 sticky h-fit top-0">
                          <div className="rounded-xl p-6 border border-opacity-20 bg-white">
                            <h2 className="text-xl font-semibold">Menu</h2>
                            <p className="text-gray-500 text-sm">
                              Choose a package - you can combine 1 Newsletter
                              and 1 Website package and save 20%.
                            </p>
                            {selectedOptions.length > 0 ? (
                              <a
                                href={`/sponsor/booking?packages=${selectedOptions.join(",")}`}
                              >
                                <button className="w-full h-10 px-3 rounded-lg bg-[#0F8CFF] text-white">
                                  Book now
                                </button>
                              </a>
                            ) : null}
                            <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
                              <li>
                                <span className="text-semibold">
                                  Newsletter
                                </span>
                                <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                                  {newsletterProducts?.map((pk, i) => {
                                    if (pk?.type === "newsletter") {
                                      return (
                                        <li>
                                          <a
                                            className="hover:underline"
                                            // href={`#${pk.productId}`}
                                            href={`#${pk.uid}`}
                                          >
                                            {pk?.title}
                                          </a>
                                        </li>
                                      );
                                    }
                                  })}
                                </ol>
                              </li>
                              <li>
                                <span className="text-semibold">Website</span>
                                <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                                  {websiteProducts.map((pk, i) => {
                                    return (
                                      <li>
                                        <a
                                          className="hover:underline"
                                          href={`#${pk.uid}`}
                                        >
                                          {pk?.title}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ol>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="relative overflow-x-auto rounded-xl shadow-sm border border-gray-300/70">
                            <div className="px-6 py-3">
                              <h1 className="font-semibold text-gray-700 text-lg">
                                Newsletter Sponsorship
                              </h1>
                            </div>
                            <table className="table-fixed w-full text-sm border-t border-gray-200 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr className="bg-gray-100">
                                  <th className="px-6 py-3 w-[50px]"></th>
                                  <th
                                    valign="top"
                                    scope="col"
                                    className="px-6 py-3 w-[180px]"
                                  >
                                    Product
                                  </th>
                                  {/* <th scope="col" className="px-6 py-3">
                                    Type
                                  </th> */}
                                  <th
                                    scope="col"
                                    className="px-6 py-3 w-[480px]"
                                  >
                                    Placements
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 w-[180px]"
                                  ></th>
                                </tr>
                              </thead>
                              <tbody>
                                {newsletterProducts?.map((pk, i) => {
                                  return (
                                    <tr
                                      // id={pk.productId}
                                      id={pk.uid}
                                      className=" border-b odd:bg-white even:bg-gray-50"
                                    >
                                      <td valign="top" className="px-6 py-4">
                                        <div className="flex items-center pt-1">
                                          {/* <label
                                              htmlFor={pk.productId}
                                              className="sr-only">{pk.productId}</label> */}
                                          <input
                                            // disabled={
                                            //   selectedNewsletterPackage &&
                                            //   selectedNewsletterPackage !==
                                            //     // pk.productId
                                            //     pk.uid
                                            // }
                                            onChange={e => {
                                              if (e.target.checked) {
                                                setSelectedOptions(
                                                  prevOptions => [
                                                    ...prevOptions,
                                                    pk.uid,
                                                  ]
                                                );
                                              } else {
                                                setSelectedOptions(
                                                  prevOptions =>
                                                    prevOptions.filter(
                                                      id => id !== pk.uid
                                                    )
                                                );
                                              }
                                            }}
                                            id={pk.uid}
                                            name={pk.uid}
                                            type="checkbox"
                                            checked={selectedOptions.includes(pk.uid)}
                                            className="w-5 h-5 text-blue-600 bg-white disabled:bg-gray-100 border-gray-400 disabled:border-gray-200/80 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        valign="top"
                                        scope="row"
                                        className="px-6 py-4"
                                      >
                                        <h3 className="font-medium text-base text-gray-900 mb-2">
                                          {pk?.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                          {pk?.desp}
                                        </p>
                                      </td>
                                      {/* <td className="px-6 py-4">{pk?.titleShort}</td> */}
                                      <td className="px-6 py-4">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: pk?.description,
                                          }}
                                        ></div>
                                        {/* <ul>
                                            {pk?.placements?.map(
                                              (item, index) => {
                                                return (
                                                  <li
                                                    className="list-disc ml-4 text-gray-800"
                                                    key={index}
                                                  >
                                                    <p className="mb-2">
                                                      {item.description}:
                                                    </p>
                                                    <a
                                                      href={item.image}
                                                      target="_blank"
                                                      className=""
                                                    >
                                                      <img
                                                        key={item.image}
                                                        className="rounded-xl mb-6 w-[140px] hover:shadow-md hover:scale-[1.02] transition transition-all duration-400 object-cover"
                                                        src={item?.image}
                                                      />
                                                    </a>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul> */}
                                      </td>
                                      <td valign="top" className="px-6 py-4">
                                        <p className="mb-1">
                                          <span className="font-medium text-gray-900">
                                            Duration:
                                          </span>{" "}
                                          {pk.duration}
                                        </p>
                                        <p className="mb-3">
                                          <span className="font-medium text-gray-900">
                                            Price:
                                          </span>{" "}
                                          {pk.price}
                                        </p>
                                        {/* <a
                                            href={`/sponsor/booking?id=${pk.productId}`}
                                          >
                                            <button className="w-full h-10 px-3 rounded-lg bg-[#0F8CFF] text-white">
                                              {pk.ctaText}
                                            </button>
                                          </a> */}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div className="relative mt-3 overflow-x-auto rounded-xl shadow-sm border border-gray-300/70">
                            <div className="px-6 py-3">
                              <h1 className="font-semibold text-gray-700 text-lg">
                                Website Sponsorship
                              </h1>
                            </div>
                            <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr className="bg-gray-100">
                                  <th className="px-6 py-3 w-[50px]"></th>
                                  <th
                                    valign="top"
                                    scope="col"
                                    className="px-6 py-3 w-[180px]"
                                  >
                                    Product name
                                  </th>
                                  {/* <th scope="col" className="px-6 py-3">
                                    Type
                                  </th> */}
                                  <th
                                    scope="col"
                                    className="px-6 py-3 w-[500px]"
                                  >
                                    Placements
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 w-[160px]"
                                  ></th>
                                </tr>
                              </thead>
                              <tbody>
                                {websiteProducts.map((pk, i) => {
                                  return (
                                    <tr
                                      id={pk.uid}
                                      className=" border-b odd:bg-white even:bg-gray-50"
                                    >
                                      <td valign="top" className="px-6 py-4">
                                        <div className="flex items-center pt-1">
                                          {/* <label
                                            htmlFor={pk.productId}
                                            className="sr-only">{pk.productId}</label> */}
                                          <input
                                            // disabled={
                                            //   selectedWebsitePackage &&
                                            //   selectedWebsitePackage !==
                                            //     pk.uid
                                            // }
                                            onChange={e => {
                                              if (e.target.checked) {
                                                setSelectedOptions(
                                                  prevOptions => [
                                                    ...prevOptions,
                                                    pk.uid,
                                                  ]
                                                );
                                              } else {
                                                setSelectedOptions(
                                                  prevOptions =>
                                                    prevOptions.filter(
                                                      id => id !== pk.uid
                                                    )
                                                );
                                              }
                                            }}
                                            id={pk.uid}
                                            name={pk.uid}
                                            type="checkbox"
                                            checked={selectedOptions.includes(pk.uid)}
                                            className="w-5 h-5 text-blue-600 bg-white disabled:bg-gray-100 border-gray-400 disabled:border-gray-200/80 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        valign="top"
                                        scope="row"
                                        className="px-6 py-4"
                                      >
                                        <h3 className="font-medium text-gray-900">
                                          {pk?.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                          {pk?.desp}
                                        </p>
                                      </td>
                                      {/* <td className="px-6 py-4">{pk?.titleShort}</td> */}
                                      <td className="px-6 py-4">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: pk?.description,
                                          }}
                                        ></div>
                                        {/* <ul>
                                          {pk?.placements?.map(
                                            (item, index) => {
                                              return (
                                                <li
                                                  className="list-disc ml-4 text-gray-800"
                                                  key={index}
                                                >
                                                  <p className="mb-2">
                                                    {item.description}:
                                                  </p>
                                                  <a
                                                    href={item.image}
                                                    target="_blank"
                                                    className=""
                                                  >
                                                    <img
                                                      key={item.image}
                                                      className="rounded-xl mb-6 w-[140px] hover:shadow-md hover:scale-[1.02] transition transition-all duration-400 object-cover"
                                                      src={item?.image}
                                                    />
                                                  </a>
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul> */}
                                      </td>
                                      <td valign="top" className="px-6 py-4">
                                        <p className="mb-1">
                                          <span className="font-medium text-gray-900">
                                            Duration:
                                          </span>{" "}
                                          {pk.duration}
                                        </p>
                                        <p className="mb-3">
                                          <span className="font-medium text-gray-900">
                                            Price:
                                          </span>{" "}
                                          {pk.price}
                                        </p>
                                        {/* <a
                                            href={`/sponsor/booking?id=${pk.productId}`}
                                          >
                                            <button className="w-full h-10 px-3 rounded-lg bg-[#0F8CFF] text-white">
                                              {pk.ctaText}
                                            </button>
                                          </a> */}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Sidebar
      paddingTop="hidden md:block pt-12"
      /> */}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export async function getStaticProps({ preview = null, locale }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  // console.log('allTools',allTools)

  let allProducts = (await getAllProducts(preview, 15, 0)) || [];

  let products = [];
  for (var i = 0; i < allProducts.data?.length; i++) {
    products.push({
      uid: allProducts.data[i].id,
      ...allProducts.data[i].attributes,
    });
  }
  let newsletterProducts = products.filter(obj => obj.type === "newsletter");
  let websiteProducts = products.filter(obj => obj.type === "website");
  return {
    props: {
      allProducts: products,
      newsletterProducts: newsletterProducts,
      websiteProducts: websiteProducts,
    },
    revalidate: 100,
  };
}
