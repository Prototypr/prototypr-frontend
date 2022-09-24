import { ImageIcon, BoldIcon, ItalicIcon, CodeIcon, ListIcon } from "./icons";
import toast from "react-hot-toast";

let axios = require("axios");

export const MenuActions = {
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
