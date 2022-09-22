import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import BulletList from "@tiptap/extension-bullet-list";

import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import { ImageIcon, BoldIcon, ItalicIcon, CodeIcon, ListIcon } from "./icons";
import Spinner from "../atom/Spinner/Spinner";
import toast from "react-hot-toast";
import SubmitPostModal from "../modal/submitPost";
const qs = require("qs");

var axios = require("axios");
var slugify = require("slugify");

const CustomDocument = Document.extend({
  content: "heading block*",
  atom: true,
});

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

function generateImageTypes(url) {
  const breakpoints = [
    { w: 300, h: 131 },
    { w: 768, h: 336 },
    { w: 1024, h: 448 },
    { w: 1400, h: 600 },
  ];
  const splitString = url?.split(".");
  const extention = splitString[splitString.length - 1];
  const mediaURL = splitString.slice(0, -1).join(".");

  const urls = breakpoints.map(
    (breakpoint) =>
      `${mediaURL}-${breakpoint?.w}x${breakpoint?.h}.${extention} ${breakpoint.w}w`
  );
  return urls.join(",");
}

function getImageExtention(url) {
  const splitString = url.split(".");
  const extention = splitString[splitString.length - 1];

  return extention;
}

const MenuActions = {
  bold: {
    label: "bold",
    action: (editor) => editor.chain().focus().toggleBold().run(),
    icon: <BoldIcon size={16} />,
  },
  italic: {
    label: "italic",
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    icon: <ItalicIcon size={16} />,
  },
  code: {
    label: "code",
    action: (editor) => editor.chain().focus().toggleCode().run(),
    icon: <CodeIcon size={16} />,
  },
  bulletList: {
    label: "bulletList",
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    icon: <ListIcon size={16} />,
  },
  image: {
    label: "image",
    type: "file",
    icon: <ImageIcon size={16} />,
    action: (event, editor, user, setLoading) => {
      const files = event.target.files;
      if (files && files[0]) {
        var reader = new FileReader();

        reader.onload = async (e) => {
          setLoading(true);
          const url = e.target.result;

          const resp = await fetch(url);
          const blob = await resp.blob();

          const file = new File([blob], `${files[0].name || "image.png"}`, {
            type: "image/png",
          });

          const data = new FormData();
          data.append("files", file);

          var configUpload = {
            method: "post",
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/article/image/upload`,
            headers: {
              Authorization: `Bearer ${user?.jwt}`,
            },
            data: data,
          };

          await axios(configUpload)
            .then(async function (response) {
              setLoading(false);
              toast.success("Image Uploaded!", {
                duration: 5000,
              });
              const url = response?.data?.url;
              editor.chain().focus().setImage({ src: url }).run();
            })
            .catch(function (error) {
              console.log(error);
              setTimeout(() => {}, 300);
            });
        };
        reader.readAsDataURL(files[0]);
      }
    },
  },
};

const MenuBar = ({ editor }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser({
    redirectIfFound: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-row gap-5">
      <div className="flex flex-row gap-2">
        {Object.values(MenuActions).map((obj) => {
          return (
            <>
              {obj?.type === "file" ? (
                <>
                  <label
                    for="img-upload"
                    class="custom-file-upload"
                    className="w-6 h-6 grid place-items-center text-sm border cursor-pointer hover:shadow-sm rounded"
                  >
                    {obj.icon}
                  </label>
                  <input
                    type="file"
                    id="img-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      obj.action(event, editor, user, setLoading)
                    }
                  />
                </>
              ) : (
                <button
                  onClick={() => {
                    obj.action(editor);
                  }}
                  className={`w-6 h-6 grid place-items-center rounded text-sm border hover:shadow-sm ${
                    editor.isActive(obj.label)
                      ? "is-active bg-black text-white"
                      : ""
                  }`}
                >
                  {obj.icon}
                </button>
              )}
            </>
          );
        })}
      </div>
      <div>
        {loading && (
          <div className="flex flex-row gap-1 justify-center items-center">
            <Spinner size={"sm"} />
            <p className="text-sm">Uploading Image...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Tiptap = ({ content, editorType = "create" }) => {
  const { user } = useUser({
    redirectIfFound: false,
  });
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Whats the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      // send the content to an API here
      localStorage.setItem("wipContent", JSON.stringify(json));
    },
  });

  // load from local storage if anything exists
  useEffect(() => {
    if (editorType === "edit") {
      console.log("loading from backend");
      if (editor && !editor.isDestroyed) {
        if (editor?.commands) {
          editor?.commands?.setContent(content);
        }
      }
    } else {
      console.log("loading from local");

      let retrievedObject = localStorage.getItem("wipContent");
      if (retrievedObject && editor && !editor.isDestroyed) {
        if (editor?.commands) {
          editor?.commands?.setContent(JSON.parse(retrievedObject));
        }
      }
    }
  }, [editor]);

  const getPostDetails = () => {
    const html = editor.getHTML();
    const json = editor.getJSON()?.content;

    const title = json[0]?.content[0]?.text;
    // append an id at the end of the slug
    const postSlug = slugify(title.toLocaleLowerCase()) + `-${uid()}`;
    const firstParagraph = json.find((p) => p?.type === "paragraph").content[0]
      .text;
    const coverImage = json.find((p) => p?.type === "image")?.attrs?.src;

    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: postSlug,
          },
        },
        populate: "*",
        fields: ["slug"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    let findPostEndpointConfigs = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${query}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    };

    let entry = {
      excerpt: firstParagraph,
      featured: false,
      type: "article",
      legacyFeaturedImage: {},
      date: new Date(),
      status: "draft",
      title: title,
      content: html,
      user: user?.id,
      //   featuredImage: coverImage,
      legacyFeaturedImage: {
        mediaItemUrl: coverImage || "",
        srcSet: generateImageTypes(coverImage || ""),
        thumb: `${coverImage}-150x150.${getImageExtention(coverImage || "")}`,
        medium: `${coverImage}-768x336.${getImageExtention(coverImage || "")}`,
      },
      seo: {
        opengraphTitle: title,
        metaDesc: firstParagraph,
        opengraphDescription: firstParagraph,
        opengraphImage: coverImage,
        opengraphPublishedTime: new Date(),
        //  schemaSeo: item.seo.schema.raw,
      },
      esES: false,
      slug: postSlug,
    };
    return {
      entry,
      findPostEndpointConfigs,
    };
  };

  const createNewPost = async () => {
    const { entry, findPostEndpointConfigs } = getPostDetails();

    let publishPostEndpointConfig = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },

      data: {
        data: {
          ...entry,
        },
      },
    };

    try {
      const existsResult = await axios(findPostEndpointConfigs);
      const exists = existsResult?.data?.data?.length > 0;
      if (!exists) {
        await axios(publishPostEndpointConfig)
          .then(async function (response) {
            toast.success("Your post has been submitted!", {
              duration: 5000,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        toast.error("You've already submitted this post!", {
          duration: 5000,
        });
      }
    } catch {
      (e) => console.log(e);
    }
  };

  const updateExisitingPost = async () => {
    console.log("Update post");
    const { entry, findPostEndpointConfigs } = getPostDetails();

    let publishPostEndpointConfig = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/{id}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },

      data: {
        data: {
          ...entry,
        },
      },
    };

    try {
      const existsResult = await axios(findPostEndpointConfigs);
      const exists = existsResult?.data?.data?.length > 0;
      if (exists) {
        const postId = existsResult.data.data[0].id;
        publishPostEndpointConfig.url = publishPostEndpointConfig.url.replace(
          "{id}",
          postId
        );

        console.log(publishPostEndpointConfig.url);
        await axios(publishPostEndpointConfig)
          .then(async function (response) {
            toast.success("Your draft has been updated!", {
              duration: 5000,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch {
      (e) => console.log(e);
    }
  };

  const onSubmit = async () => {
    // before submitting, check strapi if slug or id already exists
    // if it exists, then do an update, else create a new one
    if (editorType === "create") {
      createNewPost();
    }

    if (editorType === "edit") {
      updateExisitingPost();
    }
  };

  return (
    <div className="w-full relative my-4">
      <div className="flex">
        <span className="p-2 py-1 text-xs bg-green-400 bg-opacity-20 text-green-500 rounded-full border border-green-500">
          Beta
        </span>
      </div>
      <div className="flex z-50 sticky top-0 bg-white">
        <aside className="w-full p-2 py-4 border-b   flex flex-row justify-center items-center">
          <MenuBar editor={editor} />
          <div className="flex flex-row justify-end">
            <SubmitPostModal>
              <div className="p-10">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl my-0">
                      Are you sure you want to publish this post?
                    </h1>
                    <p className="text-sm leading-7 my-0">
                      Feel free to make any changes. You can always edit the
                      post later. After you submit your draft, our editors will
                      look through it to ensure it aligns with our guidelines.
                      Once that's done, we will approve your draft and it will
                      be published on Prototypr. We will email you when it's
                      live.
                    </p>
                  </div>
                  <div className="p-4">
                    <img src="/static/images/source-bg.png" />
                  </div>
                  <button
                    onClick={onSubmit}
                    className="px-3 py-3 bg-blue-700 rounded text-sm text-white "
                  >
                    Submit Draft
                  </button>
                </div>
              </div>
            </SubmitPostModal>
          </div>
        </aside>
      </div>

      <div className="my-4">
        <EditorContent editor={editor} />
        <div className="popup-modal mb-6 relative bg-white p-6 pt-3 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default Tiptap;

// https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/03/163qAUWd38bmqf7dltvmopQ.png
// https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/03/163qAUWd38bmqf7dltvmopQ-300x131.png 300w,
// https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/03/163qAUWd38bmqf7dltvmopQ-1024x448.png 1024w,
// https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/03/163qAUWd38bmqf7dltvmopQ-768x336.png 768w,
// https://prototypr-media.sfo2.digitaloceanspaces.com/wp-content/uploads/2021/03/163qAUWd38bmqf7dltvmopQ.png 1400w
