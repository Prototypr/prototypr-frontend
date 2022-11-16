import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { Portal } from 'react-portal';
// import AdminDialog from "~/letter-app/components/builder/Admin/AdminDialog";
import useUser from "@/lib/iron-session/useUser";
import { Cross2Icon } from "@radix-ui/react-icons";
import ImageUploader from "./ImageUploader";
import Button from "@/components/Primitives/Button";
import toast from "react-hot-toast";

import { styled } from '@stitches/react';
import { slate, indigo } from '@radix-ui/colors';
import axios from 'axios'

import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Input = styled('input', {
  all: 'unset',
  flex: '1 0 auto',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: slate.slate12,
  boxShadow: `0 0 0 1px ${slate.slate8}`,
  backgroundColor:indigo.indogo9,
  height: 35,
  '&:focus': { boxShadow: `0 0 0 2px ${slate.slate8}` },
});

const SidePanel = ({isOpen, close, editor,postObject}) =>{
  
    const { user } = useUser({
    redirectIfFound: false,
    });

  const [rootElement] = useState(()=>document.querySelector(`body`))

    return (
      <ContentImportSidebarInner 
        isOpen={isOpen}
        postObject={postObject}
        close={close}
        isAdmin={user?.isAdmin}
        user={user}
        rootElement={rootElement}
        editor={editor}
        />)
}

export default React.memo(SidePanel)
// export default SidePanel


const ContentImportSidebarInner = ({isOpen, close, rootElement,editor, isAdmin, postObject, user}) => {

  const [postStatus, setPostStatus] = useState(postObject.status)
  const [tier, setTier] = useState(postObject.tier)
  const [timestamp, setTimestamp] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const handleDateChange = (input) =>{
    setTimestamp(input)
  }


  useEffect(()=>{

    setPostStatus(postObject?.status)
    setTier(postObject?.tier)
    
    if(postObject.published_at){
      let dateObj = new Date(postObject.published_at)
      if(dateObj){
        setTimestamp(dateObj)
      }
    }

  },[postObject])

  useEffect(()=>{

    const json = editor.getJSON();
    if(!coverImage && json){
      let content = json?.content
      let cover = content?.find((p) => p?.type === "figure")?.attrs?.src;
      setCoverImage(cover)
    }

  },[isOpen && editor])

  const updatePost =async () =>{

    const data = {}
    if(postStatus){
      data.status = postStatus
    }
    if(tier){
      data.tier = parseInt(tier)
    }
    if(timestamp){
      data.publishedAt = timestamp
    }else{
      data.publishedAt= null
    }

    let publishPostEndpointConfig = {
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    
      data: {
        data
      },
    };

    await axios(publishPostEndpointConfig)
    .then(async function (response) {
      toast.success("Settings saved!", {
        duration: 5000,
      });
    })
    .catch(function (error) {
      console.log(error);
      toast.error("Settings could not be saved!", {
        duration: 5000,
      });
    });
  }

  return (
    <Portal node={rootElement}>
    <motion.div
    initial={'-380px'} 
    animate={{ x: isOpen?'-400px':'0px',  transition: { type: "spring", damping:25, velocity: 2, stiffness: 230 } }}
    style={{width:'400px', right:'-405px', paddingRight:'0px'}} className="fixed z-[99] top-0">

      <div className="h-screen flex flex-col pt-6 bg-white shadow-xl" style={{ willChange: 'transform'}}>
        <div className="px-4 sm:px-6 flex justify-between">
          <h2 id="slide-over-heading" className="text-gray-900 text-lg font-semibold">
            Story Settings
          </h2>
          <div 
          onClick={close}
          className="z-50 flex cursor-default opacity-50 hover:opacity-75 my-auto mr-2" style={{ height: "14px", width: "14px" }}>
            <Cross2Icon/>
          </div>
        </div>
        <div className="mt-6 h-full relative">
          {/* Replace with your content */}
          <div className="inset-0 flex justify-between flex-col h-full overflow-auto pb-32">
            <div>
            {isAdmin && 
               <div  className="bg-white px-5 mx-auto mb-5 border-gray-100">
                 <div className="border border-gray-100 p-4 rounded-md my-3">
                    <h2 className="font-medium text-md mb-4 font-secondary">Featured Image</h2>
                    {postObject.slug?<ImageUploader 
                      key={coverImage}
                      borderRadius={6}
                      disallowScale={true}
                      uploadOnInsert={true}
                      placeholderImg = {postObject?.featuredImage?postObject?.featuredImage:coverImage?coverImage:"https://req.prototypr.io/https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1580577924294-Group+74.png"}
                      height={400}
                      width={400}
                      adaptable={true}
                      postObject={postObject}
                      imageUrl={postObject?.featuredImage?postObject?.featuredImage:coverImage?coverImage:null}
                      setLogoUploadLink={()=>{return true}}
                      center={false}
                      uploadImageAPI={"/api/aws/uploadPublicationLogo"}
                      uploadAPI={`/api/publication/updatePublication`}
                      fieldName="logo"
                      uploadButtonText={'Browse'}
                      filename={`ftImage_${postObject?.id}`} 
                      user={user}/>:
                      <div className="text-sm text-gray-700">
                      <p className="mb-3">
                        Dear admin, you can only upload a featured image to a post that has already been saved as a draft.
                      </p>
                      <p className="mb-3">
                        Press 'Save Draft', and then come back here to attach a featured image.
                      </p>
                      <p className="mb-3 text-xs text-purple-500"> 
                        (Todo: make this work for non drafts where the post has not been created yet.)
                      </p>
                      </div>
                      }
                </div>
                <div className="border border-gray-100 p-4 rounded-md my-3">
                    <h2 className="font-medium text-md mb-2 font-secondary">Publish Date</h2>
                    <p className="text-sm mb-4">Set a date to make it publish. Clear the date field to unpublish.</p>
                     <ReactDatePicker
                        className="text-gray-900 border bg-white border-gray-300"
                        selected={timestamp}
                        onChange={(date) => handleDateChange(date)}
                      />
                </div>
                <div className="border border-gray-100 p-4 rounded-md my-3">
                    <h2 className="font-medium text-md mb-4 font-secondary">Post Status</h2>
                    <Input onChange={(e)=>{
                      setPostStatus(e.target.value)
                    }} defaultValue={postStatus}/>
                    <p className="mt-3 text-xs text-gray-400"> 
                        (draft, pending, or publish - todo: turn into dropdown)
                      </p>
                </div>
                <div className="border border-gray-100 p-4 rounded-md my-3">
                    <h2 className="font-medium text-md mb-4 font-secondary">Tier</h2>
                    <Input onChange={(e)=>{
                      setTier(e.target.value)
                    }} defaultValue={tier}/>
                    <p className="mt-3 text-xs text-gray-400"> 
                        (1-5 for quality ranking - todo: turn into number input)
                      </p>
                </div>
           </div>}
                {/* ADMIN SETTINGS END */}
           </div>
           <div  className="px-5 flex fixed w-full bg-white -mt-20 bottom-0 justify-start border-t py-3 border-gray-300">
            <Button onClick={updatePost}>Save Settings</Button>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </motion.div>
      </Portal>
  );
}