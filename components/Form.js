// import { FormEvent } from 'react'
import Button from "./Primitives/Button";
export default function Form({
  errorMessage,
  onSubmit,
  label,
  buttonText,
  inputName,
  inputType,
  placeholder,
  disabledMessage,
  disabled,
  isLoading,
  defaultValue,
}) {
  return (
    <>
      {disabled !== true ? (
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label>
            <span>{label ? label : "Type your GitHub username"}</span>
          </label>
            <input
              className="my-3 rounded-full h-[50px] px-6"
              type={inputType ? inputType : "text"}
              defaultValue={defaultValue ? defaultValue : ""}
              placeholder={placeholder}
              name={inputName ? inputName : "token"}
              required
            />

          <Button
            isFullWidth
            type="submit"
            className="justify-center px-20 !py-2 !rounded-full font-medium"
            color="default"
            isLoading={isLoading}
          >
            {buttonText ? buttonText : "Log in"}
          </Button>

          {errorMessage && <p className="error">{errorMessage}</p>}

        </form>
      ) : (
        <>{disabledMessage}</>
      )}
    </>
  );
}
