import React, { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as RadixSwitch from "@radix-ui/react-switch";

export default function UserPopover({ editorProps, handleUserChange }) {
  const [open, setOpen] = useState(true);

  const toggleOpen = isOpen => {
    if (open !== isOpen) {
      setOpen(isOpen);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={toggleOpen}>
      <Popover.Trigger asChild>
        <button className="absolute bottom-12 right-4 md:right-12 md:bottom-6 md:right-6 z-[999] shadow-lg rounded-full overflow-hidden">
          <img
            src={editorProps?.components?.nav?.userBadge?.avatarPlaceholder}
            alt="User Avatar"
            className="w-14 h-14 rounded-full bg-white object-contain border border-gray-300"
          />
        </button>
      </Popover.Trigger>
      <Popover.Content
        onFocusOutside={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
        className="p-4 mb-2 mr-3 bg-white rounded shadow-md z-[999] min-w-[200px]"
      >
        <h3 className="mb-4 tracking-tight font-medium">User state</h3>
        <div className="flex flex-col space-y-4">
          <label className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Logged In</div>
            <RadixSwitch.Root
              checked={editorProps?.user?.isLoggedIn}
              onCheckedChange={checked =>
                handleUserChange("isLoggedIn", checked)
              }
              className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                editorProps?.user?.isLoggedIn ? "bg-blue-500/90" : "bg-gray-300"
              }`}
            >
              <RadixSwitch.Thumb
                className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  editorProps?.user?.isLoggedIn
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              />
            </RadixSwitch.Root>
          </label>
          <label className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Admin</div>
            <RadixSwitch.Root
              checked={editorProps?.user?.isAdmin}
              onCheckedChange={checked => handleUserChange("isAdmin", checked)}
              className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                editorProps?.user?.isAdmin ? "bg-blue-500/90" : "bg-gray-300"
              }`}
            >
              <RadixSwitch.Thumb
                className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  editorProps?.user?.isAdmin ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </RadixSwitch.Root>
          </label>
          {/* <label>
            Username:
            <input
              type="text"
              value={editorProps.user.username || ""}
              onChange={e => handleUserChange("username", e.target.value)}
              className="w-full h-[32px] px-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label> */}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
