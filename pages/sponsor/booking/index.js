import Layout from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { sponsorTypes} from "@/lib/constants";
import Link from "next/link";


const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

let axios = require("axios");

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

const seo={
  title:`Sponsor Prototypr`,
  description:`Sponsor the Prototypr weekly newsletter and support the platform.`,
  // image:``,
  canonical: `https://prototypr.io/sponsor`,
  url: `https://prototypr.io/sponsor`
}

const SponsorBookingPage = () =>{

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

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  if(!user || user?.isLoggedIn==false){
    return(
      <Layout seo={seo}>
      <div className="w-full relative p-4 mx-auto ">
        <div
          className="w-full bg-white shadow-sm p-8 rounded-lg flex justify-center mx-auto mt-8"
          style={{ maxWidth: 650 }}
        >
          <LoginForm 
          title="Sign up to sponsor us" 
          isSignUp={isSignUp} />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="text-sm text-gray-700">
          <span>
            {isSignUp
              ? "Already got an account?"
              : "Not got an account yet?"}
          </span>
          <a
            onClick={toggleSignIn}
            className="text-primary-400 cursor-pointer"
          >
            {isSignUp ? " Sign in." : " Sign up"}
          </a>
        </div>
      </div>
    </Layout>
    )
  }


  return(
    <>
    {/* only show job post form if user is logged in, so we can prefill it if they have a company */}
    {(defaultCompany!==null && typeof defaultCompany!==undefined) && 
    <JobPostForm user={user} defaultCompany={defaultCompany}/>
    }
    </>
  )
}

const JobPostForm = ({user, defaultCompany}) => {
  const router = useRouter();
  const [available, setAvailable] = useState(true)


    
  useEffect(()=>{
      
      const getProd = async()=>{
          const response = await axios.get( "http://localhost:1337/strapi-stripe/getProduct/1" )


          if(response.data.availability===false){
            setAvailable(false)
          }
      }
      
      // used to be in the strapi script, but doing it directly on the front end
      // const s = document.createElement("script");
      // // s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
      // s.setAttribute("src", "http://localhost:1337/plugins/strapi-stripe/static/stripe.js");
      // s.setAttribute("async", "true");
      // document.head.appendChild(s);
      
      getProd()
   
    },[])


  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    link: Yup.string().url("Invalid Link").required("Sponsored link is required"),
    
    banner: Yup.mixed().required("Please add your newsletter banner"),
    featuredImage: Yup.mixed().required("Please add a featured image"),
    
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
  const [uploadNewFeaturedImage, setUploadNewFeaturedImage] = useState(true)
  const [uploadNewBanner, setUploadNewBanner] = useState(true)

  useEffect(()=>{
    if(defaultCompany?.logo){
      setUploadNewCompanyImage(false)
    }
  },[defaultCompany?.logo])


  const formik = useFormik({
    validateOnChange:errores?true:false,
    initialValues: {
      type: router?.query?.type=='banner'?"banner":router?.query?.type=='link'?'link':'banner',
      title: "",
      description: "",
      link: "",
     
      banner: "",
      featuredImage: "",
      
      companyLogo:defaultCompany.logo?defaultCompany.logo:"",
      companyName: defaultCompany.name?defaultCompany.name:"",
      companyWebsite: defaultCompany.url?defaultCompany.url:"",
      contactEmail: defaultCompany.email?defaultCompany.email:"",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {

      async function submit() {
        let configUpload = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/createSponsoredPost`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
          data: {
            ...values,
          },
        };

        await axios(configUpload)
          .then(async function (response) {

            if(response?.data?.posted==true){

              /**
               * upload company logo
               */
               if(values?.companyLogo && uploadNewCompanyImage===true){     
                const loadingLogo = toast.loading("Uploading your company logo...");
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
                      if(loadingLogo){
                        toast.dismiss(loadingLogo)
                      }
                      //set field value to id of image, which is used to attach to post
                      toast.success("Logo upload complete!", {
                        duration: 3000,
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                    if(loadingLogo){
                        toast.dismiss(loadingLogo)
                      }
                    toast.console.warn("The company logo failed to save.", {
                      duration: 3000,
                    });
                  });
              }
              /**
               * upload banner
               */
               if(values?.banner && uploadNewBanner===true){     
                const loadingBanner = toast.loading("Uploading your banner...", {
                  duration: 3000,
                });
                const file = new File([values.banner], `banner_.png`, {
                  type: "image/png",
                });
                
                const data = {}
                const formData = new FormData();
                formData.append("files", file, 'banner');
                formData.append('data', JSON.stringify(data));
                formData.append('refId', response?.data?.id);
                formData.append('field', 'banner');
                formData.append('ref', 'api::sponsored-post.sponsored-post');

      
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
                    if(loadingBanner){
                      toast.dismiss(loadingBanner)
                    }
                      //set field value to id of image, which is used to attach to post
                      toast.success("Banner upload complete!", {
                        duration: 3000,
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                    if(loadingBanner){
                      toast.dismiss(loadingBanner)
                    }
                    toast.console.warn("The banner failed to save.", {
                      duration: 3000,
                    });
                  });
                  if(loadingBanner){
                    toast.dismiss(loadingBanner)
                  }
              }
              /**
               * upload featuredImage
               */
               if(values?.featuredImage && uploadNewFeaturedImage ===true){     
                const featuredImage = toast.loading("Uploading featued image...", {
                  duration: 3000,
                });
                const file = new File([values.featuredImage], `featuredImage_.png`, {
                  type: "image/png",
                });
                
                const data = {}
                const formData = new FormData();
                formData.append("files", file, 'featuredImage');
                formData.append('data', JSON.stringify(data));
                formData.append('refId', response?.data?.id);
                formData.append('field', 'featuredImage');
                formData.append('ref', 'api::sponsored-post.sponsored-post');

      
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
                    if(featuredImage){
                      toast.dismiss(featuredImage)
                    }
                      //set field value to id of image, which is used to attach to post
                      toast.success("Featured image uploaded!", {
                        duration: 3000,
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                    if(featuredImage){
                      toast.dismiss(featuredImage)
                    }
                    toast.console.warn("The banner failed to save.", {
                      duration: 3000,
                    });
                  });
                  if(featuredImage){
                    toast.dismiss(featuredImage)
                  }
              }
              toast.success("Your Sponsorship has been saved!", {
                duration: 3000,
              });

              console.log(response.data.id)
              router.push(`/sponsor/booking/${response?.data.id}/payment`);
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
            toast.error("Something went wrong!", {
              duration: 5000,
            });
          });
      }

      submit();
    },
  });


  const { dirty, errors, isValid } = formik;
  const [disabled, setDisabled] = useState(false);
  const [imageBlob, setImageBlob] = useState(false);

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
    <Layout seo={seo} showWriteButton={false} background="#EFF2F8">
      <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-10">
        <div className="max-w-3xl w-full">
        <div className="pt-5 text-md text-gray-700 pb-8">
              <Link href={`/`}>
                <span className="hover:underline">Home</span>
              </Link>{" "}
              →{" "}
              <Link href={`/sponsor`}>
                <span className="hover:underline">Sponsor</span>
              </Link>{" "}
              →{" "}
              <Link href={`/booking`}>
                <span className="underline">Booking</span>
              </Link>
            </div>
        <div className="my-2 mb-6">
          <h1 className="text-2xl font-bold mx-auto mb-2">Book a sponsorship</h1>
          <p className="text-gray-600">Sponsor our newsletter of ~25k subscribers.</p>
        </div>
        <div className="bg-white p-10 pt-12 rounded-xl">
          <form
          onSubmit={(e) => {
            e.preventDefault();
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
              <div className="flex flex-col mx-auto gap-5 max-w-2xl  w-auto">
                <h1 className="text-xl font-medium mb-2">Add your sponsorship assets</h1>
                
                <select
                  defaultValue={router?.query?.type}
                  id="type"
                  name="type"
                  className="w-full -mt-2 bg-white border border-gray-300"
                  onChange={formik.handleChange}
                  aria-describedby="type_error"
                  aria-live="assertive"
                >
                  {sponsorTypes.map((i, index) => (
                    <option key={'type_'+index} value={i.value}>
                      {i.Name}
                    </option>
                  ))}
                </select>
                
                <FormInput id="title" label="Headline" error={formik.errors}>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="Unicorn Platform"
                    className={styles.input}
                  />
                  <p class="text-xs mt-1 text-gray-400">Use your product title if it's a tool.</p>
                </FormInput>             

            <div className="mt-3">
                <FormInput id="link" label="Link" error={formik.errors}>
                  <input
                    id="link"
                    name="link"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.link}
                    placeholder="https://prototypr.io/web-monetization"
                    className={styles.input}
                  />
                </FormInput>
            </div>
            <label className="text-md font-medium mt-4">
                  Short Description
                </label>
                <p class="text-xs -mt-4 mb-2 text-gray-400">This will be used in the newsletter.</p>

                <MiniEditor 
                height={110}
                setDescription={(html)=>{
                    formik.setFieldValue("description",html)
                }}/>
                {formik.errors.description && <span className="text-red-600 text-xs">{formik.errors.description}</span>}
                <br/>
                <hr/>
                <h2 className="mt-3 text-xl mt-4">Image Assets</h2>
              <label htmlFor="featuredImage" className="text-md font-medium">
                Featured Image 
              </label>
              <ImageUploader 
              id={1}
              setFormValue={(blob) =>{
                setUploadNewFeaturedImage(true)
                formik.setFieldValue("featuredImage",blob)
              }}/>
              {formik.errors.featuredImage && <span className="text-red-600 text-xs">{formik.errors.featuredImage}</span>}
             
              <label htmlFor="banner" className="text-md font-medium">
                Newsletter Banner 
              </label>
              <ImageUploader 
              id={2}
              w={600} h={300} setFormValue={(blob) =>{
                setUploadNewBanner(true)
                formik.setFieldValue("banner",blob)
              }}/>
              {formik.errors.banner && <span className="text-red-600 text-xs">{formik.errors.banner}</span>}


            </div>
            </FormContainer>
            <div className="flex flex-col mx-auto max-w-2xl border-t my-8 border-gray-100 w-auto"/>

            <FormContainer>
              <div className="flex mx-auto flex-col gap-5 max-w-2xl border border-gray-300 rounded-lg p-5 w-auto mb-8">
                <h1 className="text-xs text-gray-400 tracking-wide uppercase font-bold">Company Information</h1>
                <FormInput
                  id="companyName"
                  label="What's your Company called?"
                  error={formik.errors}
                >
                  <input
                    id={3}
                    name="companyName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    placeholder="Unicorn Platform"
                    className={styles.input}
                  />
                </FormInput>
                <label htmlFor="companyLogo" className="text-md font-medium">
                Your logo
              </label>
              <ImageUploader 
              id={3}
              companyLogoIsDefault={true} 
              initialImage={defaultCompany?.logo} 
              setFormValue={(blob) =>{
                setUploadNewCompanyImage(true)
                formik.setFieldValue("companyLogo",blob)
              }}/>
              {formik.errors.image && <span className="text-red-600 text-xs">{formik.errors.companyLogo}</span>}

                <div className="mt-2">
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
            <button
              type="submit"
              // disabled={errores}
              className="w-full p-4 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
             Save and Continue
            </button>
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
    </Layout>
  );
};

export default SponsorBookingPage;