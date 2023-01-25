import FormControl from "@/components/atom/FormControl/FormControl";
import { accountLocations } from "@/lib/constants";
import dynamic from "next/dynamic";
// import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUser from '@/lib/iron-session/useUser'
import Button from "../atom/Button/Button";
import { useRouter } from 'next/router'
import Link from 'next/link'
import fetchJson from "@/lib/iron-session/fetchJson";

// import AvatarEditor from "";
const AvatarEditor = dynamic(() => {return import("./AvatarEditor")},{ ssr: false });

const websiteRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
const UserForm = ({ info }) => {

  const {user, mutateUser} = useUser({
    redirectTo: '/',
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
      twitter: info.twitter,
      dribbble: info.dribbble,
      github: info.github,
      kofi: info.kofi,
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

    try {
      const body = {data};
      const result = await fetchJson('/api/account/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if(result.status === 200){
        toast.success("Successfully updated", {
          duration: 5000,
        });
      
      }else{
        let msg = result?.error?.message
        // const text = await result.text();
        toast.error(msg?msg:"Error has occured.");
        if(msg){
          if(msg.indexOf('Username')>-1){
            setError('username',{message:msg?msg:"Error has occured."})
          }
          if(msg.indexOf('Email')>-1){
            setError('email',{message:msg?msg:"Error has occured."})
          }
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Error has occured.');
      // console.log(error.message)
      // console.log(error.response)
      // error.response.data.error.details.errors.forEach((i) => {
      //   if (
      //     [
      //       "location",
      //       "firstName",
      //       "secondName",
      //       "website",
      //       "bio",
      //       "paymentPointer",
      //       "email",
      //     ].includes(i.path[0])
      //   ) {
      //     setError(
      //       i.path[0],
      //       i.path[0] === "location"
      //         ? {
      //             message: "Location not available.",
      //           }
      //         : {
      //             message: i.message,
      //           }
      //     );
      //   }
      // });
    }
  };

  return (
    <div>
      
      <div className="flex flex-col md:flex-row mt-2">
      <div className="md:mr-4">
        <div className="text-sm mt-3 font-semibold text-gray-700">
          Profile picture
        </div>
        <AvatarEditor/>
      </div>
      <div className="md:px-4 w-full">
      <FormControl inValid={!!errors.paymentPointer}>
          <label htmlFor="paymentPointer" className="text-sm">
            Payment Pointer
          </label>
          <input
            id="paymentPointer"
            type="text"
            autoComplete="off"
            className="w-full h-auto"
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
        <Link href="/web-monetization">
        <div className="cursor-pointer p-4 my-3 mb-4 bg-green-50 rounded-lg text-gray-700 flex">
          <img className="w-10 mr-4" src="https://webmonetization.org/img/wm-icon-animated.svg"/>
            <div>
            <h2 className="text-md font-primary font-medium text-gray-800">Learn about Web Monetization</h2>
            <p className="text-gray-800 text-sm">Receive tips and streamed payments with a <a className="underline text-green-900 font-medium" href="#">Payment Pointer</a> and wallet. Learn how to <a className="underline text-green-900 font-medium" href="#">set it up here</a>. →</p>
            </div>
        </div>
        </Link>
      </div>
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col grid gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormControl inValid={!!errors.firstName}>
            <label htmlFor="firstName" className="text-sm">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="off"
              className="w-full h-auto"
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
              className="w-full h-auto"
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
              className="w-full h-auto"
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

        {/* <FormControl inValid={!!errors.email}>
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
        </FormControl> */}



        <FormControl inValid={!!errors.username}>
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="off"
            className="w-full h-auto"
            placeholder="John"
            // disabled={true}
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

                <hr className="py-3 mt-6"/>

          <h2>Social Links</h2>

        <FormControl inValid={!!errors.twitter}>
          <label htmlFor="twitter" className="text-sm">
            Twitter
          </label>
          <div className="relative w-4/5">
            <div class="pointer-events-none bg-gray-200 border border-gray-200 rounded-l-lg absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
              <span class="text-gray-500 sm:text-sm">https://twitter.com/</span>
            </div>
          <input
            id="twitter"
            type="text"
            autoComplete="off"
            className="pl-[150px] w-full h-auto"
            placeholder="@prototypr"
            disabled={isSubmitting}
            aria-describedby="twitter_error"
            aria-live="assertive"
            {...register("twitter", {
              maxLength: {
                message: "Maximum length can be up to 50 characters",
                value: 50,
              },
            })}
          />
          </div>
          {errors.twitter && (
            <span className="error" role="alert" id="twitter_error">
              {errors.twitter.message}
            </span>
          )}
        </FormControl>
        <FormControl inValid={!!errors.dribbble}>
          <label htmlFor="dribbble" className="text-sm">
            Dribbble
          </label>
          <div className="relative w-4/5">
            <div class="pointer-events-none bg-gray-200 border border-gray-200  rounded-l-lg absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
              <span class="text-gray-500 sm:text-sm">https://dribbble.com/</span>
            </div>
          <input
            id="dribbble"
            type="text"
            autoComplete="off"
            className="pl-[165px] h-auto w-full"
            placeholder="Prototypr"
            disabled={isSubmitting}
            aria-describedby="dribbble_error"
            aria-live="assertive"
            {...register("dribbble", {
              maxLength: {
                message: "Maximum length can be up to 50 characters",
                value: 50,
              },
            })}
          />
          </div>
          {errors.dribbble && (
            <span className="error" role="alert" id="dribbble_error">
              {errors.dribbble.message}
            </span>
          )}
        </FormControl>
        <FormControl inValid={!!errors.github}>
          <label htmlFor="github" className="text-sm">
            Github
          </label>
           <div className="relative w-4/5">
            <div class="pointer-events-none bg-gray-200 border border-gray-200  rounded-l-lg absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
              <span class="text-gray-500 sm:text-sm">https://github.com/</span>
            </div>
          <input
            id="github"
            type="text"
            autoComplete="off"
            className="pl-[150px] w-full h-auto"
            placeholder="GraemeFulton"
            disabled={isSubmitting}
            aria-describedby="github_error"
            aria-live="assertive"
            {...register("github", {
              maxLength: {
                message: "Maximum length can be up to 50 characters",
                value: 50,
              },
            })}
          />
          </div>
          {errors.github && (
            <span className="error" role="alert" id="github_error">
              {errors.github.message}
            </span>
          )}
        </FormControl>

        <FormControl inValid={!!errors.kofi}>
          <label htmlFor="kofi" className="text-sm">
            Kofi
          </label>
          <div className="relative w-4/5">
            <div class="pointer-events-none bg-gray-200 border border-gray-200  rounded-l-lg absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
              <span class="text-gray-500 sm:text-sm">https://kofi.com/</span>
            </div>
            <input
              id="kofi"
              type="text"
              autoComplete="off"
              className="pl-[134px] h-auto w-full"
              placeholder="prototyprio"
              disabled={isSubmitting}
              aria-describedby="kofi_error"
              aria-live="assertive"
              {...register("kofi", {
                maxLength: {
                  message: "Maximum length can be up to 50 characters",
                  value: 50,
                },
              })}
            />
          </div>
          {errors.kofi && (
            <span className="error" role="alert" id="kofi_error">
              {errors.kofi.message}
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
            Save all
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