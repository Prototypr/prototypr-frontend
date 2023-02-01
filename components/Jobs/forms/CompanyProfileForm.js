import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import Button from "@/components/Primitives/Button";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
let axios = require("axios");

const CompanyProfileForm = ({goNext}) =>{

    
  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });

  const [defaultCompany, setDefaultCompany] = useState(null)

  useEffect(()=>{
    if(user?.isLoggedIn){
      if(user?.profile?.companies[0]?.name){
        //just set to the first company, chances are ppl have 1 company to start with
        setDefaultCompany(user.profile?.companies[0])
      }else{
        setDefaultCompany({name:''})  
      }
    }
  },[user])

  return(
    <>
    {defaultCompany?
      <Form user={user} 
      defaultCompany={defaultCompany}
      goNext={goNext}/>
    :''}
    </>
  )

}

const Form = ({user, defaultCompany, goNext}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)



  const FormSchema = Yup.object().shape({
   companyLogo: Yup.mixed().required("Please add your company's logo"),
    companyName: Yup.string().required("Company Name is required"),
    companyWebsite: Yup.string()
      .url("Invalid URL")
      .required("Company Website is required"),
    contactEmail: Yup.string()
      .email("Not Proper email")
      .required("Contact Email is required"),
  });

  const [errores, setErrores] = useState(false)
  const [uploadNewCompanyImage, setUploadNewCompanyImage] = useState(false)

  const formik = useFormik({
    validateOnChange:errores?true:false,
    initialValues: {
      companyLogo:defaultCompany?.logo?defaultCompany?.logo:"",
      companyName: defaultCompany?.name?defaultCompany?.name:"",
      companyWebsite: defaultCompany?.url?defaultCompany?.url:"",
      contactEmail: defaultCompany?.email?defaultCompany?.email:"",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
console.log(values)
      async function submit() {
        let configUpload = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/createCompany`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
          data: {
            ...values,
          },
        };

        await axios(configUpload)
          .then(async function (response) {

            console.log(response)
            if(response?.data?.posted==true){

              /**
               * upload company logo
               */
               if(values.companyLogo && uploadNewCompanyImage==true){     
                toast.loading("Uploading your company logo...", {
                  duration: 3000,
                });
                const file = new File([values.companyLogo], `companylogo_.png`, {
                  type: "image/png",
                });
                
                const data = {}
                const formData = new FormData();
                formData.append("files", file, 'logo');
                formData.append('data', JSON.stringify(data));
                formData.append('refId', response?.data?.companyId);
                formData.append('field', 'logo');
                formData.append('ref', 'api::company.company');

      
                var imageConfig = {
                  method: "post",
                  url: `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
                  headers: {
                    Authorization: `Bearer ${user?.jwt}`,
                  },
                  data: formData,
                };

      
                await axios(imageConfig)
                  .then(async function (response) {
                      //set field value to id of image, which is used to attach to post
                      toast.success("Upload complete!", {
                        duration: 3000,
                      });

                  })
                  .catch(function (error) {
                    console.log(error);
                    toast.console.warn("The company logo failed to save.", {
                      duration: 3000,
                    });
                  });
              }

            //redirect to success page
            setIsSubmitting(false)
              toast.success("Company saved!", {
                duration: 3000,
              });
              goNext(values)

              // router.push(`/jobs/post/${response?.data.id}/payment`);
              // formik.resetForm();
            }else{
              toast.error(response?.data?.message?response?.data?.message:'Something went wrong submitting your post!', {
                duration: 5000,
              });
            }
            console.log("Done! ->", response);
          })
          .catch(function (error) {
            console.log(error)
            toast.error("Your Job Post has been saved!", {
              duration: 5000,
            });
          });
      }

      submit();
    },
  });


  const { dirty, errors, isValid } = formik;
  const [disabled, setDisabled] = useState(false);

  useEffect(()=>{
    if(defaultCompany?.logo){
      formik.setFieldValue("companyLogo",defaultCompany?.logo)
    }

  },[defaultCompany?.logo])
  
  useEffect(() => {
    if (errors && isEmptyObject(errors)) {
      setErrores(false);
    } else {
      setErrores(true)
      // setDisabled(true);
    }
  }, [errors]);


  return (
    <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-10 pb-10">
        <div className="max-w-2xl pt-24 w-full">
        <div className="my-2 mb-6">
          <h1 className="text-2xl font-bold mx-auto mb-2">Post an opportunity</h1>
          <p className="text-gray-600">Let's start with your company/brand profile.</p>
        </div>
        <div className="bg-white p-10 pt-12 rounded-xl">
          <form
          onSubmit={(e) => {
            e.preventDefault();

            setIsSubmitting(true)
            if ((errors && isEmptyObject(errors)) || !errors) {
              setDisabled(false);
              formik.handleSubmit();
            } else {
              // setDisabled(true);
              toast.error("Hmmmm, it seems like some of the fields are empty.");
            }
          }}
        >
            <FormContainer>
              <div className="flex mx-auto -mt-3 flex-col gap-5 max-w-2xl mb-8">
                <FormInput
                  id="companyName"
                  label="What's your company called?"
                  error={formik.errors}
                >
                  <p className="text-gray-500 -mt-2 mb-0.5 text-sm">If you don't have a company, use the project's brand or name.</p>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    placeholder="Unicorn Platform"
                    className={styles.input}
                  />
                </FormInput>
                <label htmlFor="image" className="text-md font-medium">
                Add your company or brand logo
              </label>
              <p className="text-gray-500 -mt-4 text-sm">The logo that'll appear on the jobs board - usually a company, but could be a brand.</p>
              <ImageUploader 
              id={3}
              companyLogoIsDefault={true} 
              initialImage={defaultCompany?.logo} 
              setFormValue={(blob) =>{
                setUploadNewCompanyImage(true)
                formik.setFieldValue("companyLogo",blob)
              }}/>
              {/* <ImageUploader initialImage={defaultCompany?.logo} setFormValue={(blob) =>{
                setImageBlob(blob)
                formik.setFieldValue("image",blob)
              }}/> */}
              {formik.errors.companyLogo && <span className="text-red-600 text-xs">{formik.errors.companyLogo}</span>}

                {/* <div className="flex p-6 -mt-2 border border-gray-300 rounded-lg items-center space-x-6">
                <div class="shrink-0">
                <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
                </div>
                <label class="block">
                  <span class="sr-only">Choose avatar</span>
                  <input 
                    type="file" 
                    id="logo"
                    name="logo"
                    accept="image/png, image/jpeg"
                    class="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "/>
                </label>
                </div> */}
                <div className="mt-2">
                  <FormInput
                    id="companyWebsite"
                    label="Company/Project Website"
                    error={formik.errors}
                  >
                    <input
                      id="companyWebsite"
                      name="companyWebsite"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.companyWebsite}
                      placeholder="https://unicornplatform.com"
                      className={styles.input}
                    />
                  </FormInput>
                </div>
                <div className="mt-2">
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
                    placeholder="hello@unicorns.xyz"
                    className={styles.input}
                  />
                </FormInput>
                </div>
              </div>
            </FormContainer>
            <Button
                variant={"confirmBig"}
                type="submit"
                disabled={isSubmitting}
                className="p-4 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                {isSubmitting?
                <div className="mx-auto w-6">
                <Spinner />
                </div>
                :
                `Save and Continue`}
                </Button>
            </form>
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
  );
};

export default CompanyProfileForm

const styles = {
  input:
    "w-full px-3 max-w-2xl  bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  inputFlex:
    "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  label: "text-md font-medium uppercase text-gray-700 font-semibold",
  inputError: "text-xs font-medium uppercase text-red-400",
};

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}