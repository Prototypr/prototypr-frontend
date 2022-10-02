
import React, {useState,useEffect} from "react";
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
  VideoIcon
} from "@radix-ui/react-icons";
let axios = require("axios");

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" }
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" }
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" }
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" }
});
const StyledContent = styled(PopoverPrimitive.Content, {
  display: "flex",
  flexDirection: "row",
  padding: 5,
  paddingLeft: 20,
  background:'#fff',
  width:1000,
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade }
    }
  }
});

const insertImage = (event, editor, user, setLoading) =>{
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
            console.log(response)
            setLoading(false);
            toast.success("Image Uploaded!", {
              duration: 5000,
            });
            const url = response?.data?.url;
            // editor.chain().focus().setFigure({src: url, caption:'enter caption'}).run()
            // editor.chain().focus().setImage({ src: url }).run();
            editor.commands.setFigure({src: url, alt: '', caption:''})
          })
          .catch(function (error) {
            console.log(error);
            setTimeout(() => {}, 300);
          });
      };
      reader.readAsDataURL(files[0]);
    }
}

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
    transform: "rotate(45deg)"
  },
  transition: "all 0.2s ease"
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
  border:`1px solid ${blackA.blackA11}`
//   boxShadow: `0 2px 10px ${blackA.blackA7}`,
//   "&:hover": { backgroundColor: violet.violet3 },
//   "&:focus": { boxShadow: `0 0 0 2px black` }
});

const MenuFloating = ({ editor, isSelecting }) => {
    const { user } = useUser({
        redirectIfFound: false,
      });

      const [loading, setLoading] = useState(false);


    return(
<FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
<div style={{marginLeft:-72}}>
<Popover>
    <PopoverTrigger asChild>
      <IconButton className="hover:cursor-pointer" aria-label="Update dimensions">
        <PlusIcon />
      </IconButton>
    </PopoverTrigger>
    <PopoverContent side="right" sideOffset={5}>
      <Flex css={{ flexDirection: "row", gap: 10 }}>
        <DropdownMenuItem>
          <IconButton aria-label="Customise options">
          <>   
          <label
            for="img-upload"
            className="w-full h-full flex cursor-pointer custom-file-upload"
            >
            <ImageIcon className="my-auto mx-auto"/>
            </label>
            <input
            type="file"
            id="img-upload"
            accept="image/*"
            className="hidden"
            onChange={(event) =>
                insertImage(event, editor, user, setLoading)
            }
            />
                </>
          </IconButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconButton  onClick={()=>{
                const url = prompt('Enter Twitter URL')
                if(url){
                    editor.chain().focus().insertTweet(url).run()
                }
            }}  className="hover:cursor-pointer" aria-label="Insert Code Block">
            <TwitterLogoIcon/>
          </IconButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconButton  onClick={()=>{
                const url = prompt('Enter YouTube URL')
                if(url){
                    editor.commands.setYoutubeVideo({
                        src: url,
                        width: 600,
                        height: 400,
                      })
                }
            }}  className="hover:cursor-pointer" aria-label="Insert Code Block">
            <VideoIcon/>
          </IconButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconButton
           onClick={()=>{

            editor.chain().focus().setCodeBlock().run()
         }} 
          className="hover:cursor-pointer" aria-label="Insert Code Block">
            <CodeIcon/>
          </IconButton>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <IconButton  onClick={()=>{  
               editor.chain().focus().setHorizontalRule().run()
            }} className="hover:cursor-pointer" aria-label="Insert Divider">
            <DividerHorizontalIcon/>
          </IconButton>
        </DropdownMenuItem>
      </Flex>
    </PopoverContent>
  </Popover>
</div>
</FloatingMenu>
    )
}

export default MenuFloating