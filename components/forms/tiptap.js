import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import { useEffect } from "react";
import useUser from "@/lib/iron-session/useUser";
var axios = require("axios");

const CustomDocument = Document.extend({
  content: "heading block*",
  atom: true,
});

const convertImgToBase64URL = (url, callback, outputFormat) => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS"),
      ctx = canvas.getContext("2d"),
      dataURL;
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
};

const MenuActions = {
  bold: {
    label: "bold",
    action: (editor) => editor.chain().focus().toggleBold().run(),
  },
  italic: {
    label: "italic",
    action: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  code: {
    label: "code",
    action: (editor) => editor.chain().focus().toggleCode().run(),
  },
  image: {
    label: "image",
    type: "file",
    action: (event, editor, user) => {
      console.log(event.target.files);
      const files = event.target.files;
      if (files && files[0]) {
        var reader = new FileReader();

        reader.onload = async (e) => {
          console.log(files[0].name);
          const blob = e.target.result;
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
              alert("Uploaded");
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
      //   const url = window.prompt("URL");

      //   // upload image here....

      //   if (url) {
      //     editor.chain().focus().setImage({ src: url }).run();
      //   }
    },
  },
};

const MenuBar = ({ editor }) => {
  const { user } = useUser({
    redirectIfFound: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full ">
      <div className="flex flex-row gap-2">
        {Object.values(MenuActions).map((obj) => {
          return (
            <>
              {obj?.type === "file" ? (
                <input
                  type="file"
                  onChange={(event) => obj.action(event, editor, user)}
                />
              ) : (
                <button
                  onClick={() => {
                    obj.action(editor);
                  }}
                  className={`p-1 rounded text-sm border ${
                    editor.isActive(obj.label)
                      ? "is-active bg-black text-white"
                      : ""
                  }`}
                >
                  {obj.label}
                </button>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
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
    let retrievedObject = localStorage.getItem("wipContent");
    // if (editor && retrievedObject) {
    //   editor?.commands?.setContent(JSON.parse(retrievedObject));
    // }
  }, [editor]);

  const onSubmit = () => {
    const json = editor.getJSON();
    console.log(json);
  };

  return (
    <div className="w-full my-4">
      <div className="flex flex-row justify-end">
        <button
          onClick={onSubmit}
          className="p-2 px-3 bg-blue-700 rounded text-sm text-white"
        >
          Submit
        </button>
      </div>
      <MenuBar editor={editor} />
      <div className="my-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
