import FormControl from "@/components/atom/FormControl/FormControl";
import { accountLocations } from "@/lib/constants";
import axios from "axios";
// import { useSession } from "next-auth/react";
import qs from "query-string";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUser from '@/lib/iron-session/useUser'
import Button from "../atom/Button/Button";
import { useRouter } from 'next/router'
import { updateUserSession } from "@/lib/iron-session/updateUserSession";
import AvatarEditor from "./AvatarEditor";

const websiteRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
const UserForm = ({ info }) => {

  const {user, mutateUser} = useUser({
    redirectTo: '/sign-in',
    redirectIfFound: false,
  })

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      location: info.location,
      firstName: info.firstName,
      secondName: info.secondName,
      website: info.website,
      bio: info.bio,
      paymentPointer: info.paymentPointer,
      email: info.email,
      username: info.username,
    },
  });
  
  const router = useRouter()

  const watchBio = watch("bio");
  const onSubmit = async (data) => {
    if (!data.location) {
      // if location not provided
      // clear it
      data.location = undefined;
    }

  //update the session with the latest user input
  //returns true or false if the form should refresh
  const refresh = await updateUserSession(data, mutateUser)


    try {
      await axios({
        method: "POST",
        url:
          process.env.NEXT_PUBLIC_API_URL + "/api/users-permissions/users/me",
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
      });

      toast.success("Successfully updated", {
        duration: 5000,
      });
      //if the user email has been changed, the account is unconfirmed.
      //trigger a refresh so the verification form is showing
      if(refresh){
        setTimeout(()=>{
          router.reload(window.location.pathname)
        },100)
      }
    } catch (error) {
      toast.error("Error has occured.");
      console.log(error.message)
      error.response.data.error.details.errors.forEach((i) => {
        if (
          [
            "location",
            "firstName",
            "secondName",
            "website",
            "bio",
            "paymentPointer",
            "email",
          ].includes(i.path[0])
        ) {
          setError(
            i.path[0],
            i.path[0] === "location"
              ? {
                  message: "Location not available.",
                }
              : {
                  message: i.message,
                }
          );
        }
      });
    }
  };

  return (
    <div>
       <div className="text-sm mt-3 font-semibold text-gray-700">
          Profile picture
        </div>
      <AvatarEditor/>
   
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormControl inValid={!!errors.firstName}>
            <label htmlFor="firstName" className="text-sm">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="off"
              className="w-full"
              placeholder="John"
              disabled={isSubmitting}
              aria-describedby="firstName_error"
              aria-live="assertive"
              {...register("firstName", {
                maxLength: {
                  message: "Maximum length can be up to 50 characters",
                  value: 50,
                },
              })}
            />
            {errors.firstName && (
              <span className="error" role="alert" id="firstName_error">
                {errors.firstName.message}
              </span>
            )}
          </FormControl>
          <FormControl inValid={!!errors.secondName}>
            <label htmlFor="secondName" className="text-sm">
              Last name
            </label>
            <input
              id="secondName"
              type="text"
              autoComplete="off"
              className="w-full"
              placeholder="Doe"
              disabled={isSubmitting}
              aria-describedby="secondName_error"
              aria-live="assertive"
              {...register("secondName", {
                maxLength: {
                  message: "Maximum length can be up to 50 characters",
                  value: 50,
                },
              })}
            />
            {errors.secondName && (
              <span className="error" role="alert" id="secondName_error">
                {errors.secondName.message}
              </span>
            )}
          </FormControl>
          <FormControl inValid={!!errors.location}>
            <label htmlFor="location" className="text-sm">
              Location
            </label>
            <select
              id="location"
              className="w-full"
              disabled={isSubmitting}
              aria-describedby="location_error"
              aria-live="assertive"
              {...register("location")}
            >
              {accountLocations.map((i, index) => (
                <option key={'loaction_'+index} value={i.Code}>
                  {i.Name}
                </option>
              ))}
            </select>
            {errors.location && (
              <span className="error" role="alert" id="location_error">
                {errors.location.message}
              </span>
            )}
          </FormControl>
          <FormControl inValid={!!errors.website}>
            <label htmlFor="website" className="text-sm">
              Personal Website
            </label>
            <input
              id="website"
              type="text"
              autoComplete="off"
              className="w-full"
              disabled={isSubmitting}
              aria-describedby="website_error"
              aria-live="assertive"
              placeholder="https://myprofile.com"
              {...register("website", {
                maxLength: {
                  message: "Maximum length can be up to 120 characters",
                  value: 120,
                },
                pattern: {
                  message: "Enter a valid URL",
                  value: websiteRegex,
                },
              })}
            />
            {errors.website && (
              <span className="error" role="alert" id="website_error">
                {errors.website.message}
              </span>
            )}
          </FormControl>
        </div>

        <FormControl inValid={!!errors.bio}>
          <label htmlFor="bio" className="text-sm">
            Bio
          </label>
          <textarea
            id="bio"
            type="text"
            autoComplete="off"
            className="w-full resize-y h-auto"
            rows={4}
            disabled={isSubmitting}
            aria-describedby="bio_error"
            aria-live="assertive"
            placeholder="Where are you from? What's your role? What's your favourite animal?"
            {...register("bio", {
              maxLength: {
                message: "Maximum length can be up to 160 characters",
                value: 160,
              },
            })}
          />
          <span className="text-xs text-gray-400 mt-1">{`${
            (watchBio ?? "").length
          } / ${160} characters used`}</span>

          {errors.bio && (
            <span className="error" role="alert" id="bio_error">
              {errors.bio.message}
            </span>
          )}
        </FormControl>
        <FormControl inValid={!!errors.paymentPointer}>
          <label htmlFor="paymentPointer" className="text-sm">
            Payment Pointer
          </label>
          <input
            id="paymentPointer"
            type="text"
            autoComplete="off"
            className="w-full"
            disabled={isSubmitting}
            aria-describedby="paymentPointer_error"
            aria-live="assertive"
            placeholder="$alice.wallet.example"
            {...register("paymentPointer", {
              maxLength: {
                message: "Maximum length can be up to 120 characters",
                value: 120,
              },
            })}
          />
          {errors.paymentPointer && (
            <span className="error" role="alert" id="paymentPointer_error">
              {errors.paymentPointer.message}
            </span>
          )}
        </FormControl>

        <FormControl inValid={!!errors.email}>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            className="w-full"
            placeholder="john@mail.com"
            disabled={false}
            aria-describedby="email_error"
            aria-live="assertive"
            {...register("email", {
              required: true,
              maxLength: {
                message: "Maximum length can be up to 120 characters",
                value: 120,
              },
            })}
          />
          {errors.email && (
            <span className="error" role="alert" id="email_error">
              {errors.email.message}
            </span>
          )}
        </FormControl>

        <FormControl inValid={!!errors.username}>
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="off"
            className="w-full"
            placeholder="John"
            disabled={true}
            aria-describedby="username_error"
            aria-live="assertive"
            {...register("username", {
              required: true,
              maxLength: {
                message: "Maximum length can be up to 120 characters",
                value: 120,
              },
            })}
          />
          {errors.username && (
            <span className="error" role="alert" id="username_error">
              {errors.username.message}
            </span>
          )}
        </FormControl>

        <div className="mt-6 flex items-center gap-3">
          <Button
            disabled={Object.keys(errors).length > 0}
            isLoading={isSubmitting}
            type="submit"
            color="primary"
          >
            Save Profile Info
          </Button>
          {isSubmitSuccessful && (
            <div role="alert" className="text-green-600 text-sm font-medium">
              Profile information successfully updated.
            </div>
          )}
        </div>
      </div>
    </form>
    </div>
  );
};

export default UserForm;