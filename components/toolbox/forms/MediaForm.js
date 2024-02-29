import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import * as Yup from "yup";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import Button from "@/components/Primitives/Button";
import useLoad from "../hooks/useLoad";import {
    useWizardContext,
  } from 'react-sweet-wizard';
import GalleryUpload from "@/components/GalleryUpload/GalleryUpload";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
const axios = require("axios");

function isEmptyObject(obj) {
    return (
      Object.getPrototypeOf(obj) === Object.prototype &&
      Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0
    );
  }
  

  const MediaForm = ({user}) =>{

    const { loading, postObject, isOwner } =
    useLoad(user);
  
    return(
      !user && loading?<Fallback/>:
      postObject? 
      <Form postObject={postObject} user={user} />:null
    )
  
  }

const Form = ({user, postObject}) =>{

    const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =useWizardContext();

    const [errores, setErrores] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(()=>{
        if(postObject?.logo || postObject.legacyLogo){

            formik.setFieldValue("logo",'exist')
        }
        if(postObject?.gallery){
            
            formik.setFieldValue("gallery",'exist')
        }
    },[postObject])

  const FormSchema = Yup.object().shape({
    logo: Yup.string().required("Logo is required"),
    gallery: Yup.string().required("Gallery images are required"),
  });

  const formik = useFormik({
    validateOnChange:errores?true:false,
    initialValues: {
        gallery: postObject?.gallery?postObject?.gallery:'',
        logo: postObject?.logo?postObject.logo:''
    },
  validationSchema: FormSchema,


  

  onSubmit: async(values) => {

    async function submit() {
        setIsSubmitting(true)
        /**
               * upload new logo
               */
              console.log(values)
        if((values.logo && uploadNewLogo==true) && values.logo!=='exist'){     
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
          if((values.gallery && galleryChanged)&& values.gallery!=='exist'){
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
                      goTo('3')
                  })
                  .catch(function (error) {
                    console.log(error);
                    toast.console.warn("The gallery failed to update.", {
                      duration: 3000,
                    });
                  });
              }
            }
          }else{

            setIsSubmitting(false)
            goTo('3')
        }

      }
    await submit();
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


      

  const [uploadNewLogo, setUploadNewLogo] = useState(false)
  const [galleryChanged, setGalleryChanged] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState(false)

    // useEffect(()=>{

    //     setContent(postObject?.content)
    //     setExcerpt(postObject?.excerpt)
    // },[postObject])

    return(
        <div className="px-6 md:px-0 max-w-2xl pt-6 pb-20 w-full">
            <div className="my-2 mb-6">
            <h1 className="text-2xl font-semibold mx-auto mb-2">Add media</h1>
            <p className="text-gray-600">Upload your logo and multiple gallery images.</p>
            </div>
            <form
            className="mt-6"
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
                <label htmlFor="image" className="text-md font-medium">
                    Logo
                </label>
                <ImageUploader 
                id={3}
                companyLogoIsDefault={false} 
                initialImage={postObject?.logo?postObject.logo?.url:postObject.legacyLogo?postObject.legacyLogo:''} 
                setFormValue={(blob) =>{
                    setUploadNewLogo(true)
                    formik.setFieldValue("logo",blob)
                }}/>
                {/* <ImageUploader initialImage={defaultCompany?.logo} setFormValue={(blob) =>{
                    setImageBlob(blob)
                    formik.setFieldValue("image",blob)
                }}/> */}
                {formik.errors.logo && <span className="text-red-600 text-xs">{formik.errors.logo}</span>}

                <label htmlFor="image" className="text-md mt-10 font-medium">
                    Gallery
                </label>
                <p className="-mt-3 text-black/70">Please add a minimum of 3 images</p>
                <GalleryUpload gallery={postObject?.gallery} updateField={(files)=>{
                    setGalleryChanged(true)
                    // formik.setFieldValue("logo",files)
                    if(files){
                    setGalleryFiles(files)
                    for(var x = 0;x<files.length;x++){
                        if(files[x] instanceof File){
                            formik.setFieldValue("gallery",'added')
                        }
                    }
                    }else{
                    setGalleryFiles(null)
                    formik.setFieldValue("gallery",'')
                    }
                }}/>
                {formik.errors.gallery && <span className="text-red-600 text-xs">{formik.errors.gallery}</span>}
            </div>
            <div className="flex flex-col mx-auto mt-5 max-w-2xl w-auto"/>

                <Button
                variant={"confirmMedium"}
                type="submit"
                disabled={isSubmitting}
                className="p-4 bg-blue-700 text-white font-semibold rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                {isSubmitting?
                <div className="mx-auto w-5">
                <Spinner size="sm" className="text-black" />
                </div>
                :
                `Save and Submit`}
                </Button>
                <div
                onClick={onPrevious}
                disabled={isSubmitting}
                className="px-3 py-2 inline-block hover:text-black text-gray-600 ml-4 cursor-pointer font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                Back
                </div>
            </FormContainer>
        </form>
        </div>
    )
}

export default MediaForm