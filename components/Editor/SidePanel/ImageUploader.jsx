import React, { useState, useEffect, useRef } from "react";
// import ReactAvatarEditor from "react-avatar-editor";
import { styled } from "@stitches/react";
import { indigo, slate } from "@radix-ui/colors";
import toast from "react-hot-toast";

const probe = require("probe-image-size");

var axios = require("axios");

var spinnerIcon = (
  <svg
    className="animate-spin h-5 w-5 text-gray-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="rgba(0,0,0,0.6)"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="rgba(0,0,0,0.6)"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const Button = styled("button", {
  all: "unset",
  borderRadius: 4,
  padding: "0 12px",
  fontSize: 14,
  cursor: "pointer",
  lineHeight: 1,
  fontWeight: 600,
  float: "right",
  height: 34,
  variants: {
    variant: {
      confirm: {
        backgroundColor: indigo.indigo11,
        color: slate.slate4,
        // border: `1px solid ${indigo.indigo11}`,
        //   boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: indigo.indigo10 },
        "&:focus": { boxShadow: `0 0 0 2px ${indigo.indigo11}` },
      },
      preview: {
        backgroundColor: slate.slate1,
        color: slate.slate11,
        // border: `1px solid ${slate.slate8}`,
        // boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": {
          outline: `1px solid ${slate.slate6}`,
          backgroundColor: "#fff",
          color: slate.slate12,
        },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
    },
  },

  defaultVariants: {
    variant: "confirm",
  },
});

const ImageUploader = (props) => {
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1);
  const [hasChanged, setHasChanged] = useState(false);
  const [editor, setEditor] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [blobsy, setBlobsy] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);

  const [savingOnInsert, setSavingOnInsert] = useState(false);
  const [saving, setSaving] = useState(false);
  const [buttonText, setButtonText] = useState("Save");
  const [imageDimensions, setImageDimensions] = useState(false)

  
  const imageDimensionsRef = useRef(false)
  useEffect(()=>{
    imageDimensionsRef.current = imageDimensions
  },[imageDimensions])

  const setEditorRef = (editor) => setEditor(editor);

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

  const uploadImage = async(img) => {
    if(!img){
      setSaving(true);
      setSavingOnInsert(false)
    }else{
      setSavingOnInsert(true)
    }

    if (!img) {
      alert("Image upload failed - contact support.");
      return false;
    }

    const file = dataURLtoFile(img,props.filename);

      const data = {};
      const formData = new FormData();
      formData.append("files", file, 'featuredImage');
      formData.append('data', JSON.stringify(data));
      formData.append('refId', props.postObject.id);
      formData.append('field', 'featuredImage');
      formData.append('ref', 'api::post.post');

      var configUpload = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        headers: {
          Authorization: `Bearer ${props.user?.jwt}`,
        },
        data: formData,
      };

      await axios(configUpload)
        .then(async function (response) {
            setSaving(false);
            setSavingOnInsert(false)
          toast.success("Image Uploaded!", {
            duration: 5000,
          });
          console.log(response)
        })
        .catch(function (error) {
            setSavingOnInsert(false)
            setSaving(false);
          console.log(error);
          alert('There was an issue with that image. Please try again.')
          setTimeout(() => {}, 300);
        });

  };

  useEffect(() => {
    let profPic = "", logoPic='';


    if (props.imageUrl) {
      let timestamp = Date.now();
      profPic =
        "https://req.prototypr.io/" +
        props.imageUrl +
        "?timestamp=" +
        timestamp;

        logoPic =  props.imageUrl +
        "?timestamp=" +
        timestamp;

    }
    if (!profPic) {
      profPic =
        "https://req.prototypr.io/" +
        props.placeholderImg?props.placeholderImg:"https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png";
    }
   
    let imageData = null
     const getImageData = async (props) =>{
        try{
            imageData = await checkImage(
              profPic
            );
            
            var ratio = Math.min(props.width / imageData.width, props.height / imageData.height);
          
            let h = imageData.height * ratio;
            let w = imageData.width * ratio;
            setImageDimensions({w:w,h:h})
            setImageInfo(imageData)

            props.setLogoUploadLink(
              logoPic,
              w, 
              h
            )


          }catch(e){
            console.log(e)
            return false
          }
     }
     getImageData(props)

      

    convertImgToBase64URL(profPic, async function (base64Img) {
      const base64Response = await fetch(base64Img);
      const blobby = await base64Response.blob();

      // var blobby = b64toBlob(base64Img, 'image/png')
      var blobUrl = URL.createObjectURL(blobby);

      setImage(blobUrl);
      setBlobsy(blobUrl);
    });
  }, [props?.imageUrl]);

  const handleNewImage = (e) => {
    
    setImage(e.target.files[0]);

    
    const getImageData = async (props) =>{
      try{

          var fr = new FileReader;

          fr.onload = function() { // file is loaded
              var img = new Image;

              img.onload = function() {

                var ratio = Math.min(props.width / img.width, props.height / img.height);
          
                let h = img.height * ratio;
                let w = img.width * ratio;
                
                setImageDimensions({w:w,h:h})
                setImage(fr.result)
                if(props.uploadOnInsert){
                    setTimeout(()=>{
                      uploadImage(img.src)
                    },50)
                  }else{
                    setHasChanged(true);
                  }
                // props.setLogoUploadLink(
                //   fr.result,
                //   w, 
                //   h
                // )
              };

              img.src = fr.result; // is the data URL because called with readAsDataURL
          };

          fr.readAsDataURL(e.target.files[0]);
          // setImageInfo(imageData)


        }catch(e){
          console.log(e)
          return false
        }
   }
   getImageData(props)
    
    

  };


  return (
    <>
      <div key={props.key} className="h-full relative flex flex-col justify-between" style={{width:120}}>
        {/* avatar cropper */}
        <div style={{maxWidth:120}}className={`relative bg-white my-auto ${props.center?'mx-auto':''}`}>
          {/* image loading spinner */}
          {((!blobsy || saving == true) && !hasChanged) && (
            <div style={{marginLeft:60}}className="absolute top-1/2 opacity-80 left-0 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded w-full h-full bg-opacity-50 flex text-gray-600 bg-white ">
              <div className="my-auto mx-auto">{spinnerIcon}</div>
            </div>
          )}
          {image &&<img
            className="mx-auto border border-gray-200 rounded mb-3 my-auto object-cover"
            ref={setEditorRef}
            src={image}
            scale={parseFloat(scale)}
            width={imageDimensions?.w?imageDimensions?.w:props.width?props.width:imageInfo?.width?imageInfo.width:90}
            height={imageDimensions?.h?imageDimensions?.h:props.height?props.height:90}
            position={position}
            image={image}
            style={{maxWidth:110, maxHeight:90}}
            // className="rounded-lg border"
          />}
        </div>

        <div className={`flex mt-2 ${props.center?'justify-center':'justify-start'} flex mt-2 justify-start `}>
          {(!savingOnInsert && buttonText=='Save') && 
          <Button 
          variant="preview"
          className={`flex w-full ${props.center?'border-none bg-white':''} `}
          onClick={() => {
            var avatarInput = document.getElementById("avatar-select"+props.filename);
            avatarInput.click();
          }}>
            <div className="mx-auto flex">

            <svg
              className="my-auto"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          <div className="text-sm ml-2 my-auto">{props.uploadButtonText}</div>
            </div>
          </Button>}

          {((savingOnInsert && buttonText=='Save')) &&
          <div className="flex">
           <div className="my-auto h-5 w-5"> {spinnerIcon}</div>
            <div className="pl-2 my-auto text-gray-800">Uploading...</div>
          </div>
          }
          {((buttonText=='Saved!')) &&
          <div className="flex">
            <div className="my-auto text-gray-800">Saved!</div>
          </div>
          }
          {((hasChanged && !savingOnInsert) && buttonText!='Saved!') && (
        <div className="">

          <Button
            onClick={uploadImage}
            disabled={saving}
            className={`${saving ? "opacity-60 cursor-loading" : ""}`}
            aria-label="Save and Next"
            type="submit"
          >
            <div className="flex mx-auto text-white text-sm font-semibold my-auto leading-5">
              <div>
                {saving ? (
                  <div className="flex">
                    {spinnerIcon}
                    <div className="pl-2 my-auto">Cropping...</div>
                  </div>
                ) : (
                  buttonText
                )}
              </div>
            </div>
          </Button>
          {errorMsg && (
            <p style={{ width: 260 }} className="mt-3 pr-3 text-red-600">
              {errorMsg}
            </p>
          )}
        </div>
      )}
        </div>
      </div>
      {!savingOnInsert && <div className="text-sm">
        <input
          id={"avatar-select"+props.filename}
          name={"newImage"+props.filename}
          type="file"
        //   style={{ width: "225px" }}
          className="bg-gray-100 hidden p-2 rounded-md"
          text="Choose image"
          onChange={handleNewImage}
        />
      </div>}
      </>
      
  );
};

export default ImageUploader;


function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

export const checkImage = async(imageUrl) =>{
    try{
        let imageInfo = await probe(
          "https://req.prototypr.io/" + imageUrl
        );
        
        if(imageInfo){
          let bytelength = imageInfo.length
          let mb = bytelength/1000000

          if(mb>4){
            alert('Image too large. Please use something less than 4mb.')

            throw Error('Image size too big')
          }
        }
        return imageInfo
        
      }catch(e){
        console.log(e)
        return false
      }
}