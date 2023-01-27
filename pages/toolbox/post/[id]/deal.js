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

  return(
    <Layout showFooter={false} padding={false} seo={seo} showWriteButton={false} background="#EFF2F8">
     <div className="flex justify-center pt-3 w-full h-full px-2 sm:px-6 lg:px-10">
    {!user && loading?<Fallback/>:
    postObject? 
    <Form postObject={postObject} user={user} />:null}
    </div>
    </Layout>
  )

}
export default CreateDealForm

const Form = ({user, postObject}) =>{

  const [errores, setErrores] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

const FormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  link: Yup.string().required("Link is required"),
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
    console.log(values)
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
          <h1 className="text-2xl font-bold mx-auto mb-2">Add a deal to '{postObject?.title}'</h1>
          <p className="text-gray-600">Create an offer for your tool on our designer deals page.</p>
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
              console.log(formik)
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
              {formik.errors.description && <span className="text-red-600 text-xs">{formik.errors.description}</span>}

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

// export default function JobPaymentPage({}) {

//   const [PRODUCT_SLUG, setProductSlug] = useState('job-post')


//   const {user, mutateUser} = useUser({
//     // redirectTo: '/',
//     redirectIfFound: false,
//   })

//   const { 
//     loading,
//     content,
//     postId,
//     title,
//     isOwner,
//     postObject} =useLoad(user);
   

//     const router = useRouter()
   

//     // useEffect(()=>{
//     //   if(postObject?.active){
//     //     router.push('/')
//     //   }

//     // },[postObject])


//     const [available, setAvailable] = useState(true)
    
//     useEffect(()=>{        
//         const getProd = async()=>{
            
//           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/strapi-stripe/getProductBySlug/${PRODUCT_SLUG}`)
//             if(response.data.availability===false){
//               setAvailable(false)
//             }
//         }
//         getProd()
     
//       },[])

//   return (
//     <Layout
//       seo={{
//         title: "Prototypr Toolbox - new design, UX and coding tools.",
//         description:
//           "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
//         //   image: "",
//         // canonical: "https://prototypr.io/toolbox",
//         // url: "https://prototypr.io/toolbox",
//       }}
//       activeNav={"toolbox"}
//     >
//      {loading?
//       <div className="relative w-full h-full pt-10 flex">
//       <div className="my-auto mx-auto">
//         <Spinner />
//       </div>
//       </div>
//      :(available && !postObject?.active) ?
//      <Container maxWidth="max-w-[1320px]">
//         <div className="max-w-2xl pt-3 mb-3">

//        <h1 className="text-xl mb-3 font-bold">Complete your purchase</h1>
//        <p>Once you complete your purchase, your post will be reviewed by our team and scheduled at the nearest date. Your job post is saved, so you can come back and pay later. </p>
//         </div>
//        {/* {!user?.isLoggedIn && <p>Please log in or create an account to buy a sponsorship.</p>} */}

       
//        <Button 
//        onClick={()=>{
        

//         localStorage.setItem("strapiStripeUrl", process.env.NEXT_PUBLIC_API_URL);
//         const getProductApi = process.env.NEXT_PUBLIC_API_URL + "/strapi-stripe/getProductBySlug/" + PRODUCT_SLUG;
//         const checkoutSessionUrl = process.env.NEXT_PUBLIC_API_URL + "/strapi-stripe/createCheckoutSession/";
//         const successUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/jobs/post/${postId}/payment-success`;
//         const cancelUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/jobs/post/${postId}/payment-failure`;

//         fetch(getProductApi, {
//           method: "get",
//           mode: "cors",
//           headers: new Headers({
//             "Content-Type": "application/json",
//           }),
//         })
//         .then((response) => response.json())

//           .then((response) => {
//             fetch(checkoutSessionUrl, {
//               method: "post",
//               body: JSON.stringify({
//                 stripePriceId: response.stripePriceId,
//                 productId: response.id,
//                 productName: response.title,
//                 postId:postId,
//                 postType:'job',
//                 successUrl,
//                 cancelUrl
//               }),
//               mode: "cors",
//               headers: new Headers({
//                 //  Authorization: `Bearer ${user?.jwt}`,
//                 "Content-Type": "application/json",
//               }),
//             })
//               .then((response) => response.json())
//               .then((response) => {
//                 if (response.id) {
//                   //the response.url is the strapi checkout 
//                   window.location.replace(response.url);
//                 }
//               });
//           });
//        }} type="button">Complete Purchase</Button>
//       </Container>:
//        <Container>
//       <div className="max-w-2xl pt-3 mb-3">

//       <h1 className="text-xl mb-3 font-bold">Payment is complete</h1>
//       <p>Payment for this job has already been made. </p>
//        </div>
//        </Container>
//       }
//     </Layout>
//   );
// }