import FormControl from "@/components/atom/FormControl/FormControl";
import { accountLocations } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Button from "../atom/Button/Button";
import Fallback from "../atom/Fallback/Fallback";

// demo
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const FormContainer = () => {
  const { data: sessionInfo, status } = useSession();
  console.log(sessionInfo);

  if (status === "loading") {
    return <Fallback />;
  }

  if (status === "authenticated") {
    return (
      <UserForm
        info={{
          email: sessionInfo.user.email,
          username: sessionInfo.user.name,
        }}
      />
    );
  }

  return <div>Unauthenticated whoops</div>;
};
const UserForm = ({ info }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      location: "",
      firstName: "",
      secondName: "",
      website: "",
      bio: "",
      paymentPointer: "",
      email: info.email,
      username: info.username,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    await timeout(5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("firstName", {
            disabled: isSubmitting,
            maxLength: {
              message: "Maximum length can be up to 50 characters",
              value: 50,
            },
          })}
        />
        {errors.firstName && (
          <span className="error">{errors.firstName.message}</span>
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
          {...register("secondName", {
            disabled: isSubmitting,
            maxLength: {
              message: "Maximum length can be up to 50 characters",
              value: 50,
            },
          })}
        />
        {errors.secondName && (
          <span className="error">{errors.secondName.message}</span>
        )}
      </FormControl>
      <FormControl inValid={!!errors.location}>
        <label htmlFor="location" className="text-sm">
          Location
        </label>
        <select
          id="location"
          className="w-full"
          {...register("location", {
            disabled: isSubmitting,
          })}
        >
          {accountLocations.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {errors.location && (
          <span className="error">{errors.location.message}</span>
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
          placeholder="https://myprofile.com"
          {...register("website", {
            disabled: isSubmitting,
            maxLength: {
              message: "Maximum length can be up to 50 characters",
              value: 120,
            },
          })}
        />
        {errors.website && (
          <span className="error">{errors.website.message}</span>
        )}
      </FormControl>
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
          placeholder="Where are you from? What's your role? What's your favourite animal?"
          {...register("bio", {
            disabled: isSubmitting,
            maxLength: {
              message: "Maximum length can be up to 50 characters",
              value: 160,
            },
          })}
        />
        {errors.bio && <span className="error">{errors.bio.message}</span>}
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
          placeholder="$alice.wallet.example"
          {...register("paymentPointer", {
            disabled: isSubmitting,
            maxLength: {
              message: "Maximum length can be up to 50 characters",
              value: 120,
            },
          })}
        />
        {errors.paymentPointer && (
          <span className="error">{errors.paymentPointer.message}</span>
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
          {...register("email", {
            // disabled: isSubmitting,
            disabled: true,
            required: true,
            maxLength: {
              message: "Maximum length can be up to 120 characters",
              value: 120,
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
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
          {...register("username", {
            disabled: true,
            // disabled: isSubmitting,
            required: true,
            maxLength: {
              message: "Maximum length can be up to 120 characters",
              value: 120,
            },
          })}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </FormControl>

      <div className="mt-6">
        <Button isLoading={isSubmitting} type="submit" color="primary">
          Save Profile Info
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
