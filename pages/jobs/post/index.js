import Layout from "@/components/layout-dashboard";
import { jobTypes, SKILLS , jobLocations} from "@/lib/constants";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import JobDescriptionEditor from "@/components/Jobs/JobDescriptionEditor";
import TagsInput from "@/components/Jobs/tagsInput";
import LogoUploader from "@/components/Jobs/LogoUploader";
import useGetLocations from "@/components/Jobs/jobHooks/useGetLocations";
import useGetSkills from "@/components/Jobs/jobHooks/useGetSkills";

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

const PostJobPage = () =>{

  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  const [defaultCompany, setDefaultCompany] = useState(null)

  useEffect(()=>{
    if(user?.isLoggedIn){
      if(user?.companies[0]?.name){
        //just set to the first company, chances are ppl have 1 company to start with
        setDefaultCompany(user.companies[0])
      }else{
        setDefaultCompany({name:''})  
      }
    }
  },[user])


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

  const {locations} = useGetLocations()
  const {skills} = useGetSkills()
    
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

  
    const [salaryMinOptions] = useState(()=>{
      let salaries = [{name:'Minimum per year', value:0}]
      for(var x =0;x<2010000;x+=10000){
        if(x){
          salaries.push({
            name:`USD ${x.toLocaleString()} per year`,
            value:x
          })
        }
      }
      return salaries
    }) 
    const [salaryMaxOptions] = useState(()=>{
      let salaries = [{name:'Maximum per year', value:0}]
      for(var x =0;x<2010000;x+=10000){
        if(x){
          salaries.push({
            name:`USD ${x.toLocaleString()} per year`,
            value:x
          })
        }
      }
      return salaries
    }) 


  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Job type is required"),
    salaryMin: Yup.number().required("Salary from value is required"),
    salaryMax: Yup.number().required("Salary to value is required"),
    image: Yup.mixed().required("Please add your company's logo"),
    url: Yup.string().url("Invalid URL").required("Job URL is required"),
    skills: Yup.string().required("Skills are required"),
    companyName: Yup.string().required("Company Name is required"),
    companyWebsite: Yup.string()
      .url("Invalid URL")
      .required("Company Website is required"),
    contactEmail: Yup.string()
      .email("Not Proper email")
      .required("Contact Email is required"),
  });

  const [errores, setErrores] = useState(false)

  const formik = useFormik({
    validateOnChange:errores?true:false,
    initialValues: {
      title: "",
      location: "",
      description: "",
      salaryMin: "",
      salaryMax: "",
      image: "",
      url: "",
      skills: "",
      type: "fulltime",
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

            if(response?.data?.posted==true){

              /**
               * upload company logo
               */
               if(imageBlob){     
                toast.loading("Uploading your company logo...", {
                  duration: 3000,
                });
                const file = new File([imageBlob], `companylogo_.png`, {
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

              toast.success("Your Job Post has been submitted!", {
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
  const [imageBlob, setImageBlob] = useState(false);

  useEffect(()=>{
    if(defaultCompany?.logo){
      formik.setFieldValue("image",defaultCompany?.logo)
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
    <Layout showWriteButton={false} background="#EFF2F8">
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
                <h1 className="text-xl font-medium mb-2">Tell us about the job</h1>
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

                  {/* Job type */}
                <select
                  id="type"
                  name="type"
                  className="w-full -mt-2 bg-white border border-gray-300"
                  onChange={formik.handleChange}
                  aria-describedby="type_error"
                  aria-live="assertive"
                >
                  {jobTypes.map((i, index) => (
                    <option key={'type_'+index} value={i.value}>
                      {i.Name}
                    </option>
                  ))}
                </select>
                {formik.errors.type && <span className="text-red-600 text-xs">{formik.errors.type}</span>}
             

                <label className="text-md font-medium mt-4">
                  Job Description
                </label>
                <JobDescriptionEditor setDescription={(html)=>{
                    formik.setFieldValue("description",html)
                }}/>
                {formik.errors.description && <span className="text-red-600 text-xs">{formik.errors.description}</span>}
                
            <div className="mt-3">
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
            </div>
                <label className="text-md font-medium pb-0 mb-0 mt-4">
                  Skills
                </label>
                {skills && <TagsInput 
                max={3} 
                updateField={(selected)=>{
                  formik.setFieldValue("skills",JSON.stringify(selected))
                }}
                placeholder="Enter keywords for skills (e.g. UX Writer)" 
                options={skills}/>}

                <div className="">
                <div className="text-md font-medium pb-2 mt-4">
                  Salary range
                </div>
                <div className="flex w-full justify-start">
                <div className="pr-3 flex w-1/2 flex-col">
                  <label className="text-sm font-base pb-0 my-auto mr-3 mb-1">
                  From
                </label>
                    <select
                  id="salaryMin"
                  className="w-full bg-white border text-gray-700 border-gray-300"
                  onChange={formik.handleChange}
                  aria-describedby="salary_error"
                  aria-live="assertive"
                >
                  {salaryMinOptions?.map((i, index) => (
                    <option key={'min_'+index} value={i.value}>
                      {i.name}
                    </option>
                  ))}
                </select>
                  {formik.errors.salaryMin && <span className="text-red-600 mt-1 text-xs">{formik.errors.salaryMin}</span>}
                  </div>
                  {/* <div className="my-auto">–</div> */}
                  <div className="px-1 w-1/2 flex flex-col">
                  <label className="text-sm font-base pb-0 my-auto mr-3 mb-1">
                  To
                </label>
                <select
                  id="salaryMax"
                  className="w-full bg-white border text-gray-700 border-gray-300"
                  onChange={formik.handleChange}
                  aria-describedby="salary_error"
                  aria-live="assertive"
                >
                  {salaryMaxOptions?.map((i, index) => (
                    <option key={'min_'+index} value={i.value}>
                      {i.name}
                    </option>
                  ))}
                </select>
                  {formik.errors.salaryMax && <span className="text-red-600 mt-1 text-xs">{formik.errors.salaryMax}</span>}

                  </div>
                </div>
                </div>

            {/* Location */}
            <div className="mt-3">
              <label htmlFor="location" className="text-md block font-medium mb-4 mt-4">
                Location
              </label>

              {locations?.length &&
              <TagsInput 
              updateField={(selected)=>{
                formik.setFieldValue("location",JSON.stringify(selected))
              }}
              max={6} 
              placeholder="Add a location - use 'Worldwide' for anywhere" 
              options={locations}/>}

              {formik.errors.location && <span className="text-red-600 text-xs">{formik.errors.location}</span>}
                
            </div>
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
                Your logo
              </label>
              <LogoUploader initialImage={defaultCompany?.logo} setFormValue={(blob) =>{
                setImageBlob(blob)
                formik.setFieldValue("image",blob)
              }}/>
              {formik.errors.image && <span className="text-red-600 text-xs">{formik.errors.image}</span>}

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

export default PostJobPage;