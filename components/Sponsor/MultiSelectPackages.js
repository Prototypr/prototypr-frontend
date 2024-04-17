import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
export const EnvelopeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    className={className}
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
  </svg>
);
export const BrowserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    className={className}
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Zm0,144H40V104H216v96Z"></path>
  </svg>
);

const MultiSelectPackages = ({ packages, selectedPackages, productId }) => {
  const router = useRouter();

  
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="flex w-full rounded-xl border border-gray-400 min-h-10 h-auto items-center justify-between bg-inherit hover:bg-card"
          aria-label="Update dimensions"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-wrap items-center">
              <div className="p-2">
                {/* {IconComponent && <IconComponent className="h-4 w-4 mr-2" />} */}
                {selectedPackages.length ? ( // if there are selected packages
                  <>
                    {/* <MixerHorizontalIcon className="h-4 w-4 mr-2" /> */}
                    <div className="flex flex-wrap gap-1">
                      {selectedPackages.map((value, index) => {
                        const product = packages.find(
                          product => product.uid === value
                        );
                        if (product) {
                          return (
                            <div
                              key={index}
                              className="bg-gray-100 flex text-black/80 border border-gray-300/50 rounded-lg px-2 py-1.5 text-sm font-medium"
                            >
                              {product.type === "newsletter" ? (
                                <EnvelopeIcon className="w-4 h-4 my-auto mr-1" />
                              ) : (
                                <BrowserIcon className="w-4 h-4 my-auto mr-1" />
                              )}
                              {product.title}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">Select packages</div>
                )}
              </div>
            </div>
          </div>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-3 w-[320px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-1">
            <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2">
              Newsletter Sponsorship
            </p>
            {packages?.length
              ? packages.map(product => {
                  if (product.type === "newsletter") {
                    return (
                      <div
                        onClick={() => {
                          let packages = router.query.packages?.split(
                            "," || []
                          );
                          if (packages.includes(product.uid)) {
                            let newPackages = packages.filter(
                              selectedPackage => selectedPackage !== product.uid
                            );
                            router.push(
                              {
                                pathname: productId
                                  ? `/sponsor/booking/${productId}/edit`
                                  : "/sponsor/booking",
                                query: {
                                  packages: newPackages
                                    ? newPackages.join(",")
                                    : "",
                                  // ...rest,
                                },
                              },
                              undefined,
                              { shallow: true }
                            );
                          } else {
                            let newPackages = [...packages, product.uid];
                            router.push(
                              {
                                pathname: productId
                                  ? `/sponsor/booking/${productId}/edit`
                                  : "/sponsor/booking",
                                query: {
                                  packages: newPackages
                                    ? newPackages.join(",")
                                    : "",
                                },
                              },
                              undefined,
                              { shallow: true }
                            );
                          }
                        }}
                        key={product.uid}
                        className={` ${selectedPackages.includes(product.uid) ? "bg-blue-100 text-black/90" : "hover:bg-gray-100"} relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`}
                      >
                        <div className="mr-1 rounded w-4 h-4 text-blue-600 flex flex-col justify-center">
                          {selectedPackages.includes(product.uid) ? (
                            <CheckIcon />
                          ) : (
                            ""
                          )}
                        </div>
                        <EnvelopeIcon className="w-4 h-4 mr-1" />

                        {product.title}
                      </div>
                    );
                  }
                })
              : null}

            <p className="text-mauve12 text-[15px] leading-[19px] font-medium mt-2 mb-2">
              Website Sponsorship
            </p>
            {packages?.length
              ? packages.map(product => {
                  if (product.type === "website") {
                    return (
                      <div
                        onClick={() => {
                          let packages = router.query.packages?.split(
                            "," || []
                          );
                          if (packages.includes(product.uid)) {
                            let newPackages = packages.filter(
                              selectedPackage => selectedPackage !== product.uid
                            );
                            router.push(
                              {
                                pathname: productId
                                  ? `/sponsor/booking/${productId}/edit`
                                  : "/sponsor/booking",
                                query: {
                                  packages: newPackages
                                    ? newPackages.join(",")
                                    : "",
                                  // ...rest,
                                },
                              },
                              undefined,
                              { shallow: true }
                            );
                          } else {
                            let newPackages = [...packages, product.uid];
                            router.push(
                              {
                                pathname: productId
                                  ? `/sponsor/booking/${productId}/edit`
                                  : "/sponsor/booking",
                                query: {
                                  packages: newPackages
                                    ? newPackages.join(",")
                                    : "",
                                },
                              },
                              undefined,
                              { shallow: true }
                            );
                          }
                        }}
                        key={product.uid}
                        className={`${selectedPackages.includes(product.uid) ? "bg-blue-100" : "hover:bg-gray-100"} relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`}
                      >
                        <div className="mr-1 rounded w-4 h-4 text-blue-600 flex flex-col justify-center">
                          {selectedPackages.includes(product.uid) ? (
                            <CheckIcon />
                          ) : (
                            ""
                          )}
                        </div>
                        <BrowserIcon className="w-4 h-4 mr-1" />

                        {product.title}
                      </div>
                    );
                  }
                })
              : null}
          </div>
          {/* <Popover.Close
          className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
          aria-label="Close"
        >
          <Cross2Icon />
        </Popover.Close> */}
          {/* <Popover.Arrow className="fill-white" /> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MultiSelectPackages;
