import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import * as Yup from "yup";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import Button from "@/components/Primitives/Button";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
const axios = require("axios");

const slugify = require("slugify");

function isEmptyObject(obj) {
    return (
      Object.getPrototypeOf(obj) === Object.prototype &&
      Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0
    );
  }

  const styles = {
    input:
      "w-full px-3 max-w-xl  bg-white text-black font-normal text-base rounded-xl border border-gray-300 border-2 focus:outline-none focus:ring-1  focus:ring-blue-200",
    inputFlex:
      "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
    label: "text-md font-medium uppercase text-gray-700 font-semibold",
    inputError: "text-xs font-medium uppercase text-red-400",
  };
  

const TitleLinkFormEdit = ({user, postObject,loading, onNext, refetchPost, isEditMode}) =>{
    
    const [errores, setErrores] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    link: Yup.string().required("Link is required"),
  });

  const formik = useFormik({
    validateOnChange:errores?true:false,
  initialValues: {
    title: postObject?.title?postObject?.title:'',
    link: postObject?.link?postObject.link:'',
  },
  validationSchema: FormSchema,



  onSubmit: (values) => {

    delete values?.slug
   
      async function submit() {
        setIsSubmitting(true)
        let publishPostEndpointConfig = {
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
    
          data: {
            data: {
              ...values,
            },
          },
        };
  
        await axios(publishPostEndpointConfig)
          .then(async function (response) {
  
            if(!isEditMode){
              onNext()
            }else{
              toast.success("Title and Link updated!", {
                duration: 5000,
              });
            }
            refetchPost()
            setIsSubmitting(false)
          })
          .catch(function (error) {
            console.log(error)
            toast.error("Your Post has been saved!", {
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
    
    
      useEffect(() => {
    
    
           formik.setFieldValue("slug", slugify(formik.values.title.toLocaleLowerCase(), {remove: /[^\w\s]/gi}))
    
    
      }, [formik.values.title]);


    return(
      <div className="flex justify-start w-full h-full">
      <div className="px-6 md:px-0 max-w-lg w-full flex flex-col">
          <div className="mb-6 ">
          <h1 className="text-xl font-semibold mx-auto mb-3">Update {postObject.title}</h1>
            <p className="text-gray-600">Change to the title and url.</p>
            </div>
            <form
            className="mt-3 h-full"
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
            <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col w-full gap-5 max-w-xl">
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
            <FormInput id="link" label="Link" error={formik.errors}>
                <input
                    id="link"
                    name="link"
                    type="url"
                    disabled={isSubmitting}
                    onChange={formik.handleChange}
                    value={formik.values.link}
                    placeholder="Link to your website, (e.g. https://unicornplatform.com)"
                    className={styles.input}
                />
            </FormInput>
            </div>
            <div className="flex flex-col mx-auto max-w-2xl mt-12 w-auto"/>

                
                <Button
                variant="confirmMedium"
                type="submit"
                disabled={isSubmitting}
                className="p-4 bg-blue-700 !w-fit !px-4 text-white font-semibold rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                // className="p-4 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                {isSubmitting?
                <>Saving...</>
                // <div className="mx-auto w-6">
                // <Spinner />
                // </div>
                :
                `Save Changes`}
                </Button>
            </div>
        </form>
        </div>
        </div>
    )
}

export default TitleLinkFormEdit