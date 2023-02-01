import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { jobTypes} from "@/lib/constants";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUser from "@/lib/iron-session/useUser";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import Button from "@/components/Primitives/Button";

import MiniEditor from "@/components/MiniEditor/MiniEditor";
import TagsInput from "@/components/Jobs/tagsInput";
import useGetLocations from "@/components/Jobs/jobHooks/useGetLocations";
import useGetSkills from "@/components/Jobs/jobHooks/useGetSkills";


const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
let axios = require("axios");

const JobDescriptionForm = ({onNext,onPrevious, companyData }) =>{
    
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
      onPrevious={onPrevious}
      companyData={companyData}
      defaultCompany={defaultCompany}/>
    :''}
    </>
  )

}

const Form = ({user, defaultCompany, companyData, onPrevious}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter();

  const {locations} = useGetLocations()
  const {skills} = useGetSkills()

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
    salaryMin: Yup.number().optional(),
    salaryMax: Yup.number().optional(),
    url: Yup.string().url("Invalid URL").required("Job URL is required"),
    skills: Yup.string().required("Skills are required"),
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
        type: "fulltime"
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {

      if(values.salaryMax==''){
        values.salaryMax=0
      }
      if(values.salaryMin==''){
        values.salaryMin=0
      }

      async function submit() {
        let configUpload = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/createJobPost`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
          data: {
            ...values,
            ...companyData
          },
        };
        await axios(configUpload)
          .then(async function (response) {

            if(response?.data?.posted==true){

            //redirect to success page
            setIsSubmitting(false)
              toast.success("Job saved!", {
                duration: 3000,
              });

              router.push(`/jobs/post/${response?.data.id}/payment`);
              // formik.resetForm();
            }else{
                setIsSubmitting(false)
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
          <h1 className="text-2xl font-bold mx-auto mb-2">Tell us about the opportunity</h1>
          <p className="text-gray-600">Describe the task and add relevant information.</p>
        </div>
        <div className="bg-white p-10 pt-12 rounded-xl">
          <form
          onSubmit={(e) => {
            e.preventDefault();

            setIsSubmitting(true)
            console.log(errors)
            if ((errors && isEmptyObject(errors)) || !errors) {
                setIsSubmitting(false)
              setDisabled(false);
              formik.handleSubmit();
            } else {
                setIsSubmitting(false)
              // setDisabled(true);
              toast.error("Hmmmm, it seems like some of the fields are empty.");
            }
          }}
        >
           <FormContainer>
              <div className="flex -mt-3 flex-col mx-auto gap-5 max-w-2xl  w-auto">
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
                  Description
                </label>
                <MiniEditor
                title=""
                setDescription={(html)=>{
                    formik.setFieldValue("description",html)
                }}/>
                {formik.errors.description && <span className="text-red-600 text-xs">{formik.errors.description}</span>}
                
            <div className="mt-3">
                <FormInput id="url" label="Link to opportunity" error={formik.errors}>
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
                <label className="text-md font-medium pb-0 -mb-1 mt-4">
                  Desired Skills
                </label>
                {skills && <TagsInput 
                max={3} 
                updateField={(selected)=>{
                  formik.setFieldValue("skills",JSON.stringify(selected))
                }}
                placeholder="Enter keywords for skills (e.g. UX Writer)" 
                options={skills}/>}

                <div className="">
                <div className="text-md font-medium pb-1 mt-4">
                  Salary range
                </div>
                <p className="text-sm text-gray-500 mb-2">If posting a volunteer opportunity, or looking for collaborators, you can leave this blank.</p>
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
                <div className="flex mx-auto mt-8 max-w-2xl w-auto">
                    <Button
                        variant={"confirmMedium"}
                        type="submit"
                        disabled={isSubmitting}
                        className="p-4 bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                        {isSubmitting?
                        <div className="mx-auto w-6">
                        <Spinner />
                        </div>
                        :
                        `Submit`}
                        </Button>
                        <div
                        onClick={onPrevious}
                        disabled={isSubmitting}
                        className="px-3 my-auto py-2 inline-block hover:text-black text-gray-600 ml-4 cursor-pointer font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                        Back
                        </div>
                </div>
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

export default JobDescriptionForm

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