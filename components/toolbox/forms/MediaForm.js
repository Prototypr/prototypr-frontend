import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import * as Yup from "yup";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import Button from "@/components/Primitives/Button";
import useLoad from "../hooks/useLoad";
import { useWizardContext } from "react-sweet-wizard";
import GalleryUpload from "@/components/GalleryUpload/GalleryUpload";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { cloneDeep, set } from "lodash";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
const axios = require("axios");

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

const MediaForm = ({ user, isEditMode, loading, postObject, refetchPost }) => {
  // const { loading, postObject, isOwner } = useLoad(user);

  return !user && loading ? (
    <Fallback />
  ) : postObject ? (
    <Form
      postObject={postObject}
      user={user}
      refetchPost={refetchPost}
      isEditMode={isEditMode}
    />
  ) : (
    <div>
      <div className="px-6 md:px-0 max-w-2xl w-full">
        <div className="mb-6 ">
          <h1 className="text-xl text-left font-semibold mx-auto mb-2">
            Add media
          </h1>
          <p className="text-gray-600">
            Upload your logo and multiple gallery images.
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

const Form = ({ user, postObject, isEditMode, refetchPost }) => {
  const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =
    useWizardContext();

  const [errores, setErrores] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (postObject?.logo || postObject.legacyLogo) {
      formik.setFieldValue("logo", "exist");
    }
    if (postObject?.gallery) {
      formik.setFieldValue("gallery", "exist");
    }
  }, [postObject]);

  const FormSchema = Yup.object().shape({
    logo: Yup.string().required("Logo is required"),
    gallery: Yup.string().required("Gallery images are required"),
  });

  const formik = useFormik({
    validateOnChange: errores ? true : false,
    initialValues: {
      gallery: postObject?.gallery ? postObject?.gallery : "",
      logo: postObject?.logo ? postObject.logo : "",
    },
    validationSchema: FormSchema,

    onSubmit: async values => {
      async function submit() {
        setIsSubmitting(true);
        /**
         * upload new logo
         */

        if (values.logo && uploadNewLogo == true && values.logo !== "exist") {
          toast.loading("Uploading new logo...", {
            duration: 3000,
          });
          const file = new File([values.logo], `logo_.png`, {
            type: "image/png",
          });

          const data = {};
          const formData = new FormData();
          formData.append("files", file, "logo");
          formData.append("data", JSON.stringify(data));
          formData.append("refId", postObject.id);
          formData.append("field", "logo");
          formData.append("ref", "api::post.post");

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
              setUploadNewLogo(false);
            })
            .catch(function (error) {
              console.log(error);
              toast.console.warn("The logo failed to save.", {
                duration: 3000,
              });
            });
        }
        if (
          values.banner &&
          uploadNewBanner == true &&
          values.banner !== "exist"
        ) {
          toast.loading("Uploading new banner...", {
            duration: 3000,
          });
          const file = new File([values.banner], `banner_.png`, {
            type: "image/png",
          });

          const data = {};
          const formData = new FormData();
          formData.append("files", file, "featuredImage");
          formData.append("data", JSON.stringify(data));
          formData.append("refId", postObject.id);
          formData.append("field", "featuredImage");
          formData.append("ref", "api::post.post");

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
              setUploadNewBanner(false);
            })
            .catch(function (error) {
              console.log(error);
              toast.console.warn("The banner failed to save.", {
                duration: 3000,
              });
            });
        }

        /**
         * upload new gallery
         */
        if (
          values.gallery &&
          galleryChanged &&
          ((values.gallery !== "exist" && values.gallery !== "reorder") ||
            postObject?.gallery?.length !== galleryFiles?.length)
        ) {
          toast.loading("Uploading gallery images...", {
            duration: 3000,
          });
          //compare galleryFiles with postObject.gallery for images that have been removed by checking the id
          const removedImages = postObject?.gallery?.filter(image => {
            return !galleryFiles?.some(file => {
              return file.id === image.id;
            });
          });

          if (removedImages) {
            //create array of ids to delete
            const ids = removedImages.map(image => image.id);
            //remove images with ids from postObject.gallery leaving remaining array
            const remainingImages = postObject.gallery.filter(
              image => !ids.includes(image.id)
            );
            //post to the api to set the image ids refs to the remaining images
            const data = {
              gallery: remainingImages.map(image => image.id),
            };
            let publishPostEndpointConfig = {
              method: "put",
              url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
              headers: {
                Authorization: `Bearer ${user?.jwt}`,
              },

              data: {
                data: {
                  ...data,
                },
              },
            };

            await axios(publishPostEndpointConfig)
              .then(async function (response) {
                await reorderImages({ showSuccess: true });
              })
              .catch(function (error) {
                console.log(error);
                toast.error("There was an error removing old images!", {
                  duration: 5000,
                });
              });
          }

          const galleryData = {};
          const galleryFormData = new FormData();
          //upload any new gallery images
          let isNewUpload = false;
          if (galleryFiles?.length) {
            // galleryFormData.append("files", file, 'logo');
            for (var x = 0; x < galleryFiles.length; x++) {
              //if it's a new file object
              if (galleryFiles[x] instanceof File) {
                galleryFormData.append("files", galleryFiles[x]);
                isNewUpload = true;
              }
            }
            if (isNewUpload) {
              galleryFormData.append("data", JSON.stringify(galleryData));
              galleryFormData.append("refId", postObject.id);
              galleryFormData.append("field", "gallery");
              galleryFormData.append("ref", "api::post.post");

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
                  //update galleryFiles with the new image objects
                  let newGalleryFiles = cloneDeep(galleryFiles);
                  for (var x = 0; x < newGalleryFiles.length; x++) {
                    if (newGalleryFiles[x] instanceof File) {
                      for (var y = 0; y < response.data.length; y++) {
                        if (newGalleryFiles[x].name === response.data[y].name) {
                          newGalleryFiles[x] = {
                            name: response.data[y].name,
                            id: response.data[y].id,
                          };
                        }
                      }
                    }
                  }
                  setGalleryFiles(newGalleryFiles);

                  await refetchPost();
                  await reorderImages({
                    showSuccess: false,
                    galleryObject: newGalleryFiles,
                  });
                  //set field value to id of image, which is used to attach to post
                  toast.success("Gallery uploads complete!", {
                    duration: 3000,
                  });
                  if (!isEditMode) {
                    goTo("3");
                  } else {
                    setIsSubmitting(false);
                  }
                  setIsSubmitting(false);
                })
                .catch(function (error) {
                  console.log(error);
                  toast.console.warn("The gallery failed to update.", {
                    duration: 3000,
                  });
                  setIsSubmitting(false);
                });
            }
          }
        } else if (values.gallery == "reorder") {
          await reorderImages({ showSuccess: true });
          setIsSubmitting(false);
        } else {
          setIsSubmitting(false);
          if (!isEditMode) {
            goTo("3");
          }
        }
      }
      await submit();
      setIsSubmitting(false);
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

  const [uploadNewBanner, setUploadNewBanner] = useState(false);
  const [uploadNewLogo, setUploadNewLogo] = useState(false);
  const [galleryChanged, setGalleryChanged] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState(false);

  // useEffect(()=>{

  //     setContent(postObject?.content)
  //     setExcerpt(postObject?.excerpt)
  // },[postObject])

  useEffect(() => {
    if (postObject?.gallery?.length !== galleryFiles?.length) {
      setGalleryChanged(true);
    }
  }, [galleryFiles]);

  const reorderImages = async ({
    showSuccess = false,
    galleryObject = galleryFiles,
  }) => {
    let newOrder = galleryObject.map((file, index) => {
      return file.id;
    });
    if (!newOrder.length) {
      return;
    }
    //if one of the new images is a file object or undefined, skip the reordering
    if (
      newOrder.some(file => file instanceof File || typeof file === "undefined")
    ) {
      return;
    }

    let updatePostEndpointConfig = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },

      data: {
        data: {
          gallery: newOrder,
        },
      },
    };

    await axios(updatePostEndpointConfig)
      .then(async function (response) {
        if (showSuccess) {
          toast.success("Gallery images reordered!", {
            duration: 3000,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("There was an error!", {
          duration: 5000,
        });
      });
  };

  return (
    <div className="px-6 md:px-0 max-w-2xl w-full">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mx-auto mb-2">Add media</h1>
        <p className="text-gray-600">
          Upload your logo and multiple gallery images.
        </p>
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
            <label htmlFor="image" className="text-md font-medium">
              Logo
            </label>
            <ImageUploader
              id={3}
              companyLogoIsDefault={false}
              initialImage={
                postObject?.logo
                  ? postObject.logo?.url
                  : postObject.legacyLogo
                    ? postObject.legacyLogo
                    : ""
              }
              setFormValue={blob => {
                setUploadNewLogo(true);
                formik.setFieldValue("logo", blob);
              }}
            />

            <label htmlFor="image" className="text-md mt-10 font-medium">
              Banner
            </label>
            <ImageUploader
              id={4}
              w={770}
              h={377}
              companyLogoIsDefault={false}
              initialImage={postObject?.featuredImage}
              setFormValue={blob => {
                setUploadNewBanner(true);
                formik.setFieldValue("banner", blob);
              }}
            />
            {/* <ImageUploader initialImage={defaultCompany?.logo} setFormValue={(blob) =>{
                    setImageBlob(blob)
                    formik.setFieldValue("image",blob)
                }}/> */}
            {formik.errors.logo && (
              <span className="text-red-600 text-sm">{formik.errors.logo}</span>
            )}

            <label htmlFor="image" className="text-md mt-10 font-medium">
              Gallery
            </label>
            <p className="-mt-3 text-black/70">
              Please add a minimum of 3 images
            </p>
            <GalleryUpload
              gallery={postObject?.gallery}
              reorder={() => {
                setGalleryChanged(true);
                formik.setFieldValue("gallery", "reorder");
              }}
              updateField={files => {
                setGalleryChanged(true);
                // formik.setFieldValue("logo",files)
                if (files) {
                  setGalleryFiles(files);
                  for (var x = 0; x < files.length; x++) {
                    if (files[x] instanceof File) {
                      formik.setFieldValue("gallery", "added");
                    }
                  }
                } else {
                  setGalleryFiles(null);
                  formik.setFieldValue("gallery", "");
                }
              }}
            />
            {formik.errors.gallery && (
              <span className="text-red-600 text-sm">
                {formik.errors.gallery}
              </span>
            )}
          </div>
          <div className="flex flex-col mx-auto mt-5 max-w-2xl w-auto" />

          <>
            <Button
              variant={"confirmMedium"}
              type="submit"
              disabled={isSubmitting}
              className="p-4 bg-blue-700 text-white font-semibold rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="mx-auto w-5">
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
          </>
        </FormContainer>
      </form>
    </div>
  );
};

export default MediaForm;
