// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
// import useLoad from "@/components/toolbox/hooks/useLoad";
import Button from "@/components/Primitives/Button";
// import { useRouter } from "next/router";
import Spinner from "@/components/atom/Spinner/Spinner";
import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
import { FormInput } from "@/components/Jobs/FormInput";
// import Link from "next/link";
import { useWizardContext } from "react-sweet-wizard";

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

const styles = {
  input:
    "w-full px-3 max-w-2xl  bg-white text-black font-normal text-base rounded-xl border border-2 border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  inputFlex:
    "px-3 bg-white text-black font-normal text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-1  focus:ring-blue-200",
  label: "text-md font-medium uppercase text-gray-700 font-semibold",
  inputError: "text-xs font-medium uppercase text-red-400",
};

const DealForm = ({ loading, postObject, isEditMode, refetchPost }) => {
  const { user } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });

  //   const { loading, postObject, isOwner } = useLoad(user);

  const [submitted, setSubmitted] = useState(false);

  const [willSubmit, setWillSubmit] = useState(false);

  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();

  return (
    <div className="h-full w-full -mt-6">
      <div className="justify-center w-full ">
        <div className="mb-6 ">
          <h1 className="text-xl text-left font-semibold mx-auto mb-2">
            Add a Promo offer
          </h1>
          <p className="text-gray-600">
            Your offer will be shown on our designer deals page.
          </p>
        </div>
        <div className="flex flex-col items-left justify-center h-full w-full relative">
          {(!user && loading) || loading ? (
            <div className="w-full">
              <Fallback />
            </div>
          ) : !willSubmit && !postObject.deal ? (
            <div className="flex py-8 text-center flex-col border border-dashed rounded-2xl border-gray-300">
              <h1 className="text-xl tracking-tight font-medium mx-auto mb-2">
                Create Promo
              </h1>
              <p className="text-lg mt-4 text-gray-700">
                Add an offer, or add one later.
              </p>
              <div className="flex mt-6 justify-center">
                <Button
                  onClick={() => setWillSubmit(true)}
                  variant="confirmRoundedGhost"
                  className="!border-blue-600 !text-blue-600"
                >
                  Add promo
                </Button>
                {/* <div className="ml-3">
                  <div onClick={onNext}>
                    <Button
                      className="!text-gray-600"
                      variant="confirmRoundedGhost"
                    >
                      Skip
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          ) : postObject ? (
            <Form
              isEditMode={isEditMode}
              refetchPost={refetchPost}
              postObject={postObject}
              setSubmitted={setSubmitted}
              user={user}
              onPrevious={onPrevious}
              onNext={onNext}
              setWillSubmit={setWillSubmit}
              goTo={goTo}
            />
          ) : null}
        </div>
      </div>
      {!isEditMode && !postObject?.deal && !willSubmit ? (
        <div className="flex mt-8 ">
          <Button
            variant={"confirmMedium"}
            onClick={() => {
              goTo(4);
            }}
            className="disabled:bg-gray-300 !rounded-full !bg-blue-600 !hover:bg-blue-500 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
          <div
            onClick={onPrevious}
            className="px-3 py-2 inline-block hover:text-black text-gray-600 ml-4 cursor-pointer font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Back
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default DealForm;

const Form = ({
  user,
  postObject,
  setSubmitted,
  isEditMode,
  onNext,
  onPrevious,
  refetchPost,
  setWillSubmit,
  goTo
}) => {
  const [errores, setErrores] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const removeDeal = async () => {
    setIsRemoving(true);
    let publishPostEndpointConfig = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },

      data: {
        data: {
          deal: null,
        },
      },
    };

    await axios(publishPostEndpointConfig)
      .then(async function (response) {
        setIsRemoving(false);
        toast.success("Deal removed!", {
          duration: 5000,
        });
        setWillSubmit(false);
        refetchPost();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("There was an error!", {
          duration: 5000,
        });
      });
  };

  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    link: Yup.string().optional(),
    description: Yup.string().required("Description is required"),
    code: Yup.string().optional(),
  });

  const formik = useFormik({
    validateOnChange: errores ? true : false,
    initialValues: {
      title: postObject?.deal?.title ? postObject?.deal?.title : "",
      link: postObject?.deal?.link ? postObject.deal?.link : "",
      description: postObject?.deal?.description
        ? postObject.deal?.description
        : "",
      code: postObject?.deal?.code ? postObject.deal?.code : "",
    },
    validationSchema: FormSchema,

    onSubmit: async values => {
      async function submit() {
        setIsSubmitting(true);
        let publishPostEndpointConfig = {
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },

          data: {
            data: {
              deal: {
                ...values,
              },
            },
          },
        };

        await axios(publishPostEndpointConfig)
          .then(async function (response) {
            setIsSubmitting(false);
            setSubmitted(true);
            refetchPost();
            toast.success("Deal saved!", {
              duration: 5000,
            });
            goTo(4)
          })
          .catch(function (error) {
            console.log(error);
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
      setErrores(true);
      // setDisabled(true);
    }
  }, [errors]);

  const [description, setDescription] = useState(postObject?.deal?.description);

  useEffect(() => {
    setDescription(postObject?.deal?.description);
  }, [postObject]);

  return (
    <div className="max-w-2xl w-full">
      <form
        className=""
        onSubmit={e => {
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

            <label className="text-md font-medium">Description</label>
            <div className="bg-white rounded-xl">
              <MiniEditor
                placeholder="Example: – ‘Unicorn Platform’ is a landing page builder for creators! We're offering 50% off to Prototypr readers. You'll get access to all our premium templates, plus access to our members only Discord channel. Just use the code PROTOTYPR50 to claim this deal."
                title=""
                initialContent={description ? description : ""}
                disabled={isSubmitting}
                setDescription={html => {
                  formik.setFieldValue("description", html);
                  setDescription(html);
                }}
              />
            </div>
            {formik.errors.description && (
              <span className="text-red-600 text-sm">
                {formik.errors.description}
              </span>
            )}

            <FormInput
              id="code"
              label="Coupon code (optional)"
              error={formik.errors}
            >
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

            <FormInput
              id="link"
              label="Link to deal (optional)"
              error={formik.errors}
            >
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
          <div className="flex flex-col mx-auto max-w-2xl mt-12 w-auto" />
          <Button
            variant={"confirmMedium"}
            type="submit"
            disabled={isSubmitting}
            className="disabled:bg-gray-300 !rounded-full !bg-blue-600 !hover:bg-blue-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="mx-auto w-[100px] flex justify-center">
                <Spinner size="sm" className="text-black" />
              </div>
            ) : isEditMode ? (
              `Save deal`
            ) : (
              `Save and Continue`
            )}
          </Button>
          {postObject?.deal ? (
            <Button
              variant="ghost"
              disabled={isRemoving}
              onClick={e => {
                e.preventDefault();
                removeDeal();
              }}
              className="h-[42px] !rounded-full ml-3 "
            >
              {isRemoving ? "Removing..." : "Remove"}
            </Button>
          ) : null}
          {!isEditMode ? (
            <div
              onClick={onPrevious}
              disabled={isSubmitting}
              className="px-3 py-2 inline-block hover:text-black text-gray-600 ml-4 cursor-pointer font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Back
            </div>
          ) : null}
        </FormContainer>
      </form>
    </div>
  );
};
