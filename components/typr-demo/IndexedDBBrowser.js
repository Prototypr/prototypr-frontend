import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { DB_NAME, STORE_NAME } from "@/lib/typr-demo/indexedDB"; // Import the IndexedDB utility
import { TrashIcon } from "@radix-ui/react-icons"; // Import the Radix TrashIcon
import { PlusIcon } from "@radix-ui/react-icons"; // Import the Radix PlusIcon

const IndexedDBBrowser = ({ data, onDelete, router, searchParams, reset }) => {
  const deleteRow = async id => {
    // const db = await openDB(DB_NAME, 1);
    const db = await openDB(DB_NAME);
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.delete(id);
    tx.done;
    onDelete(); // Fetch data again after deletion
  };

  const handleCreateNew = reset => {
    router.push("/typr");
    reset();
  };

  return (
    <div id="dbbrowser" className="p-4 pt-2 pb-[150px] overflow-y-auto">
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-gray-500 text-center mt-2">No posts found.</p>
        ) : (
          <>
            {data.map(entry => (
              <Card
                key={entry.id}
                entry={entry}
                router={router}
                searchParams={searchParams}
                onDelete={deleteRow}
              />
            ))}
            <div
              className="bg-gradient-to-b group from-slate-100 transition transition-all duration-600 to-slate-50 hover:shadow border border-dotted border-gray-300/70 rounded-lg p-2 mb-4 relative group cursor-pointer flex items-center justify-center"
              onClick={handleCreateNew}
            >
              <PlusIcon className="text-gray-500" />
              <span className="ml-2 text-sm group-hover:text-gray-800 text-gray-500">
                Start New
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IndexedDBBrowser;

const Card = ({ entry, onDelete, router, searchParams }) => {
  const { id, versioned_title, title, versioned_content, content } = entry;
  const [displayTitle, setDisplayTitle] = useState(versioned_title || title);
  const [displayContent, setDisplayContent] = useState(
    versioned_content || content
  );

  useEffect(() => {
    setDisplayTitle(versioned_title || title);
    setDisplayContent(versioned_content || content);
  }, [versioned_title, title, versioned_content, content]);

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id);
    router.push(`?${params.toString()}`, undefined, {
      shallow: false,
      scroll: false,
    });
  };

  const currentId = new URLSearchParams(searchParams).get("id");
  const isActive = currentId === id.toString();

  return (
    <div
      className={`bg-gradient-to-b from-slate-100 transition transition-all duration-600 to-slate-50 hover:shadow border border-gray-300/70 rounded-lg p-2 mb-4 relative group hover:from-white hover:to-white cursor-pointer ${
        isActive ? "border-gray-500 from-white to-white" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-base p-1 font-bold text-wrap line-clamp-2 truncate">
          {displayTitle}
        </h2>
        <button
          onClick={e => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="text-gray-500 h-6 w-6 hover:bg-slate-200 rounded-lg hover:text-red-500 ml-2 hidden group-hover:flex items-center justify-center"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="p-1">
        <div
          className="text-gray-700 mb-2 truncate line-clamp-2 truncate text-wrap text-xs"
          dangerouslySetInnerHTML={{ __html: `${displayContent}` }}
        ></div>
        <p className="text-gray-500 text-[11px] mt-3">#{id}</p>
      </div>
    </div>
  );
};
