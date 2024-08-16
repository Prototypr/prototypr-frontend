import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { TrashIcon, PlusIcon } from "@radix-ui/react-icons";

const SeoPanel = ({ seoMenu, onValueChange, theme }) => {
  const [entries, setEntries] = useState(seoMenu);

  const handleAddEntry = () => {
    const newEntries = [
      ...entries,
      { type: "", field: "", label: "", initialValue: "" },
    ];
    setEntries(newEntries);
    onValueChange(newEntries);
  };

  const handleChange = (index, field, value) => {
    const newEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(newEntries);
    onValueChange(newEntries);
  };

  const handleRemoveEntry = index => {
    if (window.confirm("Are you sure you want to remove this field?")) {
      const newEntries = entries.filter((_, i) => i !== index);
      setEntries(newEntries);
      onValueChange(newEntries);
    }
  };

  return (
    <div className="relative flex flex-col gap-3">
      {entries?.length
        ? entries.map((entry, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 rounded-lg p-3"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="block text-sm my-auto font-semibold text-gray-700 ">
                  Field {index + 1}
                  {/* {entry.label || "New Entry"} */}
                </h3>
                <button
                  onClick={() => handleRemoveEntry(index)}
                  className="text-red-600 hover:text-red-700 focus:outline-none my-auto"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <Select.Root
                    value={entry.type}
                    onValueChange={value => {
                      handleChange(index, "type", value);
                    }}
                  >
                    <Select.Trigger className="w-full max-w-[140px] h-[32px] px-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 flex items-center">
                      <Select.Value placeholder="Choose type" />
                    </Select.Trigger>
                    <Select.Portal avoidCollisions={false}>
                      <Select.Content className="bg-white border border-gray-300 rounded-md shadow-sm">
                        <Select.Viewport>
                          <Select.Item
                            value="text"
                            className="h-[32px] text-xs px-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 flex flex-col justify-center"
                          >
                            <Select.ItemText>text</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="description"
                            className="h-[32px] text-xs px-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 flex flex-col justify-center"
                          >
                            <Select.ItemText>description</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="number"
                            className="h-[32px] text-xs px-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 flex flex-col justify-center"
                          >
                            <Select.ItemText>number</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="date"
                            className="h-[32px] text-xs px-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 flex flex-col justify-center"
                          >
                            <Select.ItemText>date</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="select"
                            className="h-[32px] text-xs px-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 flex flex-col justify-center"
                          >
                            <Select.ItemText>select</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="url"
                            className="h-[32px] text-xs px-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-200 flex flex-col justify-center"
                          >
                            <Select.ItemText>url</Select.ItemText>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Field</label>
                  <input
                    type="text"
                    placeholder="Field"
                    value={entry.field}
                    onChange={e => handleChange(index, "field", e.target.value)}
                    className="w-full max-w-[140px] h-[32px] px-2 border border-gray-300 text-sm bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 truncate"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Label</label>
                  <input
                    type="text"
                    placeholder="Label"
                    value={entry.label}
                    onChange={e => handleChange(index, "label", e.target.value)}
                    className="w-full max-w-[140px] h-[32px] px-2 border border-gray-300 text-sm bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 truncate"
                  />
                </div>
                {/* <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Initial Value</label>
                  <input
                    type="text"
                    placeholder="Initial Value"
                    value={entry.initialValue}
                    onChange={e => handleChange(index, "initialValue", e.target.value)}
                    className="w-full max-w-[140px] h-[32px] px-2 border border-gray-300 text-sm bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 truncate"
                  />
                </div> */}
              </div>
            </div>
          ))
        : null}
      <button
        onClick={handleAddEntry}
        className={`h-[26px] px-3 w-fit text-xs font-medium ${
          theme === "blue"
            ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            : theme === "gray"
            ? "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
            : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
        } text-white rounded-full shadow-sm focus:outline-none focus:ring-2 flex items-center`}
      >
        <PlusIcon className="h-4 w-4 mr-1" />
        Add field
      </button>
    </div>
  );
};

export default SeoPanel;