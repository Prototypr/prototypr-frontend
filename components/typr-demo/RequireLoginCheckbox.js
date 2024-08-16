import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

const RequireLoginCheckbox = ({ requireLogin, onRequireLoginChange }) => (
  <div className="flex items-center justify-between w-full">
    <label className="text-sm font-medium text-gray-700">Require Login</label>
    <RadixSwitch.Root
      checked={requireLogin}
      onCheckedChange={onRequireLoginChange}
      className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
        requireLogin ? "bg-blue-500/90" : "bg-gray-300"
      }`}
    >
      <RadixSwitch.Thumb
        className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
          requireLogin ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </RadixSwitch.Root>
  </div>
);

export default RequireLoginCheckbox;