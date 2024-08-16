import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const ThemeSelector = ({ theme, onThemeChange, themeOptions }) => (
  <div className="flex flex-row justify-between">
    <label className="block text-sm font-medium text-gray-700">
      Theme
    </label>
    <ToggleGroup.Root
      type="single"
      value={theme}
      onValueChange={onThemeChange}
      className="flex space-x-2"
    >
      {themeOptions.map(option => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className={`w-6 h-6 rounded-full ${option.value=='blue' ? 'bg-blue-600': option.value=='gray'?'bg-gray-400':''}  ${theme === option.value ? 'border border-2 border-blue-400 shadow-lg' : ''}`}
        />
      ))}
    </ToggleGroup.Root>
  </div>
);

export default ThemeSelector;