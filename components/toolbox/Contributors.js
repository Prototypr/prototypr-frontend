import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WriterGrid from "@/components/toolbox/WriterGrid";
export default function Contributors({ withAuthUser = {}}) {
  return (
    <div className="hidden lg:block my-6">
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-sm font-semibold mb-6">Contributors</h1>
        <WriterGrid size={11} />
        {!withAuthUser ? (
          <Link href="/sign-up" as="/sign-up">
            <h1 className="ml-1 cursor-pointer hover:underline text-sm font-medium text-blue-600">
              Join Prototypr →
            </h1>
          </Link>
        ) : (
          <Link href="/new-story" as="/new-story">
            <h1 className="ml-1 cursor-pointer hover:underline text-sm font-medium text-blue-600">
              Write with us →
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
}
