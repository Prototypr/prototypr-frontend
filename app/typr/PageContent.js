"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  savePost,
  createPost,
  loadPostById,
  DB_NAME,
  STORE_NAME,
} from "@/lib/typr-demo/indexedDB"; // Import the IndexedDB utility


import "~/react-kofi/dist/kofi.css";
import "~/tiptypr/dist/styles.css";
import Tiptypr from "tiptypr";
// import Head from 'next/head';

import {
  Cross2Icon,
  HamburgerMenuIcon,
  ChevronDownIcon,
  CubeIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "@radix-ui/react-icons";

import GitHubButton from "react-github-btn";
import ThemeSelector from "@/components/typr-demo/ThemeSelector";
import RequireLoginCheckbox from "@/components/typr-demo/RequireLoginCheckbox";
import EnablePublishingFlowCheckbox from "@/components/typr-demo/EnablePublishingFLowCheckbox";
import NavSettings from "@/components/typr-demo/NavSettings";
import DemoCodeDialog from "@/components/typr-demo/DemoCodeDialog";
import GeneralSettingsPanel from "@/components/typr-demo/GeneralSettingsPanel";
import SeoPanel from "@/components/typr-demo/SeoPanel";
import UserPopover from "@/components/typr-demo/UserPopover";
import Layout from "@/components/new-index/layoutForDemo";

import * as Accordion from "@radix-ui/react-accordion";

import { defaultProps } from "tiptypr";
import { customDeepMerge } from "@/lib/typr-demo/customDeepMerge";
import IndexedDBBrowser from "@/components/typr-demo/IndexedDBBrowser";
import { openDB } from "idb";
// import KoFiDialog from "@/components/ko-fi-button/KoFiDialog";
import {KoFiDialog} from "react-kofi";

const avatarOptions = [
  {
    name: "Avatartion",
    imgSrc:
      "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/32a56359cbe6a680ac1eb8eb659c46eb.png",
  },
  { name: "Pravatar", imgSrc: "https://i.pravatar.cc/300" },
  {
    name: "Pixel (xsgames)",
    imgSrc: "https://xsgames.co/randomusers/avatar.php?g=pixel",
  },
  {
    name: "UI Avatars",
    imgSrc: "https://ui-avatars.com/api/?background=random",
  },
  { name: "RoboHash", imgSrc: "https://robohash.org/random" },
  {
    name: "Female (xsgames)",
    imgSrc: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
  {
    name: "Male (xsgames)",
    imgSrc: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
];

const filterModifiedProps = (defaultProps, currentProps) => {
  const modifiedProps = {};
  for (const key in currentProps) {
    if (
      typeof currentProps[key] === "object" &&
      !Array.isArray(currentProps[key])
    ) {
      const nestedModifiedProps = filterModifiedProps(
        defaultProps[key] || {},
        currentProps[key]
      );
      if (Object.keys(nestedModifiedProps).length > 0) {
        modifiedProps[key] = nestedModifiedProps;
      }
    } else if (currentProps[key] !== defaultProps[key]) {
      modifiedProps[key] = currentProps[key];
    }
  }
  return modifiedProps;
};

const serializeComponents = components => {
  const replacer = (key, value) => {
    if (React.isValidElement(value)) {
      return `<${value.type.name || value.type.displayName || "Component"} />`;
    }
    if (typeof value === "function") {
      return true; // Replace functions with true
    }
    return value;
  };
  return JSON.stringify(components, replacer, 2);
};
function DemoPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
  
    const [postId, setPostId] = useState(-1);
  
    useEffect(() => {
      // Check if the router is ready
      if (pathname !== null) {
        const id = searchParams.get("id");
  
        if (id) {
          setPostId(id);
        } else {
          // create new post
          setPostId(false);
        }
      }
    }, [searchParams, pathname]);
  
    const [editorProps, setEditorProps] = useState(() => {
      return customDeepMerge(defaultProps, {
        requireLogin: true,
        enablePublishingFlow: true,
        theme: "blue",
        user: {
          id: 1,
          isLoggedIn: true,
          isAdmin: true,
        },
        components: {
          nav: {
            show: true,
            position: "sticky",
            userBadge: {
              avatarPlaceholder: avatarOptions[0].imgSrc,
            },
          },
        },
      });
    });
  
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);
  
    const [isDatabasePanelOpen, setIsDatabasePanelOpen] = useState(true);
  
    useEffect(() => {
      if (openAccordion) {
        setIsDatabasePanelOpen(false);
      }
    }, [openAccordion]);
  
    const handleSeoMenuChange = newSeoMenu => {
      setEditorProps(prevProps => ({
        ...prevProps,
        components: {
          ...prevProps.components,
          settingsPanel: {
            ...prevProps.components.settingsPanel,
            seoTab: {
              ...prevProps.components.settingsPanel.seoTab,
              menu: newSeoMenu,
            },
          },
        },
      }));
    };
    const handleGeneralMenuChange = newGeneralMenu => {
      setEditorProps(prevProps => ({
        ...prevProps,
        components: {
          ...prevProps.components,
          settingsPanel: {
            ...prevProps.components.settingsPanel,
            generalTab: {
              ...prevProps.components.settingsPanel.generalTab,
              menu: newGeneralMenu,
            },
          },
        },
      }));
    };
  
    const themeOptions = [
      { value: "gray", label: "Gray" },
      { value: "blue", label: "Blue" },
    ];
  
    const handleThemeChange = value => {
      setEditorProps({ ...editorProps, theme: value });
    };
  
    const handleRequireLoginChange = checked => {
      setEditorProps({ ...editorProps, requireLogin: checked });
    };
  
    const handleEnablePublishingFlowChange = checked => {
      setEditorProps({ ...editorProps, enablePublishingFlow: checked });
    };
  
    // const handleCustomPostStatusesChange = checked => {
    //   setEditorProps({ ...editorProps, customPostStatuses: checked });
    // };
  
    const handleNavChange = nav => {
      setEditorProps({
        ...editorProps,
        components: {
          ...editorProps.components,
          nav,
        },
      });
    };
  
    // const handleSettingsChange = (field, value) => {
    //   // Update the settings based on the field and value
    //   console.log(`${field} changed to:`, value);
    // };
  
    const handleUserChange = (field, value) => {
      setEditorProps(prevProps => ({
        ...prevProps,
        user: {
          ...prevProps.user,
          [field]: value,
        },
      }));
    };
  
    const modifiedProps = filterModifiedProps(defaultProps, editorProps);
  
    const demoCode = `
      <Tiptypr
        requireLogin={${editorProps.requireLogin}}
        components={${serializeComponents(modifiedProps.components)}}
        theme="${editorProps.theme}"
        user={${JSON.stringify(editorProps.user, null, 2)}}
        enablePublishingFlow={${editorProps.enablePublishingFlow}}
        customPostStatuses={${editorProps.customPostStatuses}}
        postId={${postId}} // Update to use postId state
        postOperations={{
          load: async function ({ postId }) {
            const postObject = await loadPostById(parseInt(postId, 10));
            console.log("loaded", postObject);
            return postObject;
          },
          save: async function ({ postId, entry }) {
            console.log("saving entry", entry);
            const postObject = await savePost(entry, parseInt(postId, 10));
            fetchData();
            return postObject;
          },
          create: async function ({ entry }) {
            console.log("created post", entry);
            const postObject = await createPost(entry);
            fetchData();
            return postObject;
          },
        }}
        hooks={{
          onPostCreated: ({ id }) => {
            const params = new URLSearchParams(searchParams);
            params.set("id", id);
            router.push(\`?\${params.toString()}\`, undefined, {
              shallow: true,
              scroll: false,
            });
          },
        }}
      />
    `;
  
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      // const db = await openDB(DB_NAME, 1);
      const db = await openDB(DB_NAME);
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const allData = await store.getAll();
      setData(allData);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <Layout sessionUser={false} background={"#fbfcff"}>
        <div className="flex md:gap-4 max-h-screen bg-white pt-[40px] md:pt-[48px] overflow-hidden">
          <button
            className="absolute bottom-0 left-0 m-2 rounded-full z-[9999] h-[44px] w-[44px] text-gray-500 bg-white flex items-center justify-center shadow-md border border-gray-300 lg:!hidden"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            {isPanelOpen ? (
              <Cross2Icon className="h-3 w-3" />
            ) : (
              <HamburgerMenuIcon className="h-3 w-3" />
            )}
          </button>
          <div
            className={`min-h-screen md:p-3 lg:!relative w-full flex-none md:w-[300px] 2xl:w-[340px] ${
              isPanelOpen
                ? "block w-full p-1 h-full z-[9991] absolute top-0 left-0"
                : "hidden"
            } lg:block`}
          >
            <div className="bg-white shadow-lg pb-[120px] border border-gray-300/70 relative overflow-hidden rounded-xl h-[calc(100vh-76px)]">
              <h3 className="text-lg tracing-tight font-semibold border-b border-gray-300 px-3 pt-4 py-3">
                Editor Config
              </h3>
  
              <Accordion.Root
                type="single"
                value={openAccordion}
                collapsible
                className={`overflow-y-auto h-full ${
                  openAccordion ? "pb-[180px]" : ""
                } flex flex-col`}
                id="accordion-root"
                onValueChange={tabName => {
                  setOpenAccordion(tabName);
                  if (tabName == "general-settings" || tabName == "seo-panel") {
                    const settingsMenuBtn =
                      document.getElementById("settings-menu-btn");
                    if (
                      settingsMenuBtn &&
                      !settingsMenuBtn.classList.contains("is-open")
                    ) {
                      settingsMenuBtn.click();
                      setTimeout(() => {
                        const generalTab = document.getElementById("general-tab");
                        if (generalTab) {
                          generalTab.click();
                        }
                      }, 1000); // 100ms delay to ensure the settings panel is open
                    }
                  }
                }}
              >
                <Accordion.Item
                  value="theme-selector"
                  className="border-b border-gray-300"
                >
                  <Accordion.Header className="data-[state=open]:bg-gray-100 data-[state=open]:border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                    <div className="w-full h-full">
                      <Accordion.Trigger className="data-[state=open]:bg-gray-100 bg-white hover:bg-gray-100 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between0 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between">
                        Editor Settings
                        <ChevronDownIcon
                          className={`transition-transform duration-300 ${
                            openAccordion === "theme-selector" ? "rotate-180" : ""
                          }`}
                        />
                      </Accordion.Trigger>
                    </div>
                  </Accordion.Header>
                  <Accordion.Content className="p-4">
                    <div className="flex flex-col gap-4">
                      <EnablePublishingFlowCheckbox
                        enablePublishingFlow={editorProps.enablePublishingFlow}
                        onEnablePublishingFlowChange={
                          handleEnablePublishingFlowChange
                        }
                      />
                      <RequireLoginCheckbox
                        requireLogin={editorProps.requireLogin}
                        onRequireLoginChange={handleRequireLoginChange}
                      />
                      <ThemeSelector
                        theme={editorProps.theme}
                        onThemeChange={handleThemeChange}
                        themeOptions={themeOptions}
                      />
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item
                  value="nav-settings"
                  className="border-b border-gray-300"
                >
                  <Accordion.Header className="data-[state=open]:bg-gray-100 data-[state=open]:border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                    <div className="w-full h-full">
                      <Accordion.Trigger className="data-[state=open]:bg-gray-100 bg-white hover:bg-gray-100 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between0 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between">
                        Navbar Settings
                        <ChevronDownIcon
                          className={`transition-transform duration-300 ${
                            openAccordion === "nav-settings" ? "rotate-180" : ""
                          }`}
                        />
                      </Accordion.Trigger>
                    </div>
                  </Accordion.Header>
                  <Accordion.Content className="p-4">
                    <NavSettings
                      nav={editorProps.components.nav}
                      onNavChange={handleNavChange}
                      avatarOptions={avatarOptions}
                    />
                  </Accordion.Content>
                </Accordion.Item>
  
                <Accordion.Item
                  value="seo-panel"
                  className="border-b border-gray-300"
                >
                  <Accordion.Header className="data-[state=open]:bg-gray-100 data-[state=open]:border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                    <div className="w-full h-full">
                      <Accordion.Trigger className="data-[state=open]:bg-gray-100 bg-white hover:bg-gray-100 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between0 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between">
                        SEO Panel
                        <ChevronDownIcon
                          className={`transition-transform duration-300 ${
                            openAccordion === "seo-panel" ? "rotate-180" : ""
                          }`}
                        />
                      </Accordion.Trigger>
                    </div>
                  </Accordion.Header>
                  <Accordion.Content className="p-4">
                    <SeoPanel
                      theme={editorProps?.theme}
                      seoMenu={editorProps.components.settingsPanel.seoTab.menu}
                      onValueChange={handleSeoMenuChange}
                    />
                  </Accordion.Content>
                </Accordion.Item>
  
                <Accordion.Item
                  value="general-settings"
                  className="border-b border-gray-300"
                >
                  <Accordion.Header className="data-[state=open]:bg-gray-100 data-[state=open]:border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                    <div className="w-full h-full">
                      <Accordion.Trigger className="data-[state=open]:bg-gray-100 bg-white hover:bg-gray-100 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between0 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between">
                        General Panel
                        <ChevronDownIcon
                          className={`transition-transform duration-300 ${
                            openAccordion === "general-settings"
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </Accordion.Trigger>
                    </div>
                  </Accordion.Header>
                  <Accordion.Content className="p-4">
                    <GeneralSettingsPanel
                      theme={editorProps.theme}
                      generalMenu={
                        editorProps.components.settingsPanel.generalTab?.menu
                      }
                      onValueChange={handleGeneralMenuChange}
                    />
                  </Accordion.Content>
                </Accordion.Item>
  
                <div
                  className={` left-0 w-full ${
                    !isDatabasePanelOpen
                      ? "h-[50px] absolute bottom-[67px] hover:cursor-pointer"
                      : " bottom-0 flex flex-grow bg-slate-50 relative hover"
                  } `}
                >
                  <div
                    className={`${!isDatabasePanelOpen ? "hidden" : "w-full"}`}
                  >
                    <div
                      onClick={() => setIsDatabasePanelOpen(!isDatabasePanelOpen)}
                      className="flex bg-slate-100 border-b border-gray-300 p-4 py-3 justify-between w-full mb-3 cursor-pointer"
                    >
                      <div className="flex items-center ">
                        <CubeIcon className="mr-2" /> {/* Database icon */}
                        <h2 className="text-sm font-medium">
                          Database{" "}
                          <span className="text-xs pl-1 text-gray-500">
                            (local storage)
                          </span>
                        </h2>{" "}
                        {/* Text */}
                      </div>
                      <div className="cursor-pointer my-auto">
                        <EyeClosedIcon />
                      </div>
                    </div>
                    <IndexedDBBrowser
                      data={data}
                      reset={()=>{
                        setPostId(-1)
                      }}
                      onDelete={fetchData}
                      router={router}
                      searchParams={searchParams}
                    />
                  </div>
                  <div
                    className={`${
                      isDatabasePanelOpen ? "hidden" : ""
                    } bg-slate-100 border-t border-gray-300/70 h-full w-full relative hover:bg-gray-100 text-md font-medium w-full p-4 py-3 h-full text-left flex items-center justify-between`}
                    onClick={() => {
                      setOpenAccordion(false);
                      setIsDatabasePanelOpen(true);
                    }}
                  >
                    <div className="flex items-center">
                      <CubeIcon className="mr-2" /> {/* Database icon */}
                      <h2 className="text-sm font-medium">
                        Database{" "}
                        <span className="text-xs pl-1 text-gray-500">
                          (local storage)
                        </span>
                      </h2>{" "}
                      {/* Text */}
                    </div>
                    <div className="cursor-pointer my-auto">
                      <EyeOpenIcon />
                    </div>
                  </div>
                </div>
              </Accordion.Root>
  
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 shadow-md">
                <div className="flex flex-col flex-col-reverse gap-3">
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className={`w-full text-sm h-[34px] px-3 ${
                      editorProps?.theme == "blue"
                        ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                        : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
                    } text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg font-medium`}
                  >
                    Get Code
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:p-3 flex flex-col relative h-[calc(100vh-54px)]">
            <div className="bg-white md:rounded-xl border border-gray-300/60 flex-1 w-full overflow-y-auto max-w-[900px] mx-auto md:p-3 md:pr-1 md:pt-0">
              <Tiptypr
                requireLogin={editorProps.requireLogin}
                components={editorProps.components}
                theme={editorProps.theme}
                user={editorProps.user}
                enablePublishingFlow={editorProps.enablePublishingFlow}
                customPostStatuses={editorProps.customPostStatuses}
                postId={postId} // Update to use postId state
                postOperations={{
                  load: async function ({ postId }) {
                    const postObject = await loadPostById(parseInt(postId, 10));
                    console.log("loaded", postObject);
                    return postObject;
                  },
                  save: async function ({ postId, entry }) {
                    console.log("saving entry", entry);
                    const postObject = await savePost(
                      entry,
                      parseInt(postId, 10)
                    );
                    fetchData();
                    return postObject;
                  },
                  create: async function ({ entry }) {
                    console.log("creating post", entry);
                    const postObject = await createPost(entry);
                    fetchData();
                    return postObject;
                  },
                }}
                hooks={{
                  onPostCreated: ({ id }) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("id", id);
                    router.push(`?${params.toString()}`, undefined, {
                      shallow: true,
                      scroll: false,
                    });
                  },
                }}
              />
            </div>
          </div>
          <div className="hidden md:flex md:w-[200px] p-3 flex-none h-full flex-col gap-3">
            <div className="p-2 flex flex-col gap-2 bg-gray-50 rounded-lg shadow border border-gray-300/70">
              <h2 className="text-xs tracking-tight font-semibold">GitHub</h2>
              <GitHubButton
                href="https://github.com/prototypr/typr"
                data-color-scheme="no-preference: light; light: light; dark: dark;"
                data-size="large"
                data-show-count="true"
                aria-label="Star prototypr/typr on GitHub"
              >
                Star
              </GitHubButton>
              <GitHubButton
                href="https://github.com/sponsors/prototypr"
                data-color-scheme="no-preference: light; light: light; dark: dark;"
                data-icon="octicon-heart"
                data-size="large"
                aria-label="Sponsor @prototypr on GitHub"
              >
                Sponsor
              </GitHubButton>{" "}
            </div>
            <div className="p-2 flex flex-col gap-2 bg-gray-50 rounded-lg shadow border border-gray-300/70">
              <h2 className="text-xs tracking-tight font-semibold">About</h2>
              <p className="text-[12px] text-gray-600">
              Typr Editor is an open-source writing tool with ready-made user state management and publishing workflows.
              <br/>
                <a
                  target="_blank"
                  href="https://github.com/prototypr/typr"
                  className="text-gray-900 underline"
                >
                  Learn more 
                </a>{" "}→
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Made with 🧠 by{" "}
                <a
                  target="_blank"
                  href="https://x.com/graeme_fulton"
                  className="text-blue-500"
                >
                  Graeme
                </a>
              </p>
              <KoFiDialog color="#53b1e6" label={"Support me"}/>
            </div>
          </div>
          <DemoCodeDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            demoCode={demoCode}
            theme={editorProps.theme}
          />
          <UserPopover
            editorProps={editorProps}
            handleUserChange={handleUserChange}
          />
        </div>
        {/* <KofiWidget /> */}
      </Layout>
    );
  }
  
export default DemoPageContent;