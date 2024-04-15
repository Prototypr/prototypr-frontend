import Layout from "@/components/layout-dashboard";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { useLoad } from "@/components/Sponsor/sponsorHooks";
import Fallback from "@/components/atom/Fallback/Fallback";
import SelectSponsor from "@/components/Primitives/SelectSponsor";
import { SponsorPackages } from "@/lib/constants/products";
import CompanyNav from "@/components/Sponsor/CompanyNav";
import FormBreadCrumbs from "@/components/Sponsor/Forms/FormBreadcrumbs";
import SponsorPostForm from "@/components/Sponsor/Forms/SponsorPostForm";
import AdOutline from "@/components/Sponsor/AdOutline";
import updateSponserAsUser from "@/lib/axios/updateSponsor/updateSponsor";

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

const SponsorEditPage = () => {
  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  const { loading, isOwner, postObject } =
    useLoad(user);


  if (loading) {
    return <Fallback />;
  }

  return (
    <>
      {/* only show job post form if user is logged in, so we can prefill it if they have a company */}
      {user && !isOwner && user && !postObject.isMember ? (
        <p>You are not owner of this post</p>
      ) : (
       
          <EditForm
            postObject={postObject}
            user={user}
          />
      )}
    </>
  );
};

const EditForm = ({ user, postObject }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    link: Yup.string()
      .url("Invalid Link")
      .required("Sponsored link is required"),
    banner: Yup.mixed().required("Please add your newsletter banner"),
    featuredImage: Yup.mixed().required("Please add a featured image"),
  });

  const [errores, setErrores] = useState(false);

  const [uploadNewFeaturedImage, setUploadNewFeaturedImage] = useState(false);
  const [uploadNewBanner, setUploadNewBanner] = useState(false);

  const formik = useFormik({
    validateOnChange: errores ? true : false,
    initialValues: {
      productId: postObject?.productId ? postObject.productId : "",
      title: postObject?.title ? postObject.title : "",
      description: postObject?.description ? postObject.description : "",
      link: postObject?.link ? postObject.link : "",

      banner: postObject?.banner ? postObject.banner : "",
      featuredImage: postObject?.featuredImage ? postObject.featuredImage : "",
    },
    validationSchema: FormSchema,
    onSubmit: values => {
      values.sponsoredPostId = postObject.id;

      async function submit() {
        setIsSubmitting(true);
        try{

          const id = await updateSponserAsUser({
            user,
            values,
            uploadNewBanner,
            uploadNewFeaturedImage,
          });
         
          if(id && postObject?.paid !== true){
            router.push(`/sponsor/booking/${id}/payment`);
          }else{
            setIsSubmitting(false);
          }

        }catch(e){
          toast.error("Your post failed to update! Please try again or contact support.", {
            duration: 5000,
          });
          setIsSubmitting(false);
        }
      }

      submit();
    },
  });

  const [selectedProduct, setSelectedProduct] = useState(() => {
    const id = formik.values.productId
      ? formik.values.productId
      : postObject?.productId;
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
    if (postObject?.productId) {
      let foundObject = SponsorPackages.newsletter.find(
        obj => obj.productId === postObject?.productId
      );

      if (!foundObject) {
        foundObject = SponsorPackages.website.find(
          obj => obj.productId === postObject?.productId
        );
      }
      if (foundObject) {
        setSelectedProduct(foundObject);
      }
    }
  }, [postObject?.productId]);

  useEffect(() => {
    const id = formik.values.productId
      ? formik.values.productId
      : postObject?.productId;
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

  return (
    <Layout background="#EFF2F8">
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
                  header={'Update yor advert'}
                  subtext={`Change your product title, description, and media.`}
                  postObject={postObject}
                  user={user}
                  formik={formik}
                  setUploadNewBanner={setUploadNewBanner}
                  setUploadNewFeaturedImage={setUploadNewFeaturedImage}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  // disabled={errores}
                  className="w-full p-4 mt-6 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {postObject?.paid==true?'Update':'Save and Continue'}
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
                  {postObject?.productId && (
                    <SelectSponsor
                      disabled={postObject?.paid == true}
                      items={SponsorPackages}
                      defaultValue={postObject?.productId}
                      className="w-full text-lg bg-white h-[56px] rounded-xl py-3 border border-gray-300"
                      onChange={val => {
                        formik.setFieldValue("productId", val);
                      }}
                    ></SelectSponsor>
                  )}
                </div>
                {postObject?.paid == true ? <div className="text-sm text-gray-500/90 mt-2">You have already paid for this sponsorship.</div> : null}
              </div>
             <AdOutline selectedProduct={selectedProduct} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SponsorEditPage;
