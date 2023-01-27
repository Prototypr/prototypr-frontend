import Layout from "@/components/layout-dashboard";
// import { jobTypes} from "@/lib/constants";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
// import TagsInput from "@/components/Jobs/tagsInput";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
// import useGetLocations from "@/components/Jobs/jobHooks/useGetLocations";
// import useGetSkills from "@/components/Jobs/jobHooks/useGetSkills";
import GalleryUpload from "@/components/GalleryUpload/GalleryUpload";
import LoginSide from "@/components/sign-in/LoginSide";
import {
  useWizardContext,
  WizardProvider,
  Steps,
  Step,
} from 'react-sweet-wizard';
import TitleLinkForm from "@/components/toolbox/forms/TitleLinkForm";
import DescriptionExcerptForm from "@/components/toolbox/forms/DescriptionExcerptForm";

const Progress = () => {
  const { activeStepIndex, steps } = useWizardContext();

  return (
    <div>
      State {activeStepIndex + 1} of {steps.length}
    </div>
  );
};

const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

let axios = require("axios");

const slugify = require("slugify");


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
  title:`Post a tool on Prototypr`,
  description:`Share your tool with the Prototypr community.`,
  // image:``,
  canonical: `https://prototypr.io/toolbox/post`,
  url: `https://prototypr.io/toolbox/post`
}

const PostToolPage = () =>{

  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });



  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };


  return(
    <Layout showFooter={false} padding={false} seo={seo} showWriteButton={false} background="#EFF2F8">
      <div className="h-full min-h-screen w-full grid md:grid-cols-12">
          <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
            <div className="flex pt-24 items-center justify-center h-full w-full relative bg-[#195DE2] text-white">
              <LoginSide title="Submit a tool or resource" user={user} />
            </div>
          </div>
    <div className="col-span-12 md:col-span-6 lg:col-span-8">
      {!(user && !user?.isLoggedIn) ? 
      <WizardProvider>
        <ToolSteps user={user}/>
        <div className="mt-6">
          <Navigation />
        </div>
      </WizardProvider>
      // <ToolPostForm user={user}/>
      :
    <div className="w-full h-full bg-[#F4F4F4] grid place-items-center">
    <div className="max-w-[500px] mx-auto">
      <LoginForm isSignUp={isSignUp} />
    </div>
    <div className="absolute top-[2%] right-[2%]">
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
  </div>}
    </div>
     </div>
      </Layout>
  )

}

const ToolSteps = ({user}) =>{
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =useWizardContext();

  const [currentPost, setCurrentPost]= useState()

  const goNext = (data) =>{
    setCurrentPost(data)
    onNext()
  }

  return(
    <Steps>

    <Step key={`page/1`} id={'1'}>
        <div className="flex items-center justify-center h-full w-full relative">
          <TitleLinkForm currentPost={currentPost} user={user} goNext={goNext} />
        </div>
    </Step>
</Steps>
  )
}


const Navigation = () => {
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();

  return (
    <>
    {!isFirstStep?<div>
      <button onClick={onPrevious} disabled={isFirstStep}>
        Previous
      </button>
      <button
        onClick={useCallback(() => {
          if (activeStepIndex === 1) {
            goTo(5);
          } else {
            onNext(() => console.log('Calling `onNext` method'));
          }
        }, [goTo, onNext, activeStepIndex])}
        // disabled={isLastStep}
      >
        Next
      </button>
    </div>:''}
    </>
  );
};

const ToolPostForm = ({user}) => {
  const router = useRouter();
  const [available, setAvailable] = useState(true)
  const [files, setFiles] = useState([])

    
  useEffect(()=>{
      // <script type="text/javascript" src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js" > </script>
      
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
    content: Yup.string().required("Content is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    slug: Yup.string().required("Slug is required"),
    link: Yup.string().required("Link is required"),
    logo: Yup.string().required("Logo is required"),
    gallery: Yup.string().required("This image is required"),
    // image2: Yup.string().required("This image is required"),
    // image3: Yup.string().required("This image is required"),
 
  });

  const [errores, setErrores] = useState(false)
  const [uploadNewCompanyImage, setUploadLogo] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
  	validateOnChange:errores?true:false,
    initialValues: {
      title: "",
      content: "",
      excerpt: "",
      slug: "",
      link: "",
      logo: "",
      gallery:''
    },
    validationSchema: FormSchema,



    onSubmit: (values) => {

    const submit = async () => {

      setIsSubmitting(true)
      toast.loading("Submitting your tool and images...", {
        duration: 5000,
      });

    const entry = {
	    type: "tool",
	    title: values.title,
	    content: values.content,
	    excerpt: values.excerpt,
      date:new Date(),
		link: values.link,
    user:user.id,
		// slug: values.slug,
    status:'draft',
	    seo: {
				opengraphTitle:values.title,
				opengraphDescription: values.excerpt,
				metaDesc:values.excerpt,
				twitterDescription:values.excerpt,
			},
	    esES: false
  };


  const formData = new FormData();
  	formData.append('files.logo', values.logo)
    if(galleryFiles?.length){
      for(var x= 0;x<galleryFiles.length;x++){
        formData.append('files.gallery', galleryFiles[x])
      }
    }
  
	formData.append('data', JSON.stringify({...entry,
              publishedAt:null
            }));

  let publishPostEndpointConfig = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
    
          data: formData
        };

try {
           let postResult =  await axios(publishPostEndpointConfig)
              .then(async function (response) {
                toast.success("Your tool has been submitted!", {
                  duration: 5000,
                });
                return response?.data?.data
              })
              .catch(function (error) {
                console.log(error);
              });

              //redirect to success page
              router.push(`/toolbox/post/success`);
              setIsSubmitting(false)

              return postResult
        } catch {

          setIsSubmitting(false)
          toast.error("Error creating draft! Please contact support for help.", {
            duration: 5000,
          });
          (e) => console.log(e);
        }
    }
      submit();
    },
  });


  const { dirty, errors, isValid } = formik;
  const [disabled, setDisabled] = useState(false);



  useEffect(() => {
    if (errors && isEmptyObject(errors)) {
      setErrores(false);
    } else {
      setErrores(true)
      // setDisabled(true);
    }
  }, [errors]);


  useEffect(() => {


   	formik.setFieldValue("slug", slugify(formik.values.title.toLocaleLowerCase(), {remove: /[^\w\s]/gi}))


  }, [formik.values.title]);

  return (
    <>
      <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-10">
        <div className="max-w-3xl pt-24 w-full">
        <div className="my-2 mb-6">
          <h1 className="text-2xl font-bold mx-auto mb-2">Post a Tool</h1>
          <p className="text-gray-600">Submit your tool for review.</p>
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
              formik.handleSubmit();
              toast.error("Hmmmm, it seems like some of the fields are empty.");
            }
          }}
        >
            <FormContainer>
              <div className="flex flex-col mx-auto gap-5 max-w-2xl  w-auto">
                <FormInput id="title" label="Title" error={formik.errors}>
                  <input
                    id="title"
                    disabled={isSubmitting}
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    // onChange={(e) => { 
                    // 	formik.setFieldValue("title", e.target.value)
                    // 	formik.setFieldValue("slug", slugify(formik.values.title.toLocaleLowerCase(), {remove: /[^\w\s]/gi}))
                    // }}
                    value={formik.values.title}
                    placeholder="Unicorn Platform"
                    className={styles.input}
                  />
                </FormInput>
            

                <label className="text-md font-medium mt-4">
                  Description
                </label>
                <MiniEditor
                placeholder="Example: Need a new landing page? Look no further – ‘Unicorn Platform 3’ is here! One of the best landing page builders around just got better. Version 3 has loads of new features: 🤑 Stripe payments, 📊 Google Sheets, ✍️ Blogging (beta), and tonnes more. Everything you need for your SaaS, mobile app page, or tech startup. It’s also an Indie-made product, built by Alexander Isora and co."
                title=""
                disabled={isSubmitting}
                setDescription={(html)=>{
                    formik.setFieldValue("content",html)
                }}/>
                {formik.errors.content && <span className="text-red-600 text-xs">{formik.errors.content}</span>}

                <label className="text-md font-medium mt-4">
                  Excerpt
                </label>
                <MiniEditor
                title=""
                disabled={isSubmitting}
                placeholder="Unicorn platform is a landing page builder for SaaS products. Build and launch your marketing site in no time!"
                setDescription={(html)=>{
                    formik.setFieldValue("excerpt",html)
                }}/>
                {formik.errors.excerpt && <span className="text-red-600 text-xs">{formik.errors.excerpt}</span>}
                 

                <FormInput id="title" label="Link" error={formik.errors}>
                  <input
                    id="link"
                    name="link"
                    type="text"
                    disabled={isSubmitting}
                    onChange={formik.handleChange}
                    value={formik.values.link}
                    placeholder="Link to your website, (e.g. https://unicornplatform.com)"
                    className={styles.input}
                  />
                </FormInput>
 				{formik.errors.link && <span className="text-red-600 text-xs">{formik.errors.link}</span>}


              <label htmlFor="image" className="text-md font-medium">
                Logo
              </label>

              <ImageUploader 
			              id={12}
                    companyLogoIsDefault={false} 
			              initialImage="" 
			              setFormValue={(file) =>{
			                // setUploadNewCompanyImage(true)
			                console.log("blob", file)
			                formik.setFieldValue("logo",file)
			              }}
		              />
              {formik.errors.logo && <span className="text-red-600 text-xs">{formik.errors.logo}</span>}


              <label htmlFor="image" className="text-md font-medium">
                Gallery
              </label>
              <GalleryUpload updateField={(files)=>{
                //  setUploadNewCompanyImage(true)
                // formik.setFieldValue("logo",files)
                if(files){
                  setGalleryFiles(files)
                  formik.setFieldValue("gallery",'added')
                }else{
                  setGalleryFiles(null)
                  formik.setFieldValue("gallery",'')
                }
              }}/>
            </div>
            </FormContainer>
            <div className="flex flex-col mx-auto max-w-2xl border-t my-8 border-gray-100 w-auto"/>

            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-4 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
             {isSubmitting?
             <div className="mx-auto w-6">
               <Spinner />
             </div>
             :
             `Save and Continue`}
            </button>
            </form>
        </div>

        </div>
      </div>
    </>
  );
};

export default PostToolPage;


