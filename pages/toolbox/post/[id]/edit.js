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
import useLoad from "@/components/toolbox/hooks/useLoad";
import Fallback from "@/components/atom/Fallback/Fallback";

import GalleryUpload from "@/components/GalleryUpload/GalleryUpload";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
const slugify = require("slugify");

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

const PostToolPage = () =>{

  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });
  const { loading, postObject, isOwner } =
  useLoad(user);

  return(
    !user && loading?<Fallback/>:
    postObject? 
    <ToolPostForm isOwner={isOwner} postObject={postObject} user={user} />:null
  )

}

const ToolPostForm = ({user, isOwner, postObject}) => {
  const router = useRouter();
  const [available, setAvailable] = useState(true)

  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    slug: Yup.string().required("Slug is required"),
    link: Yup.string().required("Link is required"),
    logo: Yup.mixed().required("Please add your logo"),

  });
  

  const [errores, setErrores] = useState(false)
  const [uploadNewLogo, setUploadNewLogo] = useState(false)
  const [galleryChanged, setGalleryChanged] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    validateOnChange:errores?true:false,
    initialValues: {
      title: postObject?.title?postObject?.title:'',
      content: postObject?.content?postObject.content:'',
      excerpt: postObject?.excerpt?postObject.excerpt:'',
      slug: postObject?.slug?postObject.slug:'',
      link: postObject?.link?postObject.link:'',
      logo: postObject?.logo?postObject.logo:'',
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      setIsSubmitting(true)
      // toast.loading("Updating your tool and images...", {
      //   duration: 5000,
      // });
      let updatedGallery = []
      //update gallery by unlinking any removed images
      if(galleryChanged){
        for(var x = 0;x<galleryFiles.length;x++){
          const found = postObject?.gallery?.find(el => el.id === galleryFiles[x].id?el:false);
          if(found){
            updatedGallery.push(found)
          }
        }
      }else{
        updatedGallery = postObject.gallery
      }
      async function submit() {
        let publishPostEndpointConfig = {
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
    
          data: {
            data: {
              ...values,
              gallery:updatedGallery
            },
          },
        };


        await axios(publishPostEndpointConfig)
          .then(async function (response) {
              /**
               * upload new logo
               */
               if(values.logo && uploadNewLogo==true){     
                toast.loading("Uploading new logo...", {
                  duration: 3000,
                });
                const file = new File([values.logo], `logo_.png`, {
                  type: "image/png",
                });
                
                const data = {}
                const formData = new FormData();
                formData.append("files", file, 'logo');
                formData.append('data', JSON.stringify(data));
                formData.append('refId', postObject.id);
                formData.append('field', 'logo');
                formData.append('ref', 'api::post.post');

      
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
                    toast.console.warn("The logo failed to save.", {
                      duration: 3000,
                    });
                  });
              }

              /**
               * upload new gallery
               */
              if(values.gallery && galleryChanged){
                const galleryData = {}
                const galleryFormData = new FormData();
                //upload any new gallery images
                let isNewUpload = false
                if(galleryFiles?.length){
                  // galleryFormData.append("files", file, 'logo');
                  for(var x= 0;x<galleryFiles.length;x++){
                    //if it's a new file object
                    if(galleryFiles[x] instanceof File){
                      galleryFormData.append('files', galleryFiles[x])
                      isNewUpload= true
                    }
                  }
                  if(isNewUpload){
                    galleryFormData.append('data', JSON.stringify(galleryData));
                    galleryFormData.append('refId', postObject.id);
                    galleryFormData.append('field', 'gallery');
                    galleryFormData.append('ref', 'api::post.post');
                   
                    var galleryConfig = {
                      method: "post",
                      url: `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
                      headers: {
                        Authorization: `Bearer ${user?.jwt}`,
                      },
                      data: galleryFormData,
                    };
                    await axios(galleryConfig)
                      .then(async function (response) {
                          //set field value to id of image, which is used to attach to post
                          toast.success("Gallery uploads complete!", {
                            duration: 3000,
                          });
                      })
                      .catch(function (error) {
                        console.log(error);
                        toast.console.warn("The gallery failed to update.", {
                          duration: 3000,
                        });
                      });
                  }
                }
              }

              setIsSubmitting(false)
              toast.success("Your tool has been updated!", {
                duration: 3000,
              });

              // router.push(`/jobs/post/${response?.data.id}/payment`);
              // formik.resetForm();
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

  useEffect(() => {


    formik.setFieldValue("slug", slugify(formik.values.title.toLocaleLowerCase(), {remove: /[^\w\s]/gi}))


 }, [formik.values.title]);

  const { dirty, errors, isValid } = formik;
  const [disabled, setDisabled] = useState(false);

  // useEffect(()=>{
  //   if(defaultCompany?.logo){
  //     formik.setFieldValue("companyLogo",defaultCompany?.logo)
  //   }

  // },[defaultCompany?.logo])
  
  useEffect(() => {
    if (errors && isEmptyObject(errors)) {
      setErrores(false);
    } else {
      setErrores(true)
      // setDisabled(true);
    }
  }, [errors]);


  return (
    <Layout background="#EFF2F8">
      <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
        <div className="my-2 mb-5">
          <h1 className="text-2xl font-bold mx-auto mb-2">Post a Tool</h1>
          <p className="text-gray-600">Edit your tool for review.</p>
        </div>
        <div className="bg-white p-10 pt-12 rounded-xl">
          <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(errors)
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
                <h1 className="text-xl font-medium mb-2">Tell us about the tool</h1>
                <FormInput id="title" label="Name" error={formik.errors}>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="Unicorn Platform"
                    className={styles.input}
                  />
                </FormInput>
                
                <label className="text-md font-medium mt-4">
                  Tagline
                </label>
                <MiniEditor
                showToolbar={false}
                title=""
                placeholder="Unicorn platform is a landing page builder for SaaS products. Build and launch your marketing site in no time!"
                initialContent={postObject?.excerpt?postObject.excerpt:''} 
                setDescription={(html)=>{
                    formik.setFieldValue("excerpt",html)
                }}/>
                {formik.errors.excerpt && <span className="text-red-600 text-sm">{formik.errors.excerpt}</span>}


                <label className="text-md font-medium mt-4">
                Description
                </label>
                <MiniEditor
                 placeholder="Example: Need a new landing page? Look no further – ‘Unicorn Platform 3’ is here! One of the best landing page builders around just got better. Version 3 has loads of new features: Stripe payments, Google Sheets, Blogging (beta), and tonnes more. Everything you need for your SaaS, mobile app page, or tech startup. It’s also an Indie-made product, built by Alexander Isora and co."
                title=""
                showToolbar={false}
                initialContent={postObject?.content?postObject.content:''} 
                setDescription={(html)=>{
                    formik.setFieldValue("content",html)
                }}/>
                {formik.errors.content && <span className="text-red-600 text-sm">{formik.errors.content}</span>}
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
                    placeholder="Link for a tool"
                    className={styles.input}
                  />
                </FormInput>
        {formik.errors.link && <span className="text-red-600 text-sm">{formik.errors.link}</span>}


              <label htmlFor="image" className="text-md font-medium">
                Logo
              </label>
              <ImageUploader 
              id={3}
              companyLogoIsDefault={false} 
              initialImage={postObject?.logo?postObject.logo?.url:''} 
              setFormValue={(blob) =>{
                setUploadNewLogo(true)
                formik.setFieldValue("logo",blob)
              }}/>
              {/* <ImageUploader initialImage={defaultCompany?.logo} setFormValue={(blob) =>{
                setImageBlob(blob)
                formik.setFieldValue("image",blob)
              }}/> */}
              {formik.errors.logo && <span className="text-red-600 text-sm">{formik.errors.logo}</span>}

              <label htmlFor="image" className="text-md font-medium">
                Gallery
              </label>
              <GalleryUpload gallery={postObject?.gallery} updateField={(files)=>{
                 setGalleryChanged(true)
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
              // disabled={errores}
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

export default PostToolPage;

