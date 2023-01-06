// import { FormEvent } from 'react'
import Button from "@/components/atom/Button/Button";

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
        <form onSubmit={onSubmit}>
          <label>
            <span>{label ? label : "Type your GitHub username"}</span>
            <input
              type={inputType ? inputType : "text"}
              defaultValue={defaultValue ? defaultValue : ""}
              placeholder={placeholder}
              name={inputName ? inputName : "token"}
              required
            />
          </label>

          <Button
            isFullWidth
            type="submit"
            className="justify-center bg-gray-100 h-11 p-8 px-20 rounded-full font-medium"
            color="default"
            isLoading={isLoading}
          >
            {buttonText ? buttonText : "Log in"}
          </Button>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <style jsx>{`
            form,
            label {
              display: flex;
              flex-flow: column;
            }
            label > span {
              font-weight: 500;
            }
            input {
              padding: 30px 32px;
              margin: 0.3rem 0 1rem;
              border: 1px solid #ccc;
              border-radius: 30px;
            }
            .error {
              color: brown;
              margin: 1rem 0 0;
            }
          `}</style>
        </form>
      ) : (
        <>{disabledMessage}</>
      )}
    </>
  );
}
