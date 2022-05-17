import { Wizard, Steps, Step } from 'react-albus';
import { Line } from 'rc-progress';
// import { useRouter } from 'next/router'

export default function Alert({ preview }) {
  // const router = useRouter()

  return (
    <Wizard 
    basename='/early-access'
    render={({ step, steps }) => (
        <div className="">
            <Steps>
                <Step
                    id="step1"
                    render={({ next }) => (
                        <>
                          <div className="md:w-[585px] w-full px-10 lg:px-0 text-left">
                              <div className='flex justify-center mx-auto mb-1'>
                                <h2 className="text-3xl font-noto-serif text-gray-800 font-bold text-center">
                                  Let's change the web!
                                </h2>
                                <img className="w-10 ml-2" src="https://webmonetization.org/img/wm-icon-animated.svg"/>
                              </div>
                              {/* <h3 className="text-lg font-noto-serif text-gray-600 text-center mb-6">
                                  Introducing a new prototypr
                                </h3> */}
                                <p className="text-gray-600 mt-3"> 
                              Welcome to a new Prototypr – together we can create a more <span className="font-bold">open</span>, <span className="font-bold">fair</span>, and <span className="font-bold">inclusive</span> web for designers and developers. Prototypr is a <a className='underline text-blue-600' href="https://prototypr.io/post/announcing-prototypr-grant-for-the-web-flagship-project-%F0%9F%8E%89/" target="_blank">Grant for the Web</a> recipient piloting a new browser technology called '<a target="_blank" className="text-blue-600 cursor-pointer underline" href="https://prototypr.io/post/imagining-an-ad-free-internet-web-monetization-for-designers/">Web Monetization</a>' – finally, a solution to paywalls and intrusive ads. Learn about what we're doing, and set up your profile to be amongst the first credited members:
                              </p>
                              <ul className="list-disc px-12 text-gray-600 my-6 text-left">
                                <li className="my-2"><span className="font-semibold">Change the web</span>: No paywalls. Privacy-first, and built for people of different ability and backgrounds.</li>
                                <li className="my-2"><span className="font-semibold">Earn recognition</span>: A network to distribute your work, and make earnings based on reader engagement.</li>
                                <li className="my-2"><span className="font-semibold">Become an open source contributor</span>: Prototypr is an MIT Open License project for anyone to remix and learn from.</li>
                              </ul>
                              <div className="w-full text-center relative flex justify-center mt-6">
                              <button 
                                aria-label="Get started"
                                onClick={next}
                                className={`text-base z-10 px-4 py-3 mt-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                  hover:bg-blue-600
                                  bg-blue-500  
                                  text-white text-sm font-semibold leading-5
                                  duration-200 ease-in-out 
                                  transition`}>
                                      Get started
                                </button>
                              </div>
                            </div>
                        </>
                    )}
                />
                 <Step
                    id="step3"
                    render={({ next, previous }) => (
                      <div className="md:w-[585px] w-full px-10 lg:px-0">
                      <div className="w-full p-8 text-center">
                        <img className="mx-auto w-64 h-56  object-cover mb-6 rounded-lg" src="https://open.prototypr.io/money.jpeg" alt="Abstract illustration of a browser screen with 3 dollar bills taking up the screen"></img>
                                <div><h1 className="text-2xl text-gray-900 font-bold font-noto-serif mb-3 ">No Paywalls and Popups</h1></div>
                                <p className="text-gray-600 mt-3">
                                Free, unbiased, and quality design material is increasingly hard to come by with the rise in paywalls and privacy-invasive ads. The Open Source, <a href="https://open.prototypr.io/web-monetization" target="_blank" className="underline text-blue-600">Web Monetized</a> Prototypr platform explores an alternative model that keeps the web open to readers, whilst rewarding writers.
                                </p>
                                {/* <ul className="list-disc pl-8 text-gray-600 mt-3">
                                <li className="my-2"><span className="font-semibold">Accessible and Inclusive</span>: No more paywalls. Built for people of different abilities, and <a className="underline text-blue-600" target="_blank" href="https://open.prototypr.io/i18n">internationalised</a> for people of different backgrounds.</li>
                                <li className="my-2"><span className="font-semibold">Reward and Reach</span>: Join a network to distribute your work, and make earnings based on the time people engage with it.</li>
                                <li className="my-2"><span className="font-semibold">Open Source</span>: The code for the Prototypr platform will be published under MIT Open License for anyone to remix, learn from, and copy.</li>
                              </ul> */}
                            </div>
                            <div className="flex  px-8 justify-between">
                            <button 
                                aria-label="Previous"
                                onClick={() => previous()}
                                className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                hover:bg-gray-100
                                bg-white  
                                duration-200 ease-in-out 
                                transition`}>
                                <div className="flex mx-auto text-blue-600 hover:text-blue-500 text-sm font-semibold my-auto leading-5">
                                    <div>Previous</div>
                                </div>
                                </button>
                                <button 
                                    aria-label="Continue"
                                   
                                onClick={() => next()}
                                    className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                    hover:bg-blue-600
                                    bg-blue-500  
                                    duration-200 ease-in-out 
                                    transition`}>
                                    <div className="flex mx-auto text-white text-sm font-semibold my-auto leading-5">
                                        <div>{'Next'}</div>
                                    </div>
                                    </button>
                                
                              </div>
                        </div>
                    )}
                />
                <Step
                    id="step2"
                    render={({ next, previous }) => (
                      <div className="md:w-[585px] w-full px-10 lg:px-0">
                      <div className="w-full p-8 text-center">
                      <img className="mx-auto w-64 h-56  object-cover  mb-6 rounded-lg" src="https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2022/04/header.jpeg?format=webp&amp;w=1400" alt="Internationalisation and Localisation concept illustration, showing little cursor arrows on a screen"/>
                                <div><h1 className="text-2xl text-gray-900 font-bold font-noto-serif mb-3 ">Built for Global Audiences</h1></div>
                                <p className="text-gray-600 mt-3">Reach a global audience – the new Prototypr platform is built to reach and support people of different abilities and cultures.</p>
                                <p className="text-gray-600 mt-3">With a huge portion of design articles tailored to English and Western culture, <a className="underline text-blue-600" target="_blank" href="https://open.prototypr.io/i18n">internationalisation</a> is now built into the core of Prototypr, and we're actively improving accessibility of the platform, so that nobody's left out.</p>
                            </div>
                            <div className="flex  px-8 justify-between">
                            <button 
                                aria-label="Previous"
                                type="submit"
                                onClick={() => previous()}
                                className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                hover:bg-gray-100
                                bg-white  
                                duration-200 ease-in-out 
                                transition`}>
                                <div className="flex mx-auto text-blue-600 hover:text-blue-500 text-sm font-semibold my-auto leading-5">
                                    <div>Previous</div>
                                </div>
                                </button>
                                <button 
                                    aria-label="Continue"
                                    onClick={() => next()}
                                    className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                    hover:bg-blue-600
                                    bg-blue-500  
                                    duration-200 ease-in-out 
                                    transition`}>
                                    <div className="flex mx-auto text-white text-sm font-semibold my-auto leading-5">
                                        <div>{'Next'}</div>
                                    </div>
                                    </button>
                              </div>
                        </div>
                    )}
                />
                <Step
                    id="step4"
                    render={({ next, previous }) => (
                      <div className="md:w-[585px] w-full px-10 lg:px-0">

                      <div className="w-full p-8 text-center">
                                              <img className="mx-auto w-64 h-56  object-cover  mb-6 rounded-lg" src="https://prototyprio.gumlet.io/wp-content/uploads/2022/03/image1.jpg?format=webp&w=1400" alt="Illustration of a cartoon person holding a book, surrounded by spooky hands"/>
                                <div><h1 className="text-2xl text-gray-900 font-bold font-noto-serif mb-3 ">Contribute to Open Source</h1></div>
                                <p className="text-gray-600 mt-3">The code for the Prototypr platform will be published under MIT Open License for anyone to remix, learn from, and copy. Whether you're a designer, developer, writer, or anything else, feel free to get in touch if you're interested in contributing to the platform.</p>
                                {/* <ul className="list-disc pl-8 text-gray-600 mt-3">
                                <li className="my-2"><span className="font-semibold">Accessible and Inclusive</span>: No more paywalls. Built for people of different abilities, and <a className="underline text-blue-600" target="_blank" href="https://open.prototypr.io/i18n">internationalised</a> for people of different backgrounds.</li>
                                <li className="my-2"><span className="font-semibold">Reward and Reach</span>: Join a network to distribute your work, and make earnings based on the time people engage with it.</li>
                                <li className="my-2"><span className="font-semibold">Open Source</span>: The code for the Prototypr platform will be published under MIT Open License for anyone to remix, learn from, and copy.</li>
                              </ul> */}
                            </div>
                            <div className="flex  px-8 justify-between">
                            <button 
                                aria-label="Previous"
                                type="submit"
                                onClick={() => previous()}
                                className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                hover:bg-gray-100
                                bg-white  
                                duration-200 ease-in-out 
                                transition`}>
                                <div className="flex mx-auto text-blue-600 hover:text-blue-500 text-sm font-semibold my-auto leading-5">
                                    <div>Previous</div>
                                </div>
                                </button>
                                <button 
                                    aria-label="Continue"
                                    
                                onClick={() => next()}
                                    className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                    hover:bg-blue-600
                                    bg-blue-500  
                                    duration-200 ease-in-out 
                                    transition`}>
                                    <div className="flex mx-auto text-white text-sm font-semibold my-auto leading-5">
                                        <div>{'Next'}</div>
                                    </div>
                                    </button>
                              
                              </div>
                        </div>
                    )}
                />
                <Step
                    id="step5"
                    render={({ previous }) => (
                      <div className="md:w-[585px] w-full px-10 lg:px-0">

                            <div><h1 className="text-2xl font-noto-serif text-gray-900 font-bold mb-3">Sound good? Get involved!</h1></div>
                            <p className="text-gray-600 mb-3">
                            We believe in an open, inclusive web where information is accessible and unburdened by paywalls or subscription fees, whilst still rewarding authors.
                            </p>
                            <p className="text-gray-600 mb-3">
                              When you publish on Prototypr, you'll be eligible to earn tips and streamed payments based on viewing time. Just fill in the payment pointer <img className="w-6 inline" src="https://webmonetization.org/img/wm-icon-animated.svg"/> field on your profile page.
                            </p>
                            <p className="text-gray-700 mt-3 mb-6">We're in early, but as Web Monetisation grows, you’ll be at the forefront of our platform and contributing to an open web.</p>
                            {/* <a target="_blank" href="https://twitter.com/graeme_fulton" className="rounded-lg text-xs leading-tight cursor-pointer mb-6">
                                <div className="avatar size-small gutter-none">
                                    <span>
                                        <img alt="graeme" width="60" className="rounded-full avatar-image" src="https://secure.gravatar.com/avatar/2420c3071c2497feb6193ad7ed0603e5?size=200&amp;default=http%3A%2F%2Fwww.gravatar.com%2Favatar%2F%3Fd%3Didenticon" title="graeme" />
                                    </span>
                                </div>
                            </a>
                            <p className="text-gray-700 mb-6 mt-2 text-sm"><a target="_blank" href="https://twitter.com/graeme_fulton">Graeme, founder of Prototypr.</a></p> */}

                            <div className="flex mx-auto items-left justify-start ">
                            <a href="/account">
                                <button 
                                    aria-label="Set up profile"                                    
                                    className={`text-base px-4 z-10 py-3 mb-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                    hover:bg-blue-600
                                    bg-blue-500  
                                    duration-200 ease-in-out 
                                    transition`}>
                                    <div className="flex mx-auto text-white font-semibold my-auto leading-5">
                                        <div>{'Set up profile'}</div>
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
                                transition`}>
                                <div className="flex mx-auto text-blue-600 hover:text-blue-500 font-semibold my-auto leading-5">
                                    <div>Go back</div>
                                </div>
                                </button>
                            </div>
                        </div>
                    )}
                />
            </Steps>
           <div className={`${step.id=='step1' || step.id=='step5' ?'opacity-0':''} flex flex-col align-center items-center mx-auto px-3 justify-center -mt-5`} style={{maxWidth:'250px'}}>
                {/* <p className="text-xs text-blue-700 mb-2">{steps.indexOf(step) + 1} of {steps.length}</p> */}
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
