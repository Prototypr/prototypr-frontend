import React from "react";
import IssueItem from "@/components/newsletter/IssueItem";

export default function IssueList({ posts = [] }) {
  return (
    <section className="mt-28 pt-2 px-3 xl:px-0">
      <h2 className="font-bold text-4xl tracking-wide text-title-1 mb-10">
        Previous issues
      </h2>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mb-20">
        <IssueItem />
        <IssueItem />
        <IssueItem />
        <IssueItem />
        <IssueItem />
        <IssueItem />
        <IssueItem />
        <IssueItem />
      </div>
      <div className="flex items-center justify-center">
        <button className="bg-white rounded-lg px-18 py-4 font-semibold text-base flex items-center justify-center text-gray-1 hover:opacity-80">View all</button>
      </div>
    </section>
  );
}
