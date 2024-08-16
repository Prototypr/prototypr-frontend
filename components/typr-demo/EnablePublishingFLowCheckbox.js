import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

const EnablePublishingFlowCheckbox = ({ enablePublishingFlow, onEnablePublishingFlowChange }) => (
  <div className="flex items-center justify-between w-full">
    <label className="text-sm font-medium text-gray-700">Enable Publishing Flow</label>
    <RadixSwitch.Root
      checked={enablePublishingFlow}
      onCheckedChange={onEnablePublishingFlowChange}
      className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
        enablePublishingFlow ? "bg-blue-500/90" : "bg-gray-300"
      }`}
    >
      <RadixSwitch.Thumb
        className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
          enablePublishingFlow ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </RadixSwitch.Root>
  </div>
);

export default EnablePublishingFlowCheckbox;