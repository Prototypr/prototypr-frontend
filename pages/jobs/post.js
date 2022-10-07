import Layout from "@/components/layout-dashboard";

import React, { useEffect, useState } from "react";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { FormStepper, FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";

let axios = require("axios");

const styles = {
  input:
    "w-full px-4 py-6 max-w-lg  bg-white text-black font-normal text-sm rounded border focus:outline-none focus:ring-2 focus:ring-blue-600",
  label: "text-xs uppercase text-gray-700 font-semibold",
  inputError: "text-xs font-medium uppercase text-red-400",
};

const PostJobPage = () => {
  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });
  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    salaryRange: Yup.string().required("Salary is required"),
    url: Yup.string().url("Invalid URL").required("Job URL is required"),
    tags: Yup.string().required("tags is required"),
    location: Yup.string().required("location is required"),
    companyName: Yup.string().required("Company Name is required"),
    companyWebsite: Yup.string()
      .url("Invalid URL")
      .required("Company Website is required"),
    contactEmail: Yup.string()
      .email("Not Proper email")
      .required("Contact Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      salaryRange: "",
      url: "",
      tags: "",
      location: "",
      companyName: "",
      companyWebsite: "",
      contactEmail: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      async function submit() {
        let configUpload = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/createJobPost`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
          data: {
            ...values,
          },
        };

        await axios(configUpload)
          .then(async function (response) {
            toast.success("Your Job Post has been submitted!", {
              duration: 3000,
            });
            formik.resetForm();
            console.log("Done! ->", response);
          })
          .catch(function (error) {});
      }

      submit();
    },
  });

  return (
    <Layout background="#EFF2F8">
      <div className=" w-full h-full ">
        <div className="my-2">
          <h1 className="text-2xl">Post a Job</h1>
        </div>
        <div className="bg-white p-10 rounded">
          <FormStepper onSubmit={formik.handleSubmit} formik={formik}>
            <FormContainer>
              <div className="flex flex-col gap-5 max-w-lg  w-auto">
                <h1 className="text-2xl">Write down job details</h1>
                <FormInput id="title" label="Post Title" error={formik.errors}>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="Product Designer"
                    className={styles.input}
                  />
                </FormInput>

                <FormInput id="url" label="Job Link" error={formik.errors}>
                  <input
                    id="url"
                    name="url"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.url}
                    placeholder="prototypr.io/jobs/post1"
                    className={styles.input}
                  />
                </FormInput>
                <FormInput id="tags" label="Category" error={formik.errors}>
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.tags}
                    placeholder="figma, sketch, design systems"
                    className={styles.input}
                  />
                </FormInput>
                <FormInput
                  id="salaryRange"
                  label="Salary"
                  error={formik.errors}
                >
                  <input
                    id="salaryRange"
                    name="salaryRange"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.salaryRange}
                    placeholder="$75k - $100k"
                    className={styles.input}
                  />
                </FormInput>
                <FormInput id="location" label="Location" error={formik.errors}>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    placeholder="Remote or New York or Liverpool"
                    className={styles.input}
                  />
                </FormInput>
              </div>
            </FormContainer>
            <FormContainer>
              <div className="flex flex-col gap-5 max-w-lg  w-auto">
                <h1 className="text-2xl">Add Company Details</h1>
                <FormInput
                  id="companyName"
                  label="Company Name"
                  error={formik.errors}
                >
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    placeholder="Company Name"
                    className={styles.input}
                  />
                </FormInput>

                <FormInput
                  id="companyWebsite"
                  label="Company Website"
                  error={formik.errors}
                >
                  <input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.companyWebsite}
                    placeholder="Company Website"
                    className={styles.input}
                  />
                </FormInput>
                <FormInput
                  id="contactEmail"
                  label="Contact Email"
                  error={formik.errors}
                >
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.contactEmail}
                    placeholder="Contact Email"
                    className={styles.input}
                  />
                </FormInput>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/png, image/jpeg"
                  className={styles.input}
                />
              </div>
            </FormContainer>
          </FormStepper>
        </div>
      </div>
    </Layout>
  );
};

export default PostJobPage;
