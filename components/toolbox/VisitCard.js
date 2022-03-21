import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function VisitCard({
  title = "",
  link = "",
  useNextImage = true,
  logoNew,
}) {
  return (
    <div className="flex bg-white shadow rounded-lg mb-0 flex-col p-5 xl:p-6 ">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-base tracking-tight mb-2 leading-tight font-semibold text-gray-900 my-auto">
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
          <a
            rel="noreferrer"
            className="inline bg-gray-200 p-1 px-2 rounded-lg mt-2"
            href={link}
            target="_blank"
          >
            <img
              alt="Visit external site"
              className="my-auto mb-1 inline fill-current w-4 h-4 mr-2"
              src="/static/images/icons/external-link-dark.svg"
            />
            <p className="text-sm inline mb-1 text-gray-700 font-medium my-auto">
              Visit Site
            </p>
          </a>
        </div>

        {useNextImage ? (
          <Image
            width="48px"
            height="48px"
            src={logoNew}
            alt="Product Logo"
            className="bg-white rounded-full"
          />
        ) : (
          <img
            src={logoNew}
            style={{ width: "48px", height: "48px" }}
            alt="Product Logo"
            className="h-12 w-12 bg-white object-cover rounded-full ml-auto"
          />
        )}
      </div>
      {/* <VoteButton
        withUserLikes={this.props.withUserLikes}
        updateUserLikes={(likes) => this.props.updateUserLikes(likes)}
        user={this.props.withAuthUser}
        item={props.post.node}
        initialLikes={this.props.userLikes}
        size="large"
        user={this.props.withAuthUser}
        item={this.props.post}
      /> */}
    </div>
  );
}
