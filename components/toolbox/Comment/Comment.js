import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic'

// import CommentBox from "./CommentBox";
const CommentBox = dynamic(() => import('./CommentBox'), { ssr: false })

export default function Comment({ withAuthUser = {}, setUserAuthenticated = () => {}, item = {}, titleClass = "" }) {
  return (
    <div className="relative lg:mb-20 w-full">
      <h1 className="mt-6 mb-3 text-sm font-semibold">Comments</h1>
      <div
        className={
          "mb-6 sm:mb-0  w-full relative block px-6 py-1 bg-white rounded-lg shadow mt-0"
        }
      >
        <div className="mt-3 mb-3 py-1">
          <CommentBox
            withAuthUser={withAuthUser}
            setUserAuthenticated={setUserAuthenticated}
            titleClass="text-sm font-semibold hidden text-gray-800"
            item={item}
          />
        </div>
      </div>
    </div>
  );
}
