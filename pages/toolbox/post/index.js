import Layout from "@/components/layout-dashboard";
// import { jobTypes} from "@/lib/constants";
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
// import TagsInput from "@/components/Jobs/tagsInput";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
// import useGetLocations from "@/components/Jobs/jobHooks/useGetLocations";
// import useGetSkills from "@/components/Jobs/jobHooks/useGetSkills";
import GalleryUpload from "@/components/GalleryUpload/GalleryUpload";

const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

let axios = require("axios");

const slugify = require("slugify");

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


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
  title:`Post a job on Prototypr`,
  description:`A jobs board for designers. Find your next designer, developer, or creative person.`,
  // image:``,
  canonical: `https://prototypr.io/jobs`,
  url: `https://prototypr.io/jobs`
}

const PostToolPage = () =>{

  const { user } = useUser({
    // redirectTo: "/",
    redirectIfFound: false,
  });



  const [isSignUp, setSignUp] = useState(true);
  const name ="kemi"
  const id = "4"


  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  if(!user || user?.isLoggedIn==false){
    return(
      <Layout seo={seo}>
      <div className="w-full relative max-w-4xl p-4 mx-auto ">
        <div
          className="w-full bg-white shadow-sm p-8 rounded-lg flex justify-center mx-auto mt-8"
          style={{ maxWidth: 390 }}
        >
          <LoginForm 
          title="Sign up to post a tool" 
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

    <JobPostForm user={user} />
    
    </>
  )
}

const JobPostForm = ({user}) => {
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
                toast.success("Your draft has been saved!", {
                  duration: 5000,
                });
                return response?.data?.data
              })
              .catch(function (error) {
                console.log(error);
              });

              return postResult
        } catch {
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
    <Layout seo={seo} showWriteButton={false} background="#EFF2F8">
      <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-10">
        <div className="max-w-3xl w-full">
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
                <h1 className="text-xl font-medium mb-2">Tell us about the tool</h1>
                <FormInput id="title" label="Title" error={formik.errors}>
                  <input
                    id="title"
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
                setDescription={(html)=>{
                    formik.setFieldValue("content",html)
                }}/>
                {formik.errors.content && <span className="text-red-600 text-xs">{formik.errors.content}</span>}

                <label className="text-md font-medium mt-4">
                  Excerpt
                </label>
                <MiniEditor
                title=""
                placeholder="Unicorn platform is a landing page builder for SaaS products. Build and launch your marketing site in no time!"
                setDescription={(html)=>{
                    formik.setFieldValue("excerpt",html)
                }}/>
                {formik.errors.excerpt && <span className="text-red-600 text-xs">{formik.errors.excerpt}</span>}

               {/* <FormInput id="title" label="Slug" error={formik.errors}>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={formik.values.slug} 
                    placeholder=""
                    className={styles.input}


                  />
                </FormInput> */}


                 

                <FormInput id="title" label="Link" error={formik.errors}>
                  <input
                    id="link"
                    name="link"
                    type="text"
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
              // disabled={errores}
              className="w-full p-4 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
             Save and Continue
            </button>
            </form>
        </div>

        </div>
      </div>
    </Layout>
  );
};

export default PostToolPage;


