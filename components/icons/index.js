const defaultClass="w-5 h-5 my-auto text-gray-400"

export const LocationIcon = ({className=defaultClass})=><svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="currentColor"/></svg>
export const MoneyIcon = ({className=defaultClass})=><svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.5-6H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z" fill="currentColor"/></svg>
export const ClockIcon = ({className=defaultClass})=><svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z" fill="currentColor"/></svg>
export const CoinsIcon = ({className=defaultClass})=><svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-4 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 1v1h2v2H9a.5.5 0 0 0-.09.992L9 13h2a2.5 2.5 0 1 1 0 5v1H9v-1H7v-2h4a.5.5 0 0 0 .09-.992L11 15H9a2.5 2.5 0 1 1 0-5V9h2zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z" fill="currentColor"/></svg>

export const GoogleIcon = () =>{
    return(
        <svg

        className="h-[24px] w-[24px] my-auto"
        width={24}
        height={24}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 48 48"
          >
            <defs>
              {" "}
              <path
                id="prefix__a"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              />{" "}
            </defs>{" "}
            <clipPath id="prefix__b">
              {" "}
              <use xlinkHref="#prefix__a" overflow="visible" />{" "}
            </clipPath>{" "}
            <path
              clipPath="url(#prefix__b)"
              fill="#FBBC05"
              d="M0 37V11l17 13z"
            />{" "}
            <path
              clipPath="url(#prefix__b)"
              fill="#EA4335"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            />{" "}
            <path
              clipPath="url(#prefix__b)"
              fill="#34A853"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            />{" "}
            <path
              clipPath="url(#prefix__b)"
              fill="#4285F4"
              d="M48 48L17 24l-4-3 35-10z"
            />{" "}
          </svg>
    )
}

export const GitHubIcon = () =>{
    return(
        <svg

        className="h-[24px] w-[24px] my-auto"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 48 48"
      >
        <g data-name="Layer 2">
          <g fill="none" data-name="invisible box">
            <path d="M0 0H48V48H0z"></path>
            <path d="M0 0H48V48H0z"></path>
          </g>
          <path
            fill="#fff"
            d="M24 1.9a21.6 21.6 0 00-6.8 42.2c1 .2 1.8-.9 1.8-1.8v-2.9c-6 1.3-7.9-2.9-7.9-2.9a6.5 6.5 0 00-2.2-3.2c-2-1.4.1-1.3.1-1.3a4.3 4.3 0 013.3 2c1.7 2.9 5.5 2.6 6.7 2.1a5.4 5.4 0 01.5-2.9C12.7 32 9 28 9 22.6a10.7 10.7 0 012.9-7.6 6.2 6.2 0 01.3-6.4 8.9 8.9 0 016.4 2.9 15.1 15.1 0 015.4-.8 17.1 17.1 0 015.4.7 9 9 0 016.4-2.8 6.5 6.5 0 01.4 6.4 10.7 10.7 0 012.8 7.6c0 5.4-3.7 9.4-10.5 10.6a5.4 5.4 0 01.5 2.9v6.2a1.8 1.8 0 001.9 1.8A21.7 21.7 0 0024 1.9z"
            data-name="icons Q2"
          ></path>
        </g>
      </svg>
    )
}

export const EmailIcon = () =>{
    return(
        <svg
        xmlns="http://www.w3.org/2000/svg"
        // className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[24px] w-[24px] my-auto"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )
}


export const TicketIcon = ()=> {
  return (
    <svg
    className="h-[24px] w-[24px] my-auto"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
    >
      <path fill="currentColor" d="M227.19 104.48A16 16 0 00240 88.81V64a16 16 0 00-16-16H32a16 16 0 00-16 16v24.81a16 16 0 0012.81 15.67 24 24 0 010 47A16 16 0 0016 167.19V192a16 16 0 0016 16h192a16 16 0 0016-16v-24.81a16 16 0 00-12.81-15.67 24 24 0 010-47zM32 167.2a40 40 0 000-78.39V64h56v128H32zm192 0V192H104V64h120v24.8a40 40 0 000 78.39z"></path>
    </svg>
  );
}

export const LinkIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"></path>
    </svg>
  );
};