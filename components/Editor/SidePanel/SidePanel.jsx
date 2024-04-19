import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Portal } from "react-portal";
import useUser from "@/lib/iron-session/useUser";
import { Cross2Icon } from "@radix-ui/react-icons";
import ImageUploader from "./ImageUploader";

import { styled } from "@stitches/react";
import { slate, indigo } from "@radix-ui/colors";

import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Input = styled("input", {
  all: "unset",
  flex: "1 0 auto",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: slate.slate12,
  boxShadow: `0 0 0 1px ${slate.slate8}`,
  backgroundColor: indigo.indogo9,
  height: 35,
  "&:focus": { boxShadow: `0 0 0 2px ${slate.slate8}` },
});

const SidePanel = ({
  isOpen,
  close,
  editor,
  postObject,
  refetchPost,
  updatePostSettings,
}) => {
  const { user } = useUser({
    redirectIfFound: false,
  });

  const [rootElement] = useState(() => document.querySelector(`body`));

  return (
    <ContentImportSidebarInner
      isOpen={isOpen}
      postObject={postObject}
      close={close}
      isAdmin={user?.isAdmin}
      user={user}
      rootElement={rootElement}
      editor={editor}
      refetchPost={refetchPost}
      updatePostSettings={updatePostSettings}
    />
  );
};

export default React.memo(SidePanel);
// export default SidePanel

const ContentImportSidebarInner = ({
  isOpen,
  close,
  rootElement,
  editor,
  isAdmin,
  postObject,
  user,
  refetchPost,
  updatePostSettings,
}) => {
  const [postStatus, setPostStatus] = useState(postObject?.status);
  const [tier, setTier] = useState(postObject?.tier);
  const [timestamp, setTimestamp] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [slug, setSlug] = useState(postObject?.slug);

  const [saving, setSaving] = useState(false);

  const handleDateChange = input => {
    setTimestamp(input);
  };

  useEffect(() => {
    setPostStatus(postObject?.status);
    setTier(postObject?.tier);
    setSlug(postObject?.slug);

    if (postObject?.published_at) {
      let dateObj = new Date(postObject.published_at);
      if (dateObj) {
        setTimestamp(dateObj);
      }
    }
  }, [postObject]);

  useEffect(() => {
    if (postObject?.featuredImage) {
      setCoverImage(postObject?.featuredImage);
    } else {
      const json = editor.getJSON();
      if (!coverImage && json) {
        let content = json?.content;
        let cover = content?.find(p => p?.type === "figure")?.attrs?.src;
        setCoverImage(cover);
      }
    }
  }, [isOpen && editor]);

  const updatePost = async () => {
    setSaving(true);
    const settings = {};

    if (slug) {
      settings.slug = slug;
    }

    //only admin allowed (also filtered in the backend)
    if (user?.isAdmin) {
      if (timestamp) {
        settings.publishedAt = timestamp;
      } else {
        settings.publishedAt = null;
      }
      if (tier) {
        settings.tier = parseInt(tier);
      }
      if (postStatus) {
        settings.status = postStatus;
      }
    }

    // if settings object isn't empty
    if (Object.keys(settings).length > 0) {
      // handle the case when settings object has no properties
      const updated = await updatePostSettings({ settings });
      setSaving(false)
    }
  };

  return (
    <Portal node={rootElement}>
      <motion.div
        initial={"-380px"}
        animate={{
          x: isOpen ? "-400px" : "0px",
          transition: {
            type: "spring",
            damping: 25,
            velocity: 2,
            stiffness: 230,
          },
        }}
        style={{ width: "400px", right: "-405px", paddingRight: "0px" }}
        className="fixed z-[99] top-0"
      >
        <div
          className="h-screen flex flex-col pt-6 bg-white shadow-xl"
          style={{ willChange: "transform" }}
        >
          <div className="px-4 sm:px-6 flex justify-between">
            <div className="flex">
              <h2
                id="slide-over-heading"
                className="text-gray-900 text-lg font-semibold"
              >
                Story Settings
              </h2>
              <div className="flex items-center">
                <span className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full ml-2">
                  Beta
                </span>
              </div>
            </div>

            <div
              onClick={close}
              className="z-50 flex cursor-pointer opacity-75 hover:opacity-100 my-auto mr-2"
            >
              <Cross2Icon />
            </div>
          </div>
          <div className="mt-6 h-full relative">
            {/* Replace with your content */}
            <div className="inset-0 flex justify-between flex-col h-full overflow-auto pb-32">
              <div>
                {isAdmin && (
                  <div className="bg-white px-5 mx-auto mb-5 border-gray-100">
                    <div className="border border-gray-100 p-4 rounded-md my-3">
                      <h2 className="font-medium text-md mb-4 font-secondary">
                        Url slug
                      </h2>
                      <Input
                        style={{ width: "86%" }}
                        onChange={e => {
                          setSlug(e.target.value);
                        }}
                        value={slug}
                      />
                      <p className="mt-3 text-xs text-gray-400">
                        (If slug is taken, it will just give error)
                      </p>
                    </div>
                    <div className="border border-gray-100 p-4 rounded-md my-3">
                      <h2 className="font-medium text-md mb-4 font-secondary">
                        Featured Image
                      </h2>
                      {postObject?.slug ? (
                        <ImageUploader
                          key={coverImage}
                          borderRadius={6}
                          disallowScale={true}
                          uploadOnInsert={true}
                          placeholderImg={
                            postObject?.featuredImage
                              ? postObject?.featuredImage
                              : coverImage
                                ? coverImage
                                : "https://req.prototypr.io/https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1580577924294-Group+74.png"
                          }
                          height={400}
                          width={400}
                          adaptable={true}
                          postObject={postObject}
                          imageUrl={
                            postObject?.featuredImage
                              ? postObject?.featuredImage
                              : coverImage
                                ? coverImage
                                : null
                          }
                          setLogoUploadLink={() => {
                            return true;
                          }}
                          center={false}
                          uploadImageAPI={"/api/aws/uploadPublicationLogo"}
                          uploadAPI={`/api/publication/updatePublication`}
                          fieldName="logo"
                          uploadButtonText={"Browse"}
                          filename={`ftImage_${postObject?.id}`}
                          user={user}
                          refetchPost={refetchPost}
                        />
                      ) : (
                        <div className="text-sm text-gray-700">
                          <p className="mb-3">
                            Dear admin, you can only upload a featured image to
                            a post that has already been saved as a draft.
                          </p>
                          <p className="mb-3">
                            Press 'Save Draft', and then come back here to
                            attach a featured image.
                          </p>
                          <p className="mb-3 text-xs text-purple-500">
                            (Todo: make this work for non drafts where the post
                            has not been created yet.)
                          </p>
                        </div>
                      )}
                    </div>
                    {user?.isAdmin ? (
                      <div className="border border-gray-100 p-4 rounded-md my-3">
                        <h2 className="font-medium text-md mb-2 font-secondary">
                          Publish Date
                        </h2>
                        <p className="text-sm mb-4">
                          Set a date to make it publish. Clear the date field to
                          unpublish.
                        </p>
                        <ReactDatePicker
                          className="text-gray-900 border bg-white border-gray-300"
                          selected={timestamp}
                          onChange={date => handleDateChange(date)}
                        />
                      </div>
                    ) : null}
                    {user?.isAdmin ? (
                      <div className="border border-gray-100 p-4 rounded-md my-3">
                        <h2 className="font-medium text-md mb-4 font-secondary">
                          Post Status
                        </h2>
                        <Input
                          onChange={e => {
                            setPostStatus(e.target.value);
                          }}
                          value={postStatus}
                        />
                        <p className="mt-3 text-xs text-gray-400">
                          (draft, pending, or publish - todo: turn into
                          dropdown)
                        </p>
                      </div>
                    ) : null}
                    {user?.isAdmin ? (
                      <div className="border border-gray-100 p-4 rounded-md my-3">
                        <h2 className="font-medium text-md mb-4 font-secondary">
                          Tier
                        </h2>
                        <Input
                          onChange={e => {
                            setTier(e.target.value);
                          }}
                          value={tier}
                        />
                        <p className="mt-3 text-xs text-gray-400">
                          (1-5 for quality ranking - todo: turn into number
                          input)
                        </p>
                      </div>
                    ) : null}
                  </div>
                )}
                {/* ADMIN SETTINGS END */}
              </div>
              <div className="px-5 flex fixed w-full bg-white -mt-20 bottom-0 justify-start border-t py-3 gap-3 border-gray-300">
                {postObject?.published_at && (
                  <button
                    className="w-fit px-4 h-[40px] bg-gray-50 hover:bg-gray-100 outline outline-gray-400 outline-1 text-gray-500 font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                    variant={"ghostBlue"}
                    onClick={() => {
                      window.open(`/post/${postObject.slug}`);
                    }}
                  >
                    View
                  </button>
                )}
                <button
                  disabled={saving}
                  className={`w-fit px-4 h-[40px] bg-blue-600 hover:bg-blue-500 text-white outline outline-blue-500 outline-1 font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
                  onClick={updatePost}
                >
                  Save Settings
                </button>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </motion.div>
    </Portal>
  );
};
