import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function Form (props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => props.onSubmit(data);

  return (
    <form
      className={"w-full " + props.formStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex">
        <div className="border-gray-300 mr-3 border-2 rounded-full w-8 h-8">
          <Image
            width={32}
            height={32}
            objectFit="contain"
            alt="avatar"
            className="rounded-full"
            data-src={
              props.user && props.user.avatar
                ? props.user.avatar
                : "/static/images/dummyuser.png"
            }
            src={
              props.user && props.user.avatar
                ? props.user.avatar
                : "/static/images/dummyuser.png"
            }
          />
        </div>
        <div className="w-full">
          {/* hidden textarea */}
          <label htmlFor="Comment">Share what you think</label>

          <textarea
            type="text"
            id="Comment"
            placeholder="What are your thoughts?"
            defaultValue={props.defaultContent ? props.defaultContent : ""}
            name="Comment"
            rows="4"
            ref={
              props.user &&
              register({ required: true, maxLength: 3000, minLength: 20 })
            }
            className={
              "mt-1 w-full max-w-xl bg-gray-white focus:outline-none text-gray-800 focus:shadow-outline border border-gray-300 rounded-lg p-2 block appearance-none leading-normal"
            }
          />

          <input
            type="text"
            value={props.parentID}
            name="ParentID"
            ref={register({ required: false })}
            className={" hidden"}
          />

          <div className="mt-1">
            {errors.Comment && errors.Comment.type === "required" && (
              <p className="text-orange-500">This field is required</p>
            )}
            {errors.Comment && errors.Comment.type === "maxLength" && (
              <p className="text-orange-500">
                Maximum length is 3000 characters
              </p>
            )}
            {errors.Comment && errors.Comment.type === "minLength" && (
              <p className="text-orange-500">Add at least 20 characters</p>
            )}
          </div>
          <div className="flex">
            {props.user ? (
              <button
                aria-label="Submit a new comment"
                type="submit"
                className={
                  props.buttonStyle
                    ? props.buttonStyle
                    : " text-sm mt-2 mb-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-5 my-auto rounded"
                }
              >
                {props.isLoading
                  ? "Sending..."
                  : props.buttonText
                  ? props.buttonText
                  : "Post comment"}
              </button>
            ) : (
              <button
                aria-label="Submit a new comment"
                type="submit"
                className={
                  props.buttonStyle
                    ? props.buttonStyle
                    : " text-sm mt-2 mb-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-5 my-auto rounded"
                }
              >
                {props.buttonText ? props.buttonText : "Sign up to comment"}
              </button>
            )}

            {props.isChild && (
              <div
                className="text-sm mt-1 cursor-pointer ml-2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium py-1 px-3 my-auto rounded "
                onClick={() => props.toggleCommentForm()}
              >
                Cancel
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
