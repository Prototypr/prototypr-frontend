import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import * as Yup from "yup";
import dynamic from "next/dynamic";
let axios = require("axios");
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Button from "@/components/Primitives/Button";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

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
      "w-full text-base px-3 max-w-2xl  bg-white text-black font-normal rounded-xl border border-gray-300 border-2 focus:outline-none focus:ring-1  focus:ring-blue-200",
    inputFlex:
      "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
    label: "text-md font-medium uppercase text-gray-700 font-semibold",
    inputError: "text-xs font-medium uppercase text-red-400",
  };
  

const TitleLinkForm = ({user, edit}) =>{
    const router = useRouter();
    
    const [errores, setErrores] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    link: Yup.string().required("Link is required"),
  });

  const formik = useFormik({
    validateOnChange:errores?true:false,
  initialValues: {
    title: "",
    link: "",
  },
  validationSchema: FormSchema,



  onSubmit: (values) => {

  const submit = async () => {

    setIsSubmitting(true)
    // toast.loading("Submitting your tool and images...", {
    //   duration: 5000,
    // });

  const entry = {
      type: "tool",
      title: values.title,
    date:new Date(),
      link: values.link,
  user:user.id,
      // slug: values.slug,
  status:'draft',
      seo: {
              opengraphTitle:values.title,
          },
      esES: false
};

const formData = new FormData();
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
            //   toast.success("Your tool has been submitted!", {
            //     duration: 5000,
            //   });
              router.push(`/toolbox/post/${response?.data?.data?.id}?step=2`)
            //   onNext()
              return response?.data?.data
            })
            .catch(function (error) {
              console.log(error);
            });

            //redirect to success page
            setIsSubmitting(false)

            return postResult
      } catch {

        setIsSubmitting(false)
        toast.error("Error creating post! Please contact support for help.", {
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


    return(
        <div className="flex justify-center w-full h-full">
        <div className="max-w-lg w-full">
            <div className="my-2 mb-6 ">
            <h1 className="text-2xl font-semibold mx-auto mb-4 tracking-tight">Post a tool</h1>
            <p className="text-gray-600">As a Prototypr member, you can submit resources to the Prototypr Toolbox to enhance product visibility across the web.</p>
            </div>
            <form
            className="mt-8"
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
            <FormInput id="title" label="Name" error={formik.errors}>
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
                    type="text"
                    disabled={isSubmitting}
                    onChange={formik.handleChange}
                    value={formik.values.link}
                    placeholder="Link to your website, (e.g. https://unicornplatform.com)"
                    className={styles.input}
                />
            </FormInput>
            </div>
            <div className="flex flex-col mx-auto max-w-2xl mt-8 w-auto"/>

                
                <Button
                variant={"confirmBig"}
                type="submit"
                disabled={isSubmitting}
                className="p-4 bg-blue-700 text-white font-semibold rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                {isSubmitting?
                <>Loading...</>
                // <div className="mx-auto w-6">
                // <Spinner />
                // </div>
                :
                `Get Started`}
                </Button>
            </FormContainer>
        </form>
        </div>
    </div>
    )
}

export default TitleLinkForm