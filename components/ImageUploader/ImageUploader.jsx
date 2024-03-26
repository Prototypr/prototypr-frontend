import React, { useState, useEffect, useRef } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import useUser from "@/lib/iron-session/useUser";
import { convertImgToBase64URL } from "./lib/convertToBase64";

const ImageUploader = ({w, h,setFormValue, initialImage,companyLogoIsDefault=false, id, placeholderImageUrl=false}) => {

  const { user } = useUser({
    redirectIfFound: false,
  });

  const [image, setImage] = useState("avatar.jpg");
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1);
  const [defaultCompany, setDefaultCompany] = useState(null)
  
  //when multiple image uploaders on one page
  const [imageEditorInstance, setImageEditorInstance] = useState(null);
  const setEditorRef = (imageEditor) => setImageEditorInstance(imageEditor);
  const inputRef = useRef(id);

  useEffect(()=>{
    if(user){
      if(user.profile?.companies[0]?.name){
        //just set to the first company, chances are ppl have 1 company to start with
        setDefaultCompany(user.profile?.companies[0])
      }else{
        setDefaultCompany({name:''})  
      }
    }
  },[user])

  useEffect(() => {
      let defaultImage = "";
      if (companyLogoIsDefault && defaultCompany?.logo) {
        defaultImage = "https://req.prototypr.io/" + defaultCompany?.logo;
      }else if (initialImage){
        defaultImage = "https://req.prototypr.io/" + initialImage;
      }
      if (!defaultImage) {
        console.log(placeholderImageUrl)
        defaultImage =
        "https://req.prototypr.io/" +(placeholderImageUrl?placeholderImageUrl:"https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png");
      }
      convertImgToBase64URL(defaultImage, async function (base64Img) {
        const base64Response = await fetch(base64Img);
        const blobby = await base64Response.blob();
  
        // var blobby = b64toBlob(base64Img, 'image/png')
        var blobUrl = URL.createObjectURL(blobby);
  
        setImage(blobUrl);
      });
  }, [defaultCompany]);

  const updateFormBlobValue = async() =>{
    // https://github.com/mosch/react-avatar-editor
    const dataUrl = imageEditorInstance.getImage().toDataURL()
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    setFormValue(blob)
  }
  /**
   * when the image changes, set
   * the parent field
   */
  useEffect(()=>{
    if(imageEditorInstance){
      updateFormBlobValue()
    }
  },[position, scale])

  const handleNewImage = (e) => {
    setImage(e.target.files[0]);
    setTimeout(()=>{
      updateFormBlobValue()
    },50)
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const handlePositionChange = (position) => {
    setPosition(position);
  };

  return (
    <div>
      <div key={id} className="-mt-2 mb-2 relative" style={{ width: (w?(w+50):90+50) }}>
        <ReactAvatarEditor
          ref={setEditorRef}
          scale={parseFloat(scale)}
          width={w?w:90}
          height={h?h:90}
          position={position}
          onPositionChange={handlePositionChange}
          // borderRadius={100}
          image={image}
          className="rounded-lg"
        />
        <div
          className="absolute z-10 bottom-0 right-0 w-8 h-7 bg-blue-500 rounded-tl-lg rounded-br-lg border border-1 border-blue-500 shadow-xs cursor-pointer"
          onClick={() => {
            //use the ID to select the right canvas when there's multiple
            var avatarInput = document.getElementById(`${id}_uploader-input`);
            avatarInput.click();
          }}
        >
          <div className="relative h-full w-full flex justify-center">
            <svg
              className="mx-auto my-auto"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                fill="#fff"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 pb-1.5 pl-1.5 cursor-grab left-0">
          <div className="relative h-full w-full flex justify-start">
            <input
              className="w-3/5"
              name="scale"
              type="range"
              onChange={handleScale}
              min={"0.5"}
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </div>
        </div>
      </div>
      <div className="text-sm">
        <input
          key={id}
          id={`${id}_uploader-input`}
          inputRef={inputRef}
          name="newImage"
          type="file"
          style={{ width: "225px" }}
          className="bg-gray-100 hidden p-2 rounded-md"
          text="Choose image"
          onChange={handleNewImage}
        />
      </div>
    </div>
  );
};

export default ImageUploader;