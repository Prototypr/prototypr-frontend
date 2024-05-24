import Layout from "@/components/layout-dashboard";
// import Layout from "@/components/layout";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
// import Link from "next/link";

// import { createSponsorAsUser } from "@/lib/axios/createSponsor/createSponsorAsUser";
import { updateCompany } from "@/lib/axios/updateCompany/updateCompany";
import CompanyForm from "@/components/Sponsor/Forms/CompanyForm";
// import FormBreadCrumbs from "@/components/Sponsor/Forms/FormBreadcrumbs";
import CompanyNav from "@/components/Sponsor/CompanyNav";
import DashboardNavigation from "@/components/DashboardPartners/DashboardNavigation";

// let axios = require("axios");

const seo = {
  title: `Sponsor Prototypr`,
  description: `Sponsor the Prototypr weekly newsletter and support the platform.`,
  // image:``,
  canonical: `https://prototypr.io/sponsor`,
  url: `https://prototypr.io/sponsor`,
};

const EditCompanyPage = () => {
  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });

  const router = useRouter();

  return (
    <>
      {user?.profile?.activeCompany ? (
        <EditCompanyForm
          user={user}
          defaultCompany={user.profile?.activeCompany}
          router={router}
        />
      ) : null}
    </>
  );
};

const EditCompanyForm = ({ user, defaultCompany, router }) => {
  const FormSchema = Yup.object().shape({
    companyLogo: user?.isLoggedIn
      ? Yup.mixed().required("Please add your company's logo")
      : Yup.mixed(),
    companyName: user?.isLoggedIn
      ? Yup.string().required("Company Name is required")
      : Yup.string(),
    companyWebsite: user?.isLoggedIn
      ? Yup.string().url("Invalid URL").required("Company Website is required")
      : Yup.string().url("Invalid URL"),
    contactEmail: user?.isLoggedIn
      ? Yup.string()
          .email("Not Proper email")
          .required("Contact Email is required")
      : Yup.string().email("Not Proper email"),
  });

  const [errores, setErrores] = useState(false);

  const [uploadNewCompanyImage, setUploadNewCompanyImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultCompany?.logo) {
      setUploadNewCompanyImage(false);
    }
  }, [defaultCompany?.logo]);

  const formik = useFormik({
    validateOnChange: errores ? true : false,
    initialValues: {
      companyLogo: defaultCompany.logo ? defaultCompany.logo : "",
      companyName: defaultCompany.name ? defaultCompany.name : "",
      companyWebsite: defaultCompany.url ? defaultCompany.url : "",
      contactEmail: defaultCompany.email ? defaultCompany.email : "",
      // @todo make sure this prepopulates
      sponsorEmail: user?.isLoggedIn ? user?.profile?.email : "",
    },
    validationSchema: FormSchema,
    onSubmit: values => {
      const submit = async () => {
        setIsSubmitting(true);
        try {
          if (user?.isLoggedIn) {
            await updateCompany({
              user,
              values,
              companyId: defaultCompany.id,
              uploadNewCompanyImage,
            });
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
    if (defaultCompany?.logo) {
      formik.setFieldValue("companyLogo", defaultCompany?.logo);
    }
  }, [defaultCompany?.logo]);

  useEffect(() => {
    if (errors && isEmptyObject(errors)) {
      setErrores(false);
    } else {
      setErrores(true);
      // setDisabled(true);
    }
  }, [errors]);

  return (
    <Layout seo={seo} showSponsorButton={true} showWriteButton={false} >
      <div
        className="pb-20 mx-auto px-2 sm:px-6 lg:px-8 "
        style={{ maxWidth: 1200 }}
      >
        {user?.profile?.activeCompany && <CompanyNav user={user} />}
        <div
          className={`${user?.profile?.activeCompany ? "pt-8" : ""} flex w-full max-w-6xl mx-auto flex-col md:flex-row`}
        >
          <DashboardNavigation activeTab={1} />
          <div className="w-full mx-auto px-2 sm:pr-0 sm:pl-6 lg:pl-8">
            <div className="pb-10 px-0 xl:px-0">
              <div className="bg-white rounded-xl p-6 border border border-gray-300/70">
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
                  <CompanyForm
                    defaultCompany={defaultCompany}
                    formik={formik}
                    user={user}
                    setUploadNewCompanyImage={setUploadNewCompanyImage}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    // disabled={errores}
                    className={`w-full mt-8 px-4 h-[40px] bg-blue-600 hover:bg-blue-500 text-white font-semibold w-[fit-content] rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
                  >
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="hidden md:block lg:px-20">
          Your job will be posted on our jobs board, plus:
        <ul>
          <li>Sent out in our newsletter</li>
          <li>Sent out in our newsletter</li>
          <li>Sent out in our newsletter</li>
        </ul>
        </div> */}
      </div>
    </Layout>
  );
};

export default EditCompanyPage;

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}
