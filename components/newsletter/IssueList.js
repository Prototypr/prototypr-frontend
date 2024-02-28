import React from "react";
import dynamic from "next/dynamic";
const IssueItem = dynamic(() => import("@/components/newsletter/IssueItem"));
import { useIntl } from 'react-intl';
export default function IssueList({ posts = [], marginTop ,currentPage}) {
  const intl = useIntl();
  return (
    <section className={`pt-2 px-3 xl:px-6 ${!marginTop?'':marginTop}`}>
      <h2 className="font-medium font-semibold text-xl text-title-1 mb-6">
        {currentPage?`Page ${currentPage}`:intl.formatMessage({ id: "newsletter.issue" })}
      </h2>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mb-20">
        {
          posts.length ? posts.map((post, index) => {
            return (
              <IssueItem 
                key={`issue_${index}`}
                post={post?.attributes}
                />
            )
          }): null
        }
      </div>
      {/* <div className="flex items-center justify-center mb-4">
        <button className="bg-white rounded-lg px-18 py-4 font-semibold text-base flex items-center justify-center text-gray-1 hover:opacity-80">
          {intl.formatMessage({ id: "issue.viewAll" })}
        </button>
      </div> */}
    </section>
  );
}
