import React, { useState, useEffect } from "react";
import { FloatingMenu } from "@tiptap/react";
import useUser from "@/lib/iron-session/useUser";
import toast from "react-hot-toast";

import { styled, keyframes } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  CodeIcon,
  PlusIcon,
  ImageIcon,
  DividerHorizontalIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";

import { ImageDecorationKey } from "@/components/Editor/CustomExtensions/Figure2/CustomImage";

let axios = require("axios");

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});
const StyledContent = styled(PopoverPrimitive.Content, {
  display: "flex",
  flexDirection: "row",
  padding: 5,
  paddingLeft: 20,
  background: "transparent",
  width: 1000,
  outline: "none",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

function findPlaceholder(state, id) {
  let decos = ImageDecorationKey.getState(state);
  let found = decos.find(null, null, spec => spec.id == id);
  return found.length ? found[0].from : null;
}

let id = {};

const removePlaceholder = editor => {
  let placeholderPos = findPlaceholder(editor.state, id);
  // If the content around the placeholder has been deleted, drop
  // the image
  if (placeholderPos !== null) {
    const { view } = editor;

    view.dispatch(
      view.state.tr.setMeta(ImageDecorationKey.key, {
        remove: { id },
      })
    );
  }
};

const addPlaceholder = (blob, editor, type) => {
  // A fresh object to act as the ID for this upload
  id = {};

  let pos = editor.state.selection;

  let imgSrc = URL.createObjectURL(blob);
  if (pos.from) {
    editor
      .chain()
      .focus()
      .insertContentAt(pos, '<p class="is-empty"></p>', {
        updateSelection: true,
      })
      .run();

    const { view } = editor;
    // Replace the selection with a placeholder
    let tr = view.state.tr;
    tr.setMeta(ImageDecorationKey.key, {
      add: {
        id,
        pos: pos.from - 1,
        src: imgSrc,
        width: 200,
        height: 200,
        type: "png",
      },
    });

    view.dispatch(tr);

    return pos.from - 1;
  }
};

//function to check if the file is an image or a video:
const isImage = file => {
  return file && file["type"].split("/")[0] === "image";
};

const isVideo = file => {
  return file && file["type"].split("/")[0] === "video";
};

const uploadMedia = (event, editor, user, setLoading, setIsOpen) => {
  const files = event.target.files;

  //if image
  if (files && files[0] && isImage(files[0])) {
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = async e => {
        setLoading(true);
        const url = e.target.result;

        const resp = await fetch(url);
        const blob = await resp.blob();
        setIsOpen(false)
        let placeholderPos = addPlaceholder(blob, editor);

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
            setIsOpen(false)
            toast.success("Image Uploaded!", {
              duration: 5000,
            });
            const url = response?.data?.url;
            // editor.chain().focus().setFigure({src: url, caption:'enter caption'}).run()
            // editor.chain().focus().setImage({ src: url }).run();
            editor.commands.setFigure({
              figureType: "image",
              position: placeholderPos,
              src: url,
              alt: "",
              figcaption: "",
              class: "",
            });
            removePlaceholder(editor);
          })
          .catch(function (error) {
            console.log(error);
            setIsOpen(false)
            alert("There was an issue with that image. Please try again.");
            setTimeout(() => {}, 300);
            removePlaceholder(editor);
          });
      };
      reader.readAsDataURL(files[0]);
    }
  }
  //if video
  else if (files && files[0] && isVideo(files[0])) {
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = async e => {
        setLoading(true);
        const url = e.target.result;

        const resp = await fetch(url);
        const blob = await resp.blob();

        let placeholderPos = addPlaceholder(blob, editor);

        const file = new File([blob], `${files[0].name || "video.mp4"}`, {
          type: "video/mp4",
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
            toast.success("Video Uploaded!", {
              duration: 5000,
            });
            let url = response?.data?.url;
            
            //ensure url has https:// prefix
            if (!url.startsWith("https://")) {
              url = "https://" + url;
            }

            // editor.chain().focus().setFigure({src: url, caption:'enter caption'}).run()
            // editor.chain().focus().setImage({ src: url }).run();
            editor.commands.setFigure({
              figureType: "video",
              position: placeholderPos,
              src: url,
              class: "",
            });
            removePlaceholder(editor);
          })
          .catch(function (error) {
            console.log(error);
            alert("There was an issue with that video. Please try again.");
            setTimeout(() => {}, 300);
            removePlaceholder(editor);
          });
      };
      reader.readAsDataURL(files[0]);
    }
  }
};

function Content({ children, ...props }) {
  return (
    <PopoverPrimitive.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </PopoverPrimitive.Portal>
  );
}

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: blackA.blackA10,
  borderRadius: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 38,
  // padding: "0 5px",
  position: "relative",
  marginLeft: 4,
  userSelect: "none",
  width: 38,
};

const StyledItem = styled("div", { ...itemStyles });

const StyledTrigger = styled(PopoverPrimitive.Trigger, {
  "&[data-state=open]": {
    transform: "rotate(45deg)",
  },
  transition: "all 0.2s ease",
});

// Exports
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = StyledTrigger;
export const PopoverContent = Content;
export const DropdownMenuItem = StyledItem;

// Your app...
const Flex = styled("div", { display: "flex" });

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: blackA.blackA11,
  backgroundColor: "white",
  border: `1px solid ${blackA.blackA11}`,
  //   boxShadow: `0 2px 10px ${blackA.blackA7}`,
  //   "&:hover": { backgroundColor: violet.violet3 },
  //   "&:focus": { boxShadow: `0 0 0 2px black` }
});

const MenuFloating = ({ editor, isSelecting }) => {
  const { user } = useUser({
    redirectIfFound: false,
  });

  const [loading, setLoading] = useState(false);
  const [open, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!open);
  };

  useEffect(()=>{
    let editor = document.querySelector('.tiptap.ProseMirror')
    if(open){
      editor?.classList?.add('menu-open')
    }else{
      editor?.classList?.remove('menu-open')
    }
  },[open])

  useEffect(() => {
    function handleKeyUp(event) {
      setIsOpen(false);
    }

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  });

  return (
    <FloatingMenu
      shouldShow={({ editor, view, state, oldState }) => {
        if (state?.selection?.$anchor?.parent?.type?.name == "doc") {
          setIsOpen(false)
          return false;
        }

        if (
          state?.selection?.$anchor?.parent?.type?.name == "paragraph" &&
          state?.selection?.$anchor?.parent?.textContent == "" &&
          !editor.isActive("bulletList") &&
          !editor.isActive("orderedList")
        ) {
          return true;
        }

        if (
          editor.state.doc.textContent.trim() === "" &&
          state?.selection?.$anchor?.pos == 2
        ) {
          return true;
        }
      }}
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <div
        id="menu-trigger-container"
        className="relative z-20"
        style={{ marginLeft: -72 }}
      >
        <Popover open={open}>
          {/* <Popover > */}
          <PopoverTrigger autoFocus={false} asChild>
            <IconButton
              onMouseDown={e => {
                // e.target.closest('#menu-trigger-container').focus()
                toggleOpen();
                // e.target.parentElement.click()
                // tcontent.click()
              }}
              className="hover:cursor-pointer"
              aria-label="Update dimensions"
            >
              <PlusIcon />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent
            onCloseAutoFocus={e => {
              e.preventDefault();
            }}
            sticky="always"
            onPointerDownOutside={e => {
              if (
                !e.target.closest("#menu-trigger-container") &&
                !e.target.closest(".menu-item")
              ) {
                setIsOpen(false);
              }
            }}
            onFocusOutside={e => e.preventDefault()}
            side="right"
            sideOffset={5}
          >
            <Flex css={{ flexDirection: "row", gap: 10 }}>
              <DropdownMenuItem>
                <IconButton className="menu-item">
                  <>
                    <label
                      for="img-upload"
                      className="w-full h-full flex cursor-pointer custom-file-upload"
                    >
                      <ImageIcon className="my-auto mx-auto" />
                    </label>
                    <input
                      type="file"
                      id="img-upload"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={event =>{
                        setIsOpen(false)
                        uploadMedia(event, editor, user, setLoading, setIsOpen)
                      }}
                    />
                  </>
                </IconButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconButton
                  onClick={() => {
                    // const url = prompt('Enter Twitter URL')
                    // if(url){
                    //     editor.chain().insertTweet(url).run()
                    // }
                    editor.chain().insertTweet().run();
                  }}
                  className="hover:cursor-pointer menu-item"
                  aria-label="Insert Code Block"
                >
                  <TwitterLogoIcon />
                </IconButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconButton
                  onClick={() => {
                    setIsOpen(false);

                    let editorDiv = document.querySelector(
                      ".tiptap.ProseMirror"
                    );

                    const url = prompt("Enter YouTube URL");
                    if (url) {
                      //get current position
                      let pos = editor.state.selection.from;

                      editor
                        .chain()
                        .setYoutubeVideo({
                          src: url,
                          width: 600,
                          height: 400,
                        })
                        .setNodeSelection(pos - 1)
                        .insertContentAt(pos, "<p></p>")
                        .setTextSelection(pos+1)
                        .focus()
                        .enter()
                        .run();
                    }
                  }}
                  className="hover:cursor-pointer menu-item"
                  aria-label="Insert Code Block"
                >
                  <VideoIcon />
                </IconButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconButton
                  onClick={() => {
                    editor.chain().focus().setCodeBlock().run();
                  }}
                  className="hover:cursor-pointer menu-item"
                  aria-label="Insert Code Block"
                >
                  <CodeIcon />
                </IconButton>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconButton
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      editor
                        .chain()
                        .focus()
                        .setHorizontalRule()
                        .setHardBreak()
                        .run();
                    }, 20);
                  }}
                  className="hover:cursor-pointer menu-item"
                  aria-label="Insert Divider"
                >
                  <DividerHorizontalIcon />
                </IconButton>
              </DropdownMenuItem>
            </Flex>
          </PopoverContent>
        </Popover>
      </div>
    </FloatingMenu>
  );
};

export default MenuFloating;
