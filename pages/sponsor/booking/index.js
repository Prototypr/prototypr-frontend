import Layout from "@/components/layout-dashboard";
// import Layout from "@/components/layout";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { getAllProducts } from "@/lib/api";

// import { SponsorPackages } from "@/lib/constants/products";
// import SelectSponsor from "@/components/Primitives/SelectSponsor";
import { createSponsorAsUser } from "@/lib/axios/createSponsor/createSponsorAsUser";

// import CompanyForm from "@/components/Sponsor/Forms/CompanyForm";
import SponsorPostForm from "@/components/Sponsor/Forms/SponsorPostForm";
import FormBreadCrumbs from "@/components/Sponsor/Forms/FormBreadcrumbs";
import CompanyNav from "@/components/Sponsor/CompanyNav";
// import AdOutline from "@/components/Sponsor/AdOutline";
// import WebsiteSponsorChoose from "@/components/Sponsor/WebsiteSponsor";
// import NewsletterSponsorChoose from "@/components/Sponsor/NewsletterSponsor";
import MultiSelectPackages, {
  BrowserIcon,
  EnvelopeIcon,
} from "@/components/Sponsor/MultiSelectPackages";
import SelectedProductsDisplay from "@/components/Sponsor/SelectedProductsDislay";
import { set } from "nprogress";

let axios = require("axios");

const seo = {
  title: `Sponsor Prototypr`,
  description: `Sponsor the Prototypr weekly newsletter and support the platform.`,
  // image:``,
  canonical: `https://prototypr.io/sponsor`,
  url: `https://prototypr.io/sponsor`,
};

const SponsorBookingPage = ({ allProducts }) => {
  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });

  const router = useRouter();

  //use useeffect to get newsletter and website products from packageIds in router.query

  const [selectedPackages, setSelectedPackages] = useState(null);
  const [selectedPackageObjects, setSelectedPackageObjects] = useState(null);

  useEffect(() => {
    if (router.query.packages) {
      //loop through packages and match with allProducts to get the newsletter and website products
      let packages = router.query.packages.split(",");
      setSelectedPackages(packages);
      if (packages) {
        let selected = [];
        packages.forEach(packageId => {
          let product = allProducts.find(product => product.uid === packageId);
          if (product) {
            selected.push(product);
          }
        });
        setSelectedPackageObjects(selected);
      }
    } else {
      setSelectedPackages([]);
      setSelectedPackageObjects([]);
    }
  }, [router.query.packages]);

  return (
    <>
      {/* only show job post form if user is logged in, so we can prefill it if they have a company */}

      <SponsorshipForm
        user={user}
        router={router}
        allProducts={allProducts}
        selectedPackages={selectedPackages}
        selectedPackageObjects={selectedPackageObjects}
      />
    </>
  );
};

const SponsorshipForm = ({
  user,
  router,
  allProducts,
  selectedPackages,
  selectedPackageObjects,
}) => {
  const FormSchema = Yup.object().shape({
    sponsorEmail: !user?.isLoggedIn
      ? Yup.string().email("Not Proper email").required("Email is required")
      : Yup.string().email("Not Proper email"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    link: Yup.string()
      .url("Invalid Link")
      .required("Sponsored link is required"),
    banner: Yup.mixed().required("Please add your newsletter banner"),
    featuredImage: Yup.mixed().required("Please add a featured image"),
  });

  const [errores, setErrores] = useState(false);

  const [uploadNewFeaturedImage, setUploadNewFeaturedImage] = useState(true);
  const [uploadNewBanner, setUploadNewBanner] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    validateOnChange: errores ? true : false,
    initialValues: {
      // productId: router?.query?.id,
      // productIds: `${router?.query?.newsletter}, ${router?.query?.website}`,//comma separated list of product ids
      // selectedPackages: router.query.packages
      //   ? router.query.packages.split(",")
      //   : [],
      title: "",
      description: "",
      link: "",

      banner: "",
      featuredImage: "",
      // @todo make sure this prepopulates
      sponsorEmail: user?.isLoggedIn ? user?.profile?.email : "",
    },
    validationSchema: FormSchema,
    onSubmit: values => {
      const submit = async () => {
        setIsSubmitting(true);
        try {
          if (user?.isLoggedIn) {
            const id = await createSponsorAsUser({
              user,
              values,
              packages:selectedPackageObjects,
              uploadNewBanner,
              uploadNewFeaturedImage,
            });

            if (id) {
              router.push(`/sponsor/booking/${id}/payment`);
            }
          } else {
            //create sponsor as admin
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_HOME_URL}/api/post/createSponsor`,
              {
                values,
                packages:selectedPackageObjects
              }
            );

            if (response?.data?.id) {
              // Append text fields
              if (uploadNewBanner) {
                const loadingBanner = toast.loading(
                  "Uploading your banner...",
                  {
                    duration: 3000,
                  }
                );
                const file = new File([values.banner], `banner_.png`, {
                  type: "image/png",
                });

                const formData = new FormData();
                formData.append("files", file, "banner");
                formData.append("refId", response?.data?.id);
                formData.append("field", "banner");
                formData.append("ref", "api::sponsored-post.sponsored-post");
                const response2 = await axios.post(
                  `${process.env.NEXT_PUBLIC_HOME_URL}/api/post/attachImage`,
                  formData,
                  {
                    headers: {
                      // Axios and modern browsers will automatically set the Content-Type
                      // to multipart/form-data with the correct boundary.
                    },
                  }
                );
                if (loadingBanner) {
                  toast.dismiss(loadingBanner);
                }
              }
              if (uploadNewFeaturedImage) {
                const file = new File(
                  [values.featuredImage],
                  `featuredImage_.png`,
                  {
                    type: "image/png",
                  }
                );
                const featuredImage = toast.loading(
                  "Uploading featured image...",
                  {
                    duration: 3000,
                  }
                );

                const formData = new FormData();
                formData.append("files", file, "featuredImage");
                formData.append("refId", response?.data?.id);
                formData.append("field", "featuredImage");
                formData.append("ref", "api::sponsored-post.sponsored-post");
                const response3 = await axios.post(
                  `${process.env.NEXT_PUBLIC_HOME_URL}/api/post/attachImage`,
                  formData,
                  {
                    headers: {
                      // Axios and modern browsers will automatically set the Content-Type
                      // to multipart/form-data with the correct boundary.
                    },
                  }
                );
                if (featuredImage) {
                  toast.dismiss(featuredImage);
                }
              }

              router.push(`/sponsor/booking/${response?.data.id}/payment`);
            }
          }
        } catch (e) {
          alert("Form failed to save, please try again or contact support.");
          setIsSubmitting(false);
        }
      };

      submit();
    },
  });

  const { dirty, errors, isValid } = formik;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (errors && isEmptyObject(errors)) {
      setErrores(false);
    } else {
      setErrores(true);
      // setDisabled(true);
    }
  }, [errors]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  // create function to give total price from selected products  - use setState
  //total should be formik newsletter plus formik website
  // get the prices from rawPrice of the selected products in SponsorPackages

  useEffect(() => {
    let price = 0;
    let applyDiscount = false;
    let selected_types = [];

    if (router.query.packages) {
      let packages = router.query.packages.split(",");
      //get all prices and add them together
      packages.forEach(packageId => {
        //add the selected types
        if (
          allProducts.find(product => product.uid === packageId)?.type ===
          "newsletter"
        ) {
          selected_types.push("newsletter");
        }
        if (
          allProducts.find(product => product.uid === packageId)?.type ===
          "website"
        ) {
          selected_types.push("website");
        }
        //add the price
        let product = allProducts.find(product => product.uid === packageId);
        if (product) {
          price += product.price;
        }
      });

      if (
        selected_types.includes("newsletter") &&
        selected_types.includes("website")
      ) {
        applyDiscount = true;
      }
    }
    setTotalPrice(price);
    setSelectedTypes(selected_types);

    if (applyDiscount) {
      setDiscountedPrice(price * 0.8);
      setDiscountAmount(price * 0.2);
    } else {
      setDiscountedPrice(false);
      setDiscountAmount(0);
    }
  }, [router.query.packages]);

  return (
    <Layout seo={seo} showWriteButton={false} background="#EFF2F8">
      <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-8">
        <div className="max-w-[1320px] w-full">
          {user?.profile?.activeCompany && <CompanyNav user={user} />}

          <div className={`${user?.profile?.activeCompany ? "pt-8" : ""}`}>
            <FormBreadCrumbs />
          </div>
          <div className="flex flex- w-full">
            <div className="w-[720px]">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if ((errors && isEmptyObject(errors)) || !errors) {
                    setDisabled(false);
                    formik.handleSubmit();
                  } else {
                    // setDisabled(true);
                    toast.error(
                      "Hmmmm, it seems like some of the fields are empty."
                    );
                  }
                }}
              >
                <SponsorPostForm
                  user={user}
                  formik={formik}
                  setUploadNewBanner={setUploadNewBanner}
                  setUploadNewFeaturedImage={setUploadNewFeaturedImage}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  // disabled={errores}
                  className={`w-full mt-8 p-4 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  Save and Continue
                </button>
              </form>
            </div>
            <div className="w-2/5 pl-6">
              <div className="p-6 bg-white sticky h-fit top-[120px] rounded-xl border border-opacity-20 border-gray-300/70">
                <div className="mb-3">
                  <h1 className="text-xl font-semibold mx-auto mb-2">
                    Choose Package(s)
                  </h1>
                  {/* <p className="text-gray-600">Sponsor our newsletter of ~25k subscribers.</p> */}
                </div>

                {selectedPackages ? (
                  <MultiSelectPackages
                    formik={formik}
                    packages={allProducts}
                    selectedPackages={selectedPackages}
                  />
                ) : (
                  ""
                )}

                {/* <NewsletterSponsorChoose formik={formik} newsletterProducts={newsletterProducts} /> */}
                {/* <WebsiteSponsorChoose formik={formik} websiteProducts={websiteProducts} /> */}
                <div className="mt-3">
                  <SelectedProductsDisplay
                    selectedProducts={selectedPackageObjects}
                    totalPrice={totalPrice}
                    discountedPrice={discountedPrice}
                    discount={discountAmount}
                  />
                </div>

                <div className="">
                  {formik.values.websiteProductId &&
                  !formik.values.newsletterProductId ? (
                    <p className="text-gray-500 text-sm">
                      Add a newsletter sponsor and save 20%
                    </p>
                  ) : null}

                  {selectedTypes.length &&
                  !selectedTypes.includes("website") ? (
                    <div className="text-gray-700 text-sm mt-6 flex bg-blue-50 p-2 rounded-lg px-3">
                    <BrowserIcon className={"my- w-8 h-8"} />
                    <div className="flex flex-col ml-3 justify-center">
                      <h4 className="text-md font-semibold">Get 20% off</h4>
                    <div className="my-auto text-sm">
                      Combine with a website sponsorship for a{" "}
                      <span className="font-">20% discount</span>.
                    </div>
                      </div>
                  </div>
                  ) : selectedTypes.length &&
                    !selectedTypes.includes("newsletter") ? (
                    <div className="text-gray-700 text-sm mt-6 flex bg-blue-50 p-2 rounded-lg px-3">
                      <EnvelopeIcon className={"my- w-8 h-8"} />
                      <div className="flex flex-col ml-3 justify-center">
                        <h4 className="text-md font-semibold">Get 20% off</h4>
                      <div className="my-auto text-sm">
                        Combine with a newsletter sponsorship for a{" "}
                        <span className="font-">20% discount</span>.
                      </div>
                        </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SponsorBookingPage;

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

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
