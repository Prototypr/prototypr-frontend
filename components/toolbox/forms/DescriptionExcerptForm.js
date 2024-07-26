import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import * as Yup from "yup";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import Button from "@/components/Primitives/Button";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
// import useLoad from "../hooks/useLoad";
import { useWizardContext } from "react-sweet-wizard";
import Editor from "tiptypr/src/Editor";
import { ToggleSwitch } from "@/components/atom/Switch/switch";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
const axios = require("axios");

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

const DescriptionExcerptForm = ({ user, isEditMode, postObject, loading }) => {
  // const { loading, postObject, isOwner } = useLoad(user);

  return !user && loading ? (
    <Spinner />
  ) : postObject ? (
    <Form postObject={postObject} user={user} isEditMode={isEditMode} />
  ) : (
    <div>
      <div className="px-6 md:px-0 max-w-2xl w-full">
        <div className="mb-6 ">
          <h1 className="text-xl font-semibold mx-auto mb-2">
            Tell us about your product
          </h1>
          <p className="text-gray-600">
            Write a longer description, and a short excerpt. The description can
            be like a blog post, highlighting benefits of the product.
          </p>
        </div>
      </div>
      <div className="text-center flex flex-col h-full w-full justify-center">
        <div className="mx-auto text-gray-600">
          <Spinner />
        </div>
      </div>
    </div>
  );
};

const Form = ({ user, postObject, isEditMode }) => {
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();

  const [errores, setErrores] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FormSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
    excerpt: Yup.string().required("Excerpt is required"),
  });

  const formik = useFormik({
    validateOnChange: errores ? true : false,
    initialValues: {
      content: postObject?.content ? postObject?.content : "",
      excerpt: postObject?.excerpt ? postObject.excerpt : "",
    },
    validationSchema: FormSchema,

    onSubmit: async values => {
      //strip html tags and get plain text
      var el = document.createElement("div");
      el.innerHTML = values?.excerpt;

      var exc = el.textContent || el.innerText || "";

      if (exc) {
        values.excerpt = exc;
      }

      //turn postObject.creators array into an array of ids (from each element.id)
      let creatorIds = [];
      if (postObject?.creators?.length) {
        creatorIds = postObject?.creators?.map(creator => creator.id);
      }
      if (values.isCreator) {
        //add user id to the array of creator ids if it's not already there
        if (!creatorIds.includes(user.id)) {
          creatorIds.push(user.id);
        }
      } else {
        // remove user id from the array of creator ids if it's there
        if (creatorIds.includes(user.id)) {
          creatorIds = creatorIds.filter(id => id !== user.id);
        }
      }
      values.creators = creatorIds;
      delete values.isCreator;

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
              ...values,
            },
          },
        };

        await axios(publishPostEndpointConfig)
          .then(async function (response) {
            if (!isEditMode) {
              goTo(2);
              // onNext()
            } else {
              toast.success("Tagline and description updated!", {
                duration: 5000,
              });
            }
            setIsSubmitting(false);
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

  const [content, setContent] = useState(postObject?.content);
  const [excerpt, setExcerpt] = useState(postObject?.excerpt);
  const [isCreator, setIsCreator] = useState(
    postObject?.creators?.length &&
      postObject.creators.find(creator => creator.id === user.id) !== undefined
  );

  useEffect(() => {
    if (!content) {
      setContent(postObject?.content);
    }
    if (!excerpt) {
      setExcerpt(postObject?.excerpt);
    }
    let iscreatr = postObject?.creators?.length &&
    postObject.creators.find(creator => creator.id === user.id) !==
      undefined

    setIsCreator(iscreatr);
    formik.setFieldValue("isCreator", iscreatr);
  }, [postObject, user]);

  return (
    <div className="px-6 md:px-0 max-w-2xl w-full">
      <div className="mb-6 ">
        <h1 className="text-xl font-semibold mx-auto mb-2">
          Tell us about your product
        </h1>
        <p className="text-gray-600">
          Share a tagline, and an in-depth product description. For best
          results, highlight benefits and key features in your description.
        </p>
      </div>

      <div className="mb-2">
        <label className="text-md font-medium ">Did you make it?</label>
        <p className="text-sm text-gray-500">
          Add yourself as the creator of this tool.
        </p>
        <div className="mt-2">
          <ToggleSwitch
            size="small"
            checked={isCreator}
            onToggle={() => {
              setIsCreator(!isCreator);
              formik.setFieldValue("isCreator", !isCreator);
            }}
          />
        </div>
      </div>

      <form
        className="mt-6"
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
            <label className="text-md font-medium ">Tagline</label>
            <div className="bg-white rounded-xl">
              <MiniEditor
                height={84}
                showToolbar={false}
                initialContent={excerpt ? excerpt : ""}
                title=""
                disabled={isSubmitting}
                placeholder="Unicorn platform is a landing page builder for SaaS products. Build and launch your marketing site in no time!"
                setDescription={html => {
                  formik.setFieldValue("excerpt", html);
                  setExcerpt(html);
                }}
              />
            </div>
            {formik.errors.excerpt && (
              <span className="text-red-600 text-sm">
                {formik.errors.excerpt}
              </span>
            )}

            <label className="text-base font-medium mt-6">Description</label>
            <div className="bg-white rounded-xl -mt-1">
              <Editor
                wrapperClass="border border-gray-300 rounded-xl border-2 p-6 max-w-[44rem] mx-auto relative blog-content toolbox-content"
                postType="tool"
                showNavButtons={false}
                initialContent={content ? content : ""}
                updatePost={({ editor }) => {
                  const html = editor.getHTML();
                  formik.setFieldValue("content", html);
                }}
                canEdit={true}
                savePost={() => {}}
              />
              {/* <MiniEditor
                    placeholder="Example: Need a new landing page? Look no further – ‘Unicorn Platform 3’ is here! One of the best landing page builders around just got better. Version 3 has loads of new features: Stripe payments, Google Sheets, blogging, and tonnes more. Everything you need for your SaaS, mobile app page, or tech startup. It’s also an Indie-made product, built by Alexander Isora and co."
                    title=""
                    initialContent={content?content:''}
                    disabled={isSubmitting}
                    setDescription={(html)=>{
                        formik.setFieldValue("content",html)
                        setContent(html)
                    }}/> */}
            </div>
            {formik.errors.content && (
              <span className="text-red-600 text-sm">
                {formik.errors.content}
              </span>
            )}
          </div>
          <div className="flex flex-col mx-auto max-w-2xl mt-12 w-auto" />

          <Button
            variant={"confirmMedium"}
            type="submit"
            disabled={isSubmitting}
            className="p-4 bg-blue-700 text-white font-semibold rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="mx-auto w-[100px] flex justify-center">
                <Spinner size="sm" className="text-black" />
              </div>
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              `Save and Continue`
            )}
          </Button>
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

export default DescriptionExcerptForm;
