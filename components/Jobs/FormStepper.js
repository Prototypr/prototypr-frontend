import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function isEmptyObject(obj) {
  return (
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

export const FormContainer = ({ children }) => {
  return <div>{children}</div>;
};

const ProgressTile = ({ isComplete = false }) => {
  return (
    <div
      className={`w-full h-1 ${isComplete ? "bg-blue-600" : "bg-blue-100"} `}
    ></div>
  );
};

export const FormStepper = ({ children, onSubmit, formik }) => {
  const stepsArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const currentStep = stepsArray[step];

  const { dirty, errors, isValid } = formik;

  useEffect(() => {
    if (isEmptyObject(errors)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isEmptyObject(errors)) {
          setDisabled(false);
          setStep(0);
          onSubmit();
        } else {
          setDisabled(true);
          toast.error("Hmmmm, it seems like some of the fields are empty.");
        }
      }}
    >
      <div className="flex flex-col grid gap-5 max-w-lg">
        <div className="flex flex-row gap-2">
          {stepsArray.map((child, index) => {
            return <ProgressTile key={index} isComplete={step + 1 > index} />;
          })}
        </div>
        {currentStep}
        <div className="flex flex-row  gap-2">
          <button
            type="button"
            className="w-full p-4 border-blue-700 border text-blue-700 rounded"
            onClick={(e) => {
              e.preventDefault();
              step === 0 ? setStep(1) : setStep(0);
            }}
          >
            {step === 0 ? "Next" : "Back"}
          </button>
          {step === 1 && (
            <button
              type="submit"
              disabled={disabled}
              className="w-full p-4 bg-blue-700 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
