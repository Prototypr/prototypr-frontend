import { Wizard, Steps, Step } from 'react-albus';
import { Line } from 'rc-progress';

export default function Alert({ preview }) {
  return (
    <Wizard 
    basename='/sign-in'
    render={({ step, steps }) => (
        <div className="flex flex-col">
            <Steps>
                <Step
                    id="step1"
                    render={({ next }) => (
                        <>
                          <div className="md:w-[585px] w-full px-10 lg:px-0">
                              <h2 className="text-3xl font-noto-serif text-gray-800 font-bold text-center mb-6">
                                Welcome, early adopter!
                              </h2>
                              {/* <p className="text-gray-600 mt-3">
                                Hi {user.name},
                              </p> */}
                              {/* <p className="text-gray-600 mt-3">
                                Thanks for joining as a writer, and welcome to the new Prototypr.
                                </p> */}
                                <p className="text-gray-600 mt-3"> 
                              Prototypr is being relaunched to boost an <span className="font-bold">open</span>, <span className="font-bold">fair</span>, and <span className="font-bold">inclusive</span> web through a new browser technology called '<a target="_blank" className="text-blue-600 cursor-pointer hover:underline" href="https://prototypr.io/post/imagining-an-ad-free-internet-web-monetization-for-designers/">Web Monetization</a>' – yes, a solution to paywalls and intrusive ads. You'll be amongst the first web custodians to join our platform with a mission: 
                              </p>
                              <ul className="list-disc pl-8 text-gray-600 mt-3">
                                <li className="my-2"><span className="font-semibold">Accessible and Inclusive</span>: No more paywalls. Built for different people, cultures, and abilities.</li>
                                <li className="my-2"><span className="font-semibold">Reward and Reach</span>: Join a network to distribute your work, and make earnings based on the time people engage with it.</li>
                                <li className="my-2"><span className="font-semibold">Open Source</span>: The code for the Prototypr platform will be published under MIT Open License for anyone to remix, learn from, and copy.</li>
                              </ul>

                              <button 
                                aria-label="Save and Next"
                                onClick={next}
                                className={`text-base px-3 py-2 mr-2 focus:outline-none flex justify-center rounded-md cursor-pointer 
                                  hover:bg-blue-600
                                  bg-blue-500  
                                  duration-200 ease-in-out 
                                  transition`}>
                                <div className="flex mx-auto text-white text-sm font-semibold my-auto leading-5">
                                      <div>Save and Next</div>
                                </div>
                                </button>

                              {/* <a className="block mx-auto" href="/account" passHref prefetch={false}>
                                <Button as="a" color="primary" className="text-sm">
                                  Set up profile
                                </Button>
                              </a> */}
                            </div>
                        </>
                    )}
                />
                <Step
                    id="step2"
                    render={({ next, previous }) => (
                        <>
                            <div className="w-full p-8">
                                <div><h1 className="text-2xl text-gray-900 font-bold font-display mb-2">Create your publication</h1></div>
                                <p className="text-gray-700 mb-3">What is your newsletter about?</p>
                                  <>
                                  ni
                                    {/* <OnboardPublicationForm continue={next} previous={previous} publicationId={user.publications?user.publications[0]:null}/> */}
                                    </>
                            </div>

                        </>
                    )}
                />
                <Step
                    id="step3"
                    render={({ previous }) => (
                        <div className="p-8">
                            <div><h1 className="text-2xl font-display text-gray-900 font-bold mb-2">You're all set! 🎉</h1></div>
                            <p className="text-gray-700 mb-3">Thanks for joining Letter (beta), you're all set.</p>
                            <div className="p-3 my-3 mb-4 bg-green-50 rounded text-gray-700">
                                <h2 className="text-base font-primary font-medium text-green-800">We've sent you an activation email</h2>
                                <p className="text-green-800 text-sm">An activation link has been sent to <span className="font-semibold">{user.email}</span>. Click the link in the message to fully activate your account.</p>
                            </div>
                            <p className="text-gray-700 mt-3 mb-6">I hope you enjoy using Letter as much as I enjoy making it.</p>
                            <a target="_blank" href="https://twitter.com/graeme_fulton" className="rounded-lg text-xs leading-tight cursor-pointer mb-6">
                                <div className="avatar size-small gutter-none">
                                    <span>
                                        <img alt="graeme" width="60" className="rounded-lg avatar-image" src="https://secure.gravatar.com/avatar/2420c3071c2497feb6193ad7ed0603e5?size=200&amp;default=http%3A%2F%2Fwww.gravatar.com%2Favatar%2F%3Fd%3Didenticon" title="graeme" />
                                    </span>
                                </div>
                            </a>
                            <p className="text-gray-700 mb-6 mt-2 text-sm"><a target="_blank" href="https://twitter.com/graeme_fulton">Graeme, creator of Letter.</a></p>

                            <div className="flex">
                                <a href="/">
                                <button 
                                    aria-label="Continue"
                                    type="submit"
                                    className={`text-base px-3 py-2 mr-2 focus:outline-none flex justify-center rounded-md cursor-pointer 
                                    hover:bg-blue-600
                                    bg-blue-500  
                                    duration-200 ease-in-out 
                                    transition`}>
                                    <div className="flex mx-auto text-white text-sm font-semibold my-auto leading-5">
                                        <div>{'Continue to dashboard'}</div>
                                    </div>
                                    </button>
                                </a>
                                <button 
                                aria-label="Go back"
                                type="submit"
                                onClick={() => previous()}
                                className={`text-base px-3 py-2 mr-2 focus:outline-none flex justify-center rounded-md cursor-pointer 
                                hover:bg-gray-100
                                bg-white  
                                duration-200 ease-in-out 
                                transition`}>
                                <div className="flex mx-auto text-blue-600 hover:text-blue-500 text-sm font-semibold my-auto leading-5">
                                    <div>Go Back</div>
                                </div>
                                </button>
                            </div>
                        </div>
                    )}
                />
            </Steps>
            <div className="py-3 bg-gray-100 px-3 border-t border-gray-400 rounded-b-lg">
                <p className="text-xs text-blue-700 mb-2">{steps.indexOf(step) + 1} of {steps.length} completed</p>
                <Line
                    strokeColor="#2D3C9B"
                    strokeWidth="1"
                    className="pb-3"
                    percent={(steps.indexOf(step) + 1) / steps.length * 100}
                />
            </div>
        </div>

    )}>
</Wizard>
  )
}
