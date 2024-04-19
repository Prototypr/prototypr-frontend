// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Layout from "@/components/layout-dashboard";
import axios from "axios";
import useLoad from "@/components/toolbox/hooks/useLoad";
import Button from "@/components/Primitives/Button";
import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import { useFormik } from "formik";
import * as Yup from "yup";import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
import { FormInput } from "@/components/Jobs/FormInput";
import LoginSide from "@/components/sign-in/LoginSide";
import Link from "next/link";

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

const styles = {
  input:
    "w-full px-3 max-w-2xl  bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  inputFlex:
    "px-3 bg-white text-black font-normal text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  label: "text-md font-medium uppercase text-gray-700 font-semibold",
  inputError: "text-xs font-medium uppercase text-red-400",
};


// const PRODUCT_ID = 2
const seo={
  title:`Post a tool on Prototypr`,
  description:`Share your tool with the Prototypr community.`,
  // image:``,
  canonical: `https://prototypr.io/toolbox/post`,
  url: `https://prototypr.io/toolbox/post`
}

const CreateDealForm = () =>{
  
  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });
  const { loading, postObject, isOwner } =
  useLoad(user);


  const [submitted,setSubmitted] = useState(false)


  return(
    <Layout showFooter={false} padding={false} seo={seo} showWriteButton={false} >
      <div className="h-full min-h-screen w-full grid md:grid-cols-12">
      <div className="hidden w-full h-full md:block md:col-span-6 lg:col-span-4">
            <div className="flex pt-24 items-center justify-center h-full w-full relative bg-[#195DE2] text-white">
              <LoginSide title="Create your designer deal" user={user} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <div className="justify-center mt-20 w-full  px-2 sm:px-6 lg:px-10">
          <div className="flex items-center justify-center h-full w-full relative">
        {!user && loading?<Fallback/>:
        postObject && !submitted? 
        <Form postObject={postObject}setSubmitted={setSubmitted} user={user} />:
        <div className="flex pt-20 text-center flex-col">
        <h1 className="text-3xl font-bold mx-auto mb-2">Your deal is submitted!</h1>
        <p className="text-xl mt-4 text-gray-600">Thanks for submitting it.</p>
        <div className="flex mt-6">
            <Button onClick={()=>setSubmitted(false)} variant="confirmMedium">
              Edit deal
            </Button>
          <div className="ml-3">
            <Link href="/dashboard">
              <Button variant="confirmMediumSecondary">
                Continue to dashboard
              </Button>
            </Link>
          </div>
              
              </div>
      </div>
        }
        </div>
        </div>
        </div>
      </div>
    </Layout>
  )

}
export default CreateDealForm

const Form = ({user, postObject, setSubmitted}) =>{


  const [errores, setErrores] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

const FormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  link: Yup.string().optional(),
  description: Yup.string().required("Description is required"),
  code: Yup.string().optional(),
});

const formik = useFormik({
  validateOnChange:errores?true:false,
  initialValues: {
      title: postObject?.deal?.title?postObject?.deal?.title:'',
      link: postObject?.deal?.link?postObject.deal?.link:'',
      description: postObject?.deal?.description?postObject.deal?.description:'',
      code: postObject?.deal?.code?postObject.deal?.code:''
  },
validationSchema: FormSchema,



onSubmit: async(values) => {

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
            deal:{
              ...values
            }
          },
        },
      };
      
      await axios(publishPostEndpointConfig)
        .then(async function (response) {
          setIsSubmitting(false)
          setSubmitted(true)
        })
        .catch(function (error) {
          console.log(error)
          toast.error("There was an error!", {
            duration: 5000,
          });
        });
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

    const [description, setDescription] = useState(postObject?.deal?.description)

    useEffect(()=>{

      setDescription(postObject?.deal?.description)
  },[postObject])


  return(
      <div className="max-w-2xl pt-20 pb-20 w-full">
          <div className="my-2 mb-6 ">
          <h1 className="text-2xl font-bold mx-auto mb-2">Create a deal for '{postObject?.title}'</h1>
          <p className="text-gray-600">Your offer will be shown on our designer deals page.</p>
          </div>
          <form
          className="p-8 shadow-sm bg-white rounded-xl"
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
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="Get 50% off Unicorn Platform"
                    className={styles.input}
                  />
                </FormInput>
         
          <label className="text-md font-medium">
                Description
              </label>
              <div className="bg-white rounded-xl">
                  <MiniEditor
                  placeholder="Example: – ‘Unicorn Platform’ is a landing page builder for creators! We're offering 50% off to Prototypr readers. You'll get access to all our premium templates, plus access to our members only Discord channel. Just use the code PROTOTYPR50 to claim this deal."
                  title=""
                  initialContent={description?description:''}
                  disabled={isSubmitting}
                  setDescription={(html)=>{
                      formik.setFieldValue("description",html)
                      setDescription(html)
                  }}/>
              </div>
              {formik.errors.description && <span className="text-red-600 text-sm">{formik.errors.description}</span>}

              <FormInput id="code" label="Coupon code (optional)" error={formik.errors}>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.code}
                    placeholder="PROTOTYPR50 (optional)"
                    className={styles.input}
                  />
                </FormInput>

              <FormInput id="link" label="Link to deal (optional)" error={formik.errors}>
                  <input
                    id="link"
                    name="link"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.link}
                    placeholder="https://unicornplatform.com/claim-deal"
                    className={styles.input}
                  />
                </FormInput>
          </div>
          <div className="flex flex-col mx-auto max-w-2xl mt-12 w-auto"/>

              <Button
              variant={"confirmMedium"}
              type="submit"
              disabled={isSubmitting}
              className="disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
              {isSubmitting?
              <div className="mx-auto w-[100px] flex justify-center">
              <Spinner size="sm" className="text-black" />
              </div>
              :
              `Submit deal`}
              </Button>
          </FormContainer>
      </form>
      </div>
  )
}