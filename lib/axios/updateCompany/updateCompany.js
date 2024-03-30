/**
 * when the form submitted and user logged in, create sponsored post from the user's account
 */
import toast from "react-hot-toast";
const axios = require("axios");

export async function updateCompany({user,companyId, values, uploadNewCompanyImage}) {
    let configUpload = {
   
        method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/updateCompany`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
      data: {
        ...values,
        companyId:companyId
      },
    };

    await axios(configUpload)
      .then(async function (response) {

        if(response?.data?.posted==true){

          /**
           * upload company logo
           */
           if(values?.companyLogo && uploadNewCompanyImage===true){     
            const loadingLogo = toast.loading("Uploading your company logo...");
            const file = new File([values.companyLogo], `companylogo_.png`, {
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
                  if(loadingLogo){
                    toast.dismiss(loadingLogo)
                  }
                  //set field value to id of image, which is used to attach to post
                  toast.success("Logo upload complete!", {
                    duration: 3000,
                  });
              })
              .catch(function (error) {
                console.log(error);
                if(loadingLogo){
                    toast.dismiss(loadingLogo)
                  }
                toast.console.warn("The company logo failed to save.", {
                  duration: 3000,
                });
              });
          }
          toast.success("Your company has been updated!", {
            duration: 3000,
          });

          return response?.data.id
          // router.push(`/sponsor/booking/${response?.data.id}/payment`);
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
        toast.error("Something went wrong!", {
          duration: 5000,
        });
      });
  }