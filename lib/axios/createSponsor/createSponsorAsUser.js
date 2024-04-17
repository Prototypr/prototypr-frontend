/**
 * when the form submitted and user logged in, create sponsored post from the user's account
 */
import toast from "react-hot-toast";
const axios = require("axios");

export async function createSponsorAsUser({
  user,
  packages,
  values,
  uploadNewBanner,
  uploadNewFeaturedImage,
}) {
  let products = [];

  for (var i = 0; i < packages.length; i++) {
    products.push(packages[i].uid);
  }

  if (products?.length) {
    values.products = products;
  }

  values.productIds = products.join(",");

  let configUpload = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/createSponsoredPost`,
    headers: {
      Authorization: `Bearer ${user?.jwt}`,
    },
    data: {
      ...values,
      companyId: user?.profile?.activeCompany?.id,
    },
  };

  const id = await axios(configUpload)
    .then(async function (response) {
      if (response?.data?.posted == true) {
        /**
         * upload banner
         */
        if (values?.banner && uploadNewBanner === true) {
          const loadingBanner = toast.loading("Uploading your banner...", {
            duration: 3000,
          });
          const file = new File([values.banner], `banner_.png`, {
            type: "image/png",
          });

          const data = {};
          const formData = new FormData();
          formData.append("files", file, "banner");
          formData.append("data", JSON.stringify(data));
          formData.append("refId", response?.data?.id);
          formData.append("field", "banner");
          formData.append("ref", "api::sponsored-post.sponsored-post");

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
              if (loadingBanner) {
                toast.dismiss(loadingBanner);
              }
              //set field value to id of image, which is used to attach to post
              toast.success("Banner upload complete!", {
                duration: 3000,
              });
            })
            .catch(function (error) {
              console.log(error);
              if (loadingBanner) {
                toast.dismiss(loadingBanner);
              }
              toast.console.warn("The banner failed to save.", {
                duration: 3000,
              });
            });
          if (loadingBanner) {
            toast.dismiss(loadingBanner);
          }
        }
        /**
         * upload featuredImage
         */
        if (values?.featuredImage && uploadNewFeaturedImage === true) {
          const featuredImage = toast.loading("Uploading featured image...", {
            duration: 3000,
          });
          const file = new File([values.featuredImage], `featuredImage_.png`, {
            type: "image/png",
          });

          const data = {};
          const formData = new FormData();
          formData.append("files", file, "featuredImage");
          formData.append("data", JSON.stringify(data));
          formData.append("refId", response?.data?.id);
          formData.append("field", "featuredImage");
          formData.append("ref", "api::sponsored-post.sponsored-post");

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
              if (featuredImage) {
                toast.dismiss(featuredImage);
              }
              //set field value to id of image, which is used to attach to post
              toast.success("Featured image uploaded!", {
                duration: 3000,
              });
            })
            .catch(function (error) {
              console.log(error);
              if (featuredImage) {
                toast.dismiss(featuredImage);
              }
              toast.console.warn("The banner failed to save.", {
                duration: 3000,
              });
            });
          if (featuredImage) {
            toast.dismiss(featuredImage);
          }
        }
        toast.success("Your Sponsorship has been saved!", {
          duration: 3000,
        });

        return response?.data.id;
        // router.push(`/sponsor/booking/${response?.data.id}/payment`);
        // formik.resetForm();
      } else {
        toast.error(
          response?.data?.message
            ? response?.data?.message
            : "Something went wrong submitting your post!",
          {
            duration: 5000,
          }
        );
      }
      console.log("Done! ->", response);
    })
    .catch(function (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        duration: 5000,
      });
    });
  return id;
}
