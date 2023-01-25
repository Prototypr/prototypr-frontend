import { Wizard, Steps, Step } from "react-albus";
import { Line } from "rc-progress";
// import { useRouter } from 'next/router'
import {useState } from "react";
import TopicsSelect from "./TopicsSelect";
import InterestsSelect from "./InterestsSelect";
import NewslettersSelect from "./NewslettersSelect";


export default function Onboarding({ allTags, user }) {
  // const router = useRouter()

  const [selectedTopics, setSelectedTopics] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState(false)
  const [selectedNewsletters, setSelectedNewsletters] = useState(false)

  return (
    <Wizard
      basename="/onboard"
      render={({ step, steps }) => (
        <div className="">
          <Steps>
            <Step
              id="step1"
              render={({ next }) => (
                <TopicsSelect selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} allTags={allTags} user={user} next={next}/>
              )}
            />
            <Step
              id="step3"
              render={({ next, previous }) => (
                <InterestsSelect
                user={user}
                next={next}
                previous={previous}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                />
              )}
            />
            <Step
              id="step2"
              render={({ next, previous }) => (
                <NewslettersSelect
                user={user}
                next={next}
                previous={previous}
                selectedOptions={selectedNewsletters}
                setSelectedOptions={setSelectedNewsletters}
                />
              )}
            />
            <Step
              id="step4"
              render={({ previous }) => (
                <div className="md:w-[585px] w-full px-10 lg:px-0">
                  <div>
                    <h1 className="text-3xl font-inter-serif text-gray-900 font-bold mb-3">
                      One last thing!
                    </h1>
                  </div>
                  <p className="text-gray-600 max-w-md mb-3">
                    When you publish on Prototypr, you'll be eligible to earn
                    tips and streamed payments based on viewing time. Just fill
                    in the payment pointer{" "}
                    <img
                      className="w-6 inline"
                      src="https://webmonetization.org/img/wm-icon-animated.svg"
                    />{" "}
                    field on your profile page.
                  </p>
                  <p className="text-gray-600 max-w-md mb-3">
                    You can also update your public profile with your avatar, name, and links to your social profiles.
                  </p>
                  <div className="flex mx-auto mt-8 items-left justify-start ">
                    <a href="/account">
                      <button
                        aria-label="Set up profile"
                        className={`text-base px-4 z-10 py-3 mb-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                    hover:bg-blue-600
                                    bg-blue-500  
                                    duration-200 ease-in-out 
                                    transition`}
                      >
                        <div className="flex mx-auto text-white font-semibold my-auto leading-5">
                          <div>{"Create profile"}</div>
                        </div>
                      </button>
                    </a>
                    <button
                      aria-label="Go back"
                      type="submit"
                      onClick={() => previous()}
                      className={`text-base ml-3 px-3 inline z-10 py-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                bg-white  
                                duration-200 ease-in-out 
                                transition`}
                    >
                      <div className="flex mx-auto text-blue-600 hover:text-blue-500 font-semibold my-auto leading-5">
                        <div>Go back</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            />
          </Steps>
          <div
            className={`${
               step.id == "step4" ? "opacity-0" : ""
            }  ${ step.id == "step1"?'mt-10':'-mt-5'} flex flex-col align-center items-center mx-auto px-3 justify-center`}
            style={{ maxWidth: "250px" }}
          >
            {/* <p className="text-xs text-blue-default mb-2">{steps.indexOf(step) + 1} of {steps.length}</p> */}
            <Line
              strokeColor="#2D3C9B"
              strokeWidth="1"
              className="pb-3"
              percent={((steps.indexOf(step) + 1) / steps.length) * 100}
            />
          </div>
        </div>
      )}
    ></Wizard>
  );
}