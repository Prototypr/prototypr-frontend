import Layout from "@/components/layout-dashboard";
import { jobTypes} from "@/lib/constants";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
import TagsInput from "@/components/Jobs/tagsInput";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import useGetLocations from "@/components/Jobs/jobHooks/useGetLocations";
import useGetSkills from "@/components/Jobs/jobHooks/useGetSkills";
import { useLoad } from "@/components/Jobs/jobHooks";
import Fallback from "@/components/atom/Fallback/Fallback";

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


   const category = [ 
        { name: "Cat1", elements : [ 
            { name: name, id: id } ] 
        },
        { name: "Cat2", elements : [ 
            { name: name, id: id },
            { name: name, id: id },
            { name: name, id: id } ] 
        }, 
        { name: "Cat3", elements : [ 
            { name: name, id: id },
            { name: name, id: id } ] 
        }
    ]

    const sorted_categories = original.category.sort(function (one, other) {
   return one.elements.length - other.elements.length;
});


    console.log("sorted", sorted_categories)

  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  // const [defaultCompany, setDefaultCompany] = useState(null)

  const { 
    loading,
    content,
    postId,
    title,
    isOwner,
    postObject} =useLoad(user);

    console.log("postObject",postObject)


  if(loading){
    return(
       <Fallback/>
    )
  }

  return(
    <>


    <JobPostForm postObject={postObject} user={user} />
    
    </>
  )
}

const JobPostForm = ({user, postObject}) => {
  const router = useRouter();
  const [available, setAvailable] = useState(true)

  // const {locations} = useGetLocations()
  // const {skills} = useGetSkills()
  
    // const [salaryMinOptions] = useState(()=>{
    //   let salaries = [{name:'Minimum per year', value:0}]
    //   for(var x =0;x<2010000;x+=10000){
    //     if(x){
    //       salaries.push({
    //         name:`USD ${x.toLocaleString()} per year`,
    //         value:x
    //       })
    //     }
    //   }
    //   return salaries
    // }) 
    // const [salaryMaxOptions] = useState(()=>{
    //   let salaries = [{name:'Maximum per year', value:0}]
    //   for(var x =0;x<2010000;x+=10000){
    //     if(x){
    //       salaries.push({
    //         name:`USD ${x.toLocaleString()} per year`,
    //         value:x
    //       })
    //     }
    //   }
    //   return salaries
    // }) 

    // console.log(postObject)


  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    slug: Yup.string().required("Slug is required"),
    link: Yup.string().required("Link is required"),
    logo: Yup.string().required("Logo is required"),

  });

  const [errores, setErrores] = useState(false)
  const [uploadNewCompanyImage, setUploadNewCompanyImage] = useState(false)

  const formik = useFormik({
    validateOnChange:errores?true:false,
    initialValues: {
      title: postObject?.title?postObject.title:'',
      content: postObject?.content?postObject.content:'',
      excerpt: postObject?.excerpt?postObject.excerpt:'',
      slug: postObject?.slug?postObject.slug:'',
      link: postObject?.link?postObject.link:'',
      logo: postObject?.logo?postObject.logo:'',
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      values.jobId=postObject.id

      async function submit() {
        let configUpload = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/updateJobPost`,
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

              toast.success("Your Job Post has been updated!", {
                duration: 3000,
              });

              router.push(`/jobs/post/${response?.data.id}/payment`);
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
      <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-10">
        <div className="max-w-3xl w-full">
        <div className="my-2 mb-5">
          <h1 className="text-2xl font-bold mx-auto ">Post a Job</h1>
          <p className="text-gray-600">Find your next designer, developer, or creative person.</p>
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
                <FormInput id="title" label="Position" error={formik.errors}>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="Product Designer, Design Systems"
                    className={styles.input}
                  />
                </FormInput>


                <label className="text-md font-medium mt-4">
                  Content
                </label>
                <MiniEditor
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
                setDescription={(html)=>{
                    formik.setFieldValue("excerpt",html)
                }}/>
                {formik.errors.excerpt && <span className="text-red-600 text-xs">{formik.errors.excerpt}</span>}

               <FormInput id="title" label="Slug" error={formik.errors}>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={formik.values.slug} 
                    placeholder=""
                    className={styles.input}


                  />
                </FormInput>


                 

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
        {formik.errors.link && <span className="text-red-600 text-xs">{formik.errors.link}</span>}


              <label htmlFor="image" className="text-md font-medium">
                Logo
              </label>
              <ImageUploader 
              id={3}
              companyLogoIsDefault={true} 
              initialImage="" 
              setFormValue={(blob) =>{
                setUploadNewCompanyImage(true)
                formik.setFieldValue("logo",blob)
              }}/>
              {/* <ImageUploader initialImage={defaultCompany?.logo} setFormValue={(blob) =>{
                setImageBlob(blob)
                formik.setFieldValue("image",blob)
              }}/> */}
              {formik.errors.logo && <span className="text-red-600 text-xs">{formik.errors.logo}</span>}



            </div>
            </FormContainer>
            <div className="flex flex-col mx-auto max-w-2xl border-t my-8 border-gray-100 w-auto"/>

            
            <button
              type="submit"
              // disabled={errores}
              className="w-full p-4 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
             Update
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

