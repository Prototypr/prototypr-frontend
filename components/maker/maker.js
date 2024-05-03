import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import GitHubButton from "react-github-btn";
import { set, get } from "js-cookie";
import Image from "next/image";
import gumletLoader from "@/lib/imageloader";

const MakerPopover = () => {
  const [open, setOpen] = useState(false);
  const handleMouseEnter = () => {
    setTimeout(() => {
      setOpen(true);
    }, [250]);
  };

  const [userClosed, setUserClosed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [justClosed, setJustClosed] = useState(false);
  const [closed, setClosed] = useState(false);
  // Define the scrollListener inside useEffect or use useCallback
  useEffect(() => {
    // Check if the user has already closed the sticky footer
    const closed = get("closed-face") === "true";

    if (!userClosed) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    if (!closed) {
      setVisible(true);
    } else {
      setUserClosed(true);
      setVisible(false);
    }
  }, [userClosed]); // Re-attach the event listener if userClosed changes

  const hide = () => {
    if (
      confirm("Are you you want to get rid of my little face from the site?")
    ) {
      setJustClosed(true);

      setTimeout(() => {
        setClosed(true);
      }, 1000);

      setTimeout(() => {
        setOpen(false);
        setVisible(false);
        set("closed-face", "true", { expires: 365 }); // Set a cookie to remember the user's choice, assuming a 1-year expiration
        setUserClosed(true);
        setJustClosed(false);
      }, 2000);
    }
  };

  return (
    <div className={`${!visible ? "h-0 hidden w-0 overflow-hidden" : ""}`}>
      <Popover.Root open={open}>
        <Popover.Trigger
          onMouseEnter={handleMouseEnter}
          onClick={() => setOpen(true)}
          asChild
        >
          <div
            id="supportavatar"
            className={`transition transition-all duration-1000 ${justClosed && !closed ? "right-[190px] bottom-[140px]" : closed ? "-right-[25vw]" : "right-0"} fixed z-[99] bottom-0 flex m-3`}
          >
            <a
              className="cursor-pointer inline-block"
              rel="nofollow"
              target="_blank"
              // href={`${author.url ? author.url : "#"}`}
            >
              <div
                className={`shadow-sm group ${open ? "scale-[1.5] " : ""} transition transition-all duration-700 w-[44px] h-[44px] md:w-[54px] md:h-[54px] relative border border-gray-400/30 bg-white capitalize text-gray-100 text-xs p-[2px] rounded-full inline-block flex`}
              >
                <div
                  className={`${justClosed ? "scale-[10] " : ""} transition transition-all duration-1000 w-full h-full rounded-full  overflow-hidden`}
                >
                  <Image
                    // priority={true}
                    loader={gumletLoader}
                    width={36}
                    height={36}
                    className={`${justClosed ? "animate-spin" : "group-hover:scale-125"} ${open && !justClosed ? "scale-[1.5]" : ""} object-cover w-full h-full transition transition-all duration-700 rounded-full`}
                    src={"/static/avatars/ah.png"}
                  />
                </div>
                <div
                  className={`absolute transition transition-all duration-700 ${(open || closed || justClosed) ? "scale-0" : ""} -right-[1px] bottom-[1px] text-[15px] drop-shadow-md"`}
                >
                  👋
                </div>
                {/* <div className="my-auto text-indigo-900 text-sm ml-2 pr-2">
              By Graeme
            </div> */}
              </div>
            </a>
          </div>
          {/* <button
        className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
        aria-label="Update dimensions"
      >
        <MixerHorizontalIcon />
      </button> */}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            onPointerDownOutside={e => {
              if (!e.target?.className?.includes("group")) {
                setOpen(false);
              }
            }}
            onFocusOutside={() => setOpen(false)}
            className={`${justClosed ? "hidden" : ""} z-[99] rounded p-5 w-[400px] max-w-[90vw] mr-3 md:mr-10 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade`}
            sideOffset={5}
          >
            <div className="flex flex-col gap-2.5">
              <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                <span className="text-[18px]">👋</span> Hello, welcome to
                Prototypr
              </p>
              <div className="flex gap-5 items-center">
                <div className="text-[13px]" htmlFor="width">
                  <p>
                    I'm Graeme and I've just built the new version of this site!
                    I'm busy writing up what's new – it'll take a week or so. In
                    the meantime:
                    <ul className="space-y-4 list-disc mt-3 mb-4 list-inside pl-4">
                      <li>
                        ⭐ Star it on GitHub - my work on this is Open Source, a
                        star means the world!
                        <br />
                        <div className="mt-2">
                          <GitHubButton
                            href="https://github.com/Prototypr/prototypr-frontend"
                            data-color-scheme="no-preference: light; light: light; dark: dark;"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star buttons/github-buttons on GitHub"
                          >
                            Star
                          </GitHubButton>
                        </div>
                      </li>
                      <li>
                        📬 Get an invite – if you'd like to make posts on here,
                        drop me a DM. We're invite only to keep out spam.
                      </li>
                      <li>
                        💎 Get the newsletter - I'm sharing insights on creating
                        this site, and new articles and resources!
                      </li>
                    </ul>
                  </p>
                  <p>
                    If I can help on anything else..career stuff or things like
                    sponsoring, contact me{" "}
                    <a
                      target="_blank"
                      className="font-medium font-black/90 underline"
                      href="https://x.com/@graeme_fulton"
                    >
                      @graeme_fulton
                    </a>{" "}
                    on X.
                  </p>
                  <p
                    onClick={hide}
                    className="text-gray-500 text-[11px] font-medium mt-2 text-right hover:underline hover:text-gray-900 cursor-pointer"
                  >
                    Banish me
                  </p>
                </div>
              </div>
            </div>
            <Popover.Close
              onClick={() => setOpen(false)}
              className="rounded-full cursor-pointer h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
              aria-label="Close"
            >
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default MakerPopover;
