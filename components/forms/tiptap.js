import { useEditor, EditorContent } from "@tiptap/react";
import MenuFloating from '../Editor/FloatingMenu'
// import { EditorContent, useEditor } from "@/components/Editor/BlockNote";

import Placeholder from "@tiptap/extension-placeholder";
// import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import TextMenu from '@/components/Editor/TextMenu'

import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
// import { MenuActions } from "@/components/atom/toolbar";

import toast from "react-hot-toast";
import SubmitPostModal from "../modal/submitPost";
import { saveAs } from "file-saver";

import Gapcursor from "@tiptap/extension-gapcursor";
import Youtube from "@tiptap/extension-youtube";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import CodeBlock from "@tiptap/extension-code-block";
import Bold from '@tiptap/extension-bold'
import HardBreak from '@tiptap/extension-hard-break'
import Underline from '@tiptap/extension-underline'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Dropcursor from '@tiptap/extension-dropcursor'
import History from "@tiptap/extension-history";
import {Blockquote} from "@/components/Editor/CustomExtensions/CustomBlockquote";
import Figure from "../Editor/CustomExtensions/Figure"
import Tweet from "../Editor/CustomExtensions/Tweet/Tweet"

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

const confirmationMessage = "You have unsaved changes. Continue?";

/**
 *
 * Change edit draft slug to an id.
 * Slug should be generated only when posts are published
 */

const useConfirmTabClose = (isUnsafeTabClose) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isUnsafeTabClose) {
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isUnsafeTabClose]);
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

const Tiptap = ({ content, editorType = "create", slug = undefined }) => {
  const { user } = useUser({
    redirectIfFound: false,
  });
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(undefined);

  useConfirmTabClose(hasUnsavedChanges);

  const editor = useEditor({
    extensions: [
      CustomDocument,
      Text,
      History,
      Paragraph,
      Heading,
      CodeBlock,
      HorizontalRule,
      Bold,
      HardBreak,
      Underline,
      Italic,
      ListItem,
      Gapcursor,
      BulletList,
      OrderedList,
      Dropcursor,
      Tweet,
      Youtube,
      Blockquote,
      Link.configure({
        openOnClick: false,
      }),
      Figure.configure({
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What's the title?";
          }
            return "Tell a story...";
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setHasUnsavedChanges(true);
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

    console.log(json);

    const title =
      json[0]?.content?.find((x) => x.type === "text")?.text || "Untitled post";
    const firstParagraph = json
      .find((p) => p?.type === "paragraph")
      ?.content?.find((x) => x.type === "text")?.text;
    const coverImage = json.find((p) => p?.type === "image")?.attrs?.src;
    // append an id at the end of the slug
    let postSlug;

    // when creating a new post, create a unique slug
    if (editorType === "create") {
      postSlug = slugify(title.toLocaleLowerCase()) + `-${uid()}`;
    } else {
      // in edit draft mode, use existing slug passed down from the parent component
      postSlug = slug;
    }

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
        console.log("exisits");
        console.log(publishPostEndpointConfig.url);
        await axios(publishPostEndpointConfig)
          .then(async function (response) {
            setSaving(false);
            setHasUnsavedChanges(false);
            toast.success("Your draft has been updated!", {
              duration: 5000,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setSaving(false);
        setHasUnsavedChanges(true);
        toast.error("Your draft could not be saved!", {
          duration: 5000,
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
      await createNewPost();
    }

    if (editorType === "edit") {
      await updateExisitingPost();
    }
  };

  const onSave = async () => {
    if (editorType === "edit") {
      setSaving(true);
      try {
        console.log("saving...");
        await updateExisitingPost();
      } catch (e) {
        setSaving(false);
      }
    }
  };

  const onExport = async () => {
    const json = editor.getJSON();
    const content = json.content;
    if (content) {
      let blob = new Blob([JSON.stringify({ content: content })], {
        type: "application/json",
      });
      const filename = slug ? `${slug}.json` : `${Date.now()}.json`;
      saveAs(blob, filename);
    }
  };

  const handleBeforeSubmit = async (open) => {
    // do all editor content checks here
    // check if post has a title
    // check if post has a description
    open();
  };

  return (
    <div className="w-full relative my-4">
      
      <div className="flex z-50 sticky top-0 bg-white">
        <aside className="w-full p-2 py-4 border-b flex flex-row justify-between items-center">
        <div className="flex">
            <span className="p-2 py-1 text-xs bg-green-400 bg-opacity-20 text-green-500 rounded-full border border-green-500">
              Beta
            </span>
          </div>
          <div className="flex flex-row justify-end gap-2">
            {editorType === "edit" && (
              <div>
                <button
                  onClick={onExport}
                  className="p-1 px-3 bg-yellow-400 rounded text-sm text-white"
                >
                  Export
                </button>
              </div>
            )}
            {editorType === "edit" && (
              <div>
                <button
                  onClick={onSave}
                  className="p-1 px-3 bg-green-400 rounded text-sm text-white"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
            <SubmitPostModal handleBeforeOpen={handleBeforeSubmit}>
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

      <div className="my-4 blog-content">
        {/* <div className="fixed bottom-10 left-5 z-10 flex flex-row gap-[2px]">
          <Spinner size={"sm"} />
          <span className="m-0 p-0">Saving</span>
        </div> */}
        {editor && 
       <MenuFloating editor={editor}/>}
        <TextMenu  editor={editor} />
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
