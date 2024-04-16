// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout-dashboard";
import Container from "@/components/container";
import useUser from "@/lib/iron-session/useUser";
// import axios from "axios";
import { useLoad } from "@/components/Sponsor/sponsorHooks";
// import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
// import { currentWeekNumber } from "@/components/Sponsor/lib/weekNumber";
// import { cloneDeep } from "lodash";
import Link from "next/link";
import BookingCalendar from "@/components/Sponsor/BookingCalendar";
// import PurchaseButton from "@/components/Sponsor/PurchaseButton";
import CheckoutTotal from "@/components/Sponsor/CheckoutTotal";

export default function SponsorPaymentPage({}) {
  // const [productId, setProductId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const { user, mutateUser } = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  });

  const { loading, postObject } = useLoad(user);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [datesSelected, setDatesSelected] = useState(false);

  useEffect(() => {
    if(postObject?.company?.data==null){
      setCompanyId(false);
    }else{
      setCompanyId(postObject?.company);
    }
    setSelectedProducts(postObject?.products);
  }, [postObject]);

  useEffect(() => { 
    if (selectedProducts?.length) {
      let datesSelected = true;
      selectedProducts.forEach(product => {
        if (!product.dates?.length) {
          datesSelected = false;
        }
      }
      );
      setDatesSelected(datesSelected);
    }
  }, [selectedProducts]);

  const updateDates = newDates => {
    // find the product and add or update the dates attribute with the new dates

    let newProducts = selectedProducts?.map(product => {
      if (product.id === newDates.productId) {
        return {
          ...product,
          dates: newDates.dates,
        };
      }
      return product;
    });

    setSelectedProducts(newProducts);
  };

  // const [selectedSlots, setSelectedSlots] = useState(null);
  return (
    <Layout
      seo={{
        title: "Confirm booking – choose dates and pay.",
        description: "Confirm booking dates",
        //   image: "",
        // canonical: "https://prototypr.io/toolbox",
        // url: "https://prototypr.io/toolbox",
      }}
      activeNav={"toolbox"}
    >
      {loading ? (
        <div className="relative w-full h-full pt-10 flex">
          <div className="my-auto mx-auto">
            <Spinner />
          </div>
        </div>
      ) : !postObject?.active ? (
        <>
          {postObject?.featuredImage ? (
            <div className="fixed top-[88px] z-20 left-0 flex mb-6 border -mt-6 border-gray-300/60 bg-white p-2 w-full">
              <div className="max-w-[1160px] mx-auto md:px-3 w-full flex">
                <img
                  src={
                    postObject.featuredImage?.data?.attributes?.url
                      ? postObject.featuredImage?.data?.attributes?.url
                      : postObject.featuredImage
                  }
                  className="my-auto rounded-xl mr-2 w-[44px] h-[44px] object-cover"
                />
                <div className="flex flex-col justify-center">
                  <h1 className="pr-2 font-semibold">{postObject?.title}</h1>
                  <div
                    className="pr-2 text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: postObject?.description,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : null}
          <Container>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 md:col-span-4">
                <div className="rounded-xl p-6 border border-opacity-20 bg-white mt-20">
                  <div className="">
                 
                  </div>

                  <div>
                  {postObject?.products?.map(product => {
                    return (
                      <div key={`calendar_${product.id}`} className="border-b first:pt-0 py-8 border-gray-200 last:border-b-0">
                        <BookingCalendar
                          key={product.id}
                          product={product}
                          updateDates={updateDates}
                          lsProduct={product}
                          companyId={companyId}
                          user={user}
                          postObject={postObject}
                        />
                      </div>
                    );
                  })}
                  </div>

                  {user?.isLoggedIn ? (
                    <p className="mt-3 max-w-2xl text-gray-500">
                      You can come back and pay later, your sponsored post
                      details are available on your{" "}
                      <Link href="/dashboard/partner">
                        <span className="text-blue-500">
                          partners dashboard
                        </span>
                      </Link>
                      .{" "}
                    </p>
                  ) : (
                   null
                  )}
                </div>
              </div>
              <div className="col-span-6 md:col-span-2 sticky h-fit top-[160px]">
                <div className="rounded-xl p-6 border border-opacity-20 bg-white">
                  {/* <h2 className="text-xl font-semibold">Total</h2> */}
                  <h1 className="text-xl font-semibold mx-auto mb-2">
                    Choose Booking Date(s)
                  </h1>
                    <p className="text-gray-500 max-w-lg text-sm">
                      Book your sponsorship from available dates on the calendar. (Bookmark this url to pay later.)
                      {/* When booking multiple weeks, you can space them out for better results.  */}
                    </p>
                  {/* <p className="text-gray-500 text-sm">
                    Choose a package - you can combine 1 Newsletter and 1
                    Website package and save 20%.
                  </p> */}
                  <CheckoutTotal
                    paymentDisabled={!datesSelected}
                    selectedProducts={selectedProducts}
                    companyId={companyId}
                    user={user}
                    postObject={postObject}
                    // totalPrice={totalPrice}
                    // discountedPrice={discountedPrice}
                    // discount={discountAmount}
                  />
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : (
        <Container>
          <div className="max-w-2xl pt-3 mb-3">
            <h1 className="text-xl mb-3 font-bold">Payment is complete</h1>
            <p>Payment for this sponsorship has already been made. </p>
          </div>
        </Container>
      )}
    </Layout>
  );
}
