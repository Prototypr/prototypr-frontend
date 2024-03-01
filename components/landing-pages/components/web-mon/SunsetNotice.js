import Container from "@/components/container"

const SunsetNotice = () =>{
    return(
        <div className="w-full flex justify-center relative ">
        <div className="fixed bottom-0 w-full md:bottom-3 shadow-md overflow- border border-indigo-900/10 bg-yellow-300 md:w-[80%] md:max-w-[1120px] md:rounded-2xl h-auto z-[100]">
              <img src={`/static/images/robo2.png`} className="w-[76px] md:w-[104px] drop-shadow-xl z-40 ml-4 md:ml-0 left-0 absolute bottom-0 -mb-[15px] md:-mb-[25px] -scale-x-100"/>
          <Container  maxWidth="max-w-[1320px] z-30 relative overflow-hidden">
              <div  className="absolute top-0 left-0 w-full h-full md:rounded-2xl -ml-0.5 -mt-0.5" />

            <div className="w-full z-10 relative px-1 py-3  flex flex-col gap-4 md:gap-3 md:flex-row justify-between">
              <div className="hidden md:flex flex-row justify-center items-center gap-4 md:gap-4">
                <div>
                </div>
                <div className="flex flex-col md:ml-[80px]">
                  <h1 className="text-xl font-semibold text-black/00">
                    This service currently unavailable
                  </h1>
                  <p className="text-lg text-black/80">
                    Coil was discontinued so this initiative is on hold. Learn more at <a href="https://interledger.org/?ref=prototypr" className="underline font-medium">Interledger</a>.
                  </p>
                </div>
              </div>
              {/* <div className="my-auto w-full md:w-[fit-content] md:block flex justify-center md:justify-end">
                    <Link className="w-[fit-content]" href="/onboard">
                        <Button className="mr-3 md:w-auto p-0 py-[0.05rem] px-[1rem] border-blue-800 text-blue-800" variant={"confirmRoundedGhost"}>
                            {buttonText?buttonText:`Log in`}
                        </Button>
                    </Link>
                  <Link className="w-[fit-content]" href="/onboard">
                      <Button className="py-1 md:w-auto p-0 py-[0.1rem] bg-blue-600 px-[1rem]" variant={"confirmRounded"}>
                          {buttonText?buttonText:`Sign up`}
                      </Button>
                  </Link>
              </div> */}
              {/* <button className="px-7 h-10 md:h-auto text-sm text-black shadow-sm py-0 rounded-full bg-white">
                Sign up
              </button> */}
            </div>
          </Container>
        </div>
      </div>
    )
}
export default SunsetNotice