import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const CustomPostStatusesCheckbox = ({ customPostStatuses, onCustomPostStatusesChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Custom Post Statuses:
    </label>
    <RadixCheckbox.Root
      checked={customPostStatuses}
      onCheckedChange={onCustomPostStatusesChange}
      className="w-6 h-6 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <RadixCheckbox.Indicator>
        <CheckIcon className="w-4 h-4 text-indigo-600" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  </div>
);

export default CustomPostStatusesCheckbox;