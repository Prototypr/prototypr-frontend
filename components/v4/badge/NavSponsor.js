import Image from "next/image";

const NavSponsor = () =>{

    return(
        <div className="p-3 my-auto">
        <a href="https://letter.so?ref=prototypr?utm=nav" target="_blank">
        <div
              className={`relative w-28 h-8 overflow-hidden border-l border-gray-300`}
            >
              <Image
                className="object-contain"
                layout="fill"
                src={`/static/images/letter-nav.svg`}
              />
            </div>
          {/* <div className="flex bg-gray-100 backdrop-blur-sm bg-opacity-90 rounded-3xl p-0.5">
            <div
              className={`relative w-9 h-9 overflow-hidden rounded-full border border-gray-100`}
            >
              <Image
                className="object-cover"
                layout="fill"
                src={`/static/images/letter-nav.svg`}
              />
            </div>
            <div className="pl-1 my-auto text-xs font-medium pr-3 text-gray-500">
              Supported <br /> by Letter
            </div>
          </div> */}
        </a>
      </div>
    )
}
export default NavSponsor