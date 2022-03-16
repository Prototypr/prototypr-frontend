import FormControl from "@/components/atom/FormControl/FormControl";
import { accountLocations } from "@/lib/constants";
import { useForm } from "react-hook-form";
import Button from "../atom/Button/Button";

// demo
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const UserForm = () => {
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
          })}
        />
        {errors.paymentPointer && (
          <span className="error">{errors.paymentPointer.message}</span>
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

export default UserForm;
