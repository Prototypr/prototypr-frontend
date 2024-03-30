import Layout from "@/components/layout-dashboard";
// import Layout from "@/components/layout";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";

import { SponsorPackages } from "@/lib/constants/products";
import SelectSponsor from "@/components/Primitives/SelectSponsor";
import { createSponsorAsUser } from "@/lib/axios/createSponsor/createSponsorAsUser";

// import CompanyForm from "@/components/Sponsor/Forms/CompanyForm";
import SponsorPostForm from "@/components/Sponsor/Forms/SponsorPostForm";
import FormBreadCrumbs from "@/components/Sponsor/Forms/FormBreadcrumbs";
import CompanyNav from "@/components/Sponsor/CompanyNav";
import AdOutline from "@/components/Sponsor/AdOutline";

let axios = require("axios");

const seo = {
  title: `Sponsor Prototypr`,
  description: `Sponsor the Prototypr weekly newsletter and support the platform.`,
  // image:``,
  canonical: `https://prototypr.io/sponsor`,
  url: `https://prototypr.io/sponsor`,
};

const SponsorBookingPage = () => {
  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });

  const router = useRouter();

  return (
    <>
      {/* only show job post form if user is logged in, so we can prefill it if they have a company */}
      {router.query.id ? (
        <SponsorshipForm user={user} router={router} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const SponsorshipForm = ({ user, router }) => {
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
    featuredImage: Yup.mixed().required("Please add a featured image")
  });

  const [errores, setErrores] = useState(false);

  const [uploadNewFeaturedImage, setUploadNewFeaturedImage] = useState(true);
  const [uploadNewBanner, setUploadNewBanner] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    validateOnChange: errores ? true : false,
    initialValues: {
      productId: router?.query?.id,
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
              uploadNewBanner,
              uploadNewFeaturedImage,
            });
           
            if(id){
              router.push(`/sponsor/booking/${id}/payment`);
            }
            
          } else {
            //create sponsor as admin
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_HOME_URL}/api/post/createSponsor`,
              {
                values,
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

  const [selectedProduct, setSelectedProduct] = useState(() => {
    const id = formik.values.productId
      ? formik.values.productId
      : router.query.id;
    let foundObject = SponsorPackages.newsletter.find(
      obj => obj.productId === id
    );

    if (!foundObject) {
      foundObject = SponsorPackages.website.find(obj => obj.productId === id);
    }
    if (foundObject) {
      return foundObject;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (router?.query?.id) {
      let foundObject = SponsorPackages.newsletter.find(
        obj => obj.productId === router.query.id
      );

      if (!foundObject) {
        foundObject = SponsorPackages.website.find(
          obj => obj.productId === router.query.id
        );
      }
      if (foundObject) {
        setSelectedProduct(foundObject);
      }
    }
  }, [router?.query?.id]);

  useEffect(() => {
    const id = formik.values.productId ? formik.values.productId : router.query;
    if (id) {
      let foundObject = SponsorPackages.newsletter.find(
        obj => obj.productId === id
      );
      if (!foundObject) {
        foundObject = SponsorPackages.website.find(obj => obj.productId === id);
      }
      if (foundObject) {
        setSelectedProduct(foundObject);
      }
    }
  }, [formik.values]);

  
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
              <div className="p-6 bg-white rounded-xl border mb-6 border-opacity-20 border-gray-300/70">
              <div className="mb-3">
                <h1 className="text-xl font-semibold mx-auto mb-2">
                  Select Package
                </h1>
                {/* <p className="text-gray-600">Sponsor our newsletter of ~25k subscribers.</p> */}
              </div>
              <div className="">
                {router?.query?.id && (
                  <SelectSponsor
                    items={SponsorPackages}
                    defaultValue={router?.query?.id}
                    className="w-full text-lg bg-white h-[56px] rounded-xl py-3 border border-gray-300"
                    onChange={val => {
                      formik.setFieldValue("productId", val);
                    }}
                  ></SelectSponsor>
                )}
              </div>
              </div>
              <AdOutline selectedProduct={selectedProduct} />
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
