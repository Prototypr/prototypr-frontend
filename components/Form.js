import { FormEvent } from 'react'
import Button from '@/components/atom/Button/Button'

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
  isLoading
}) {
  return (
    <>
    {disabled!==true ?
      <form onSubmit={onSubmit}>
      <label>
        <span>{label?label:'Type your GitHub username'}</span>
        <input type={inputType?inputType:"text"} placeholder={placeholder} name={inputName?inputName:"token"} required />
      </label>
      
      <Button
          isFullWidth
          type="submit"
          className="justify-center h-11 font-medium"
          color="default"
          isLoading={isLoading}
      >
          {buttonText?buttonText:'Log in'}
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
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>:
    <>
    {disabledMessage}
    </>}
    </>
  )
}