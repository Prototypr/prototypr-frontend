import React from "react";
import * as Select from "@radix-ui/react-select";
import * as RadixSwitch from "@radix-ui/react-switch";

const NavSettings = ({ nav, onNavChange, avatarOptions }) => (
  <div className="mb-4 flex flex-col gap-4">
    <div className="flex items-center justify-between w-full">
      <label className="text-sm font-medium text-gray-700 my-auto">
        Show Nav
      </label>
      <RadixSwitch.Root
        checked={nav.show}
        onCheckedChange={checked => onNavChange({ ...nav, show: checked })}
        className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
          nav.show ? "bg-blue-500/90" : "bg-gray-300"
        }`}
      >
        <RadixSwitch.Thumb
          className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            nav.show ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </RadixSwitch.Root>
    </div>

    <div className="flex flex-row justify-between">
      <label className="block text-sm font-medium text-gray-700 my-auto">
        Avatar Placeholder
      </label>
      <Select.Root
        value={nav.userBadge.avatarPlaceholder}
        onValueChange={value =>
          onNavChange({
            ...nav,
            userBadge: { ...nav.userBadge, avatarPlaceholder: value },
          })
        }
      >
        <Select.Trigger className="max-w-[110px] truncate text-nowrap overflow-hidden h-[32px] px-2 pl-1 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 flex items-center">
          <img
            src={nav.userBadge.avatarPlaceholder}
            alt="Avatar"
            className="w-6 h-6 border border-gray-300 flex-none rounded-full object-contain mr-1.5"
          />
          <Select.Value placeholder="Select an avatar" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white border border-gray-300 rounded-md shadow-sm">
            <Select.Viewport>
              {avatarOptions.map(({ name, imgSrc }) => (
                <Select.Item
                  key={name}
                  value={imgSrc}
                  className="h-[32px] px-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <img
                    src={imgSrc}
                    alt="Avatar"
                    className="w-6 h-6 border border-gray-300 rounded-full mr-2 object-contain"
                  />
                  <Select.ItemText className="truncate text-nowrap overflow-hidden">
                    {name ? name : "Avatartion"}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>

    <div className="flex flex-row justify-between">
      <label className="block my-auto text-sm font-medium text-gray-700 mb-2">
        Nav Position
      </label>
      <Select.Root
        value={nav.position}
        onValueChange={value => onNavChange({ ...nav, position: value })}
      >
        <Select.Trigger className="w-full max-w-[110px] truncate text-nowrap overflow-hidden h-[32px] px-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 flex items-center">
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white border border-gray-300 rounded-md shadow-sm">
            <Select.Viewport>
              <Select.Item
                value="sticky"
                className="h-[32px] px-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <Select.ItemText>Sticky</Select.ItemText>
              </Select.Item>
              <Select.Item
                value="relative"
                className="h-[32px] px-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <Select.ItemText>Relative</Select.ItemText>
              </Select.Item>
              <Select.Item
                value="fixed"
                className="h-[32px] px-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <Select.ItemText>Fixed</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>

    <div className="flex flex-row justify-between">
      <label className="block my-auto text-sm font-medium text-gray-700 mb-2">
        Logo URL
      </label>
      <div className="relative">
        <input
          type="text"
          value={nav.logo.url}
          onChange={e =>
            onNavChange({ ...nav, logo: { image: e.target.value, ...nav.url } })
          }
          className="w-full pl-[26px] pr-2 max-w-[110px] truncate text-nowrap overflow-hidden h-[32px] text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {nav.logo.url?.length > 2 ? (
          <img
            src={nav.logo.url}
            alt="Logo"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 border border-gray-300 rounded-sm object-contain"
          />
        ) : (
          <svg
            className={"absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5"}
            width="164"
            height="164"
            viewBox="0 0 164 164"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1_12)">
              <rect width="164" height="164" fill="white" />
              <rect
                x="6"
                y="6"
                width="152"
                height="152"
                rx="6"
                stroke="black"
                stroke-width="12"
              />
              <path
                d="M111.138 45.058L89.022 45.446V121.688L104.736 124.986C104.736 128.995 103.637 131 101.438 131L82.62 129.836L63.414 131C60.9567 131 59.728 128.995 59.728 124.986L75.442 121.688V45.446L53.52 45.058L51.58 58.638C51.58 60.578 48.9933 61.548 43.82 61.548L41.88 38.656C42.1387 36.9747 44.0787 36.134 47.7 36.134L82.62 36.91L116.958 36.134C120.579 36.134 122.519 36.9747 122.778 38.656L120.838 61.548C115.665 61.548 113.078 60.578 113.078 58.638L111.138 45.058Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_12">
                <rect width="164" height="164" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
    </div>
    <div className="flex items-center justify-between w-full">
      <label className="text-sm my-auto font-medium text-gray-700">
        Undo/Redo Buttons
      </label>
      <RadixSwitch.Root
        checked={nav.undoRedoButtons.show}
        onCheckedChange={checked =>
          onNavChange({
            ...nav,
            undoRedoButtons: { ...nav.undoRedoButtons, show: checked },
          })
        }
        className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
          nav.undoRedoButtons.show ? "bg-blue-500/90" : "bg-gray-300"
        }`}
      >
        <RadixSwitch.Thumb
          className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            nav.undoRedoButtons.show ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </RadixSwitch.Root>
    </div>

    <div className="flex items-center justify-between w-full">
      <label className="text-sm my-auto font-medium text-gray-700">
        Publish status
      </label>
      <RadixSwitch.Root
        checked={nav.postStatus.show}
        onCheckedChange={checked =>
          onNavChange({
            ...nav,
            postStatus: {
              ...nav.postStatus,
              show: checked,
            },
          })
        }
        className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
          nav.postStatus.show ? "bg-blue-500/90" : "bg-gray-300"
        }`}
      >
        <RadixSwitch.Thumb
          className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            nav.postStatus.show ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </RadixSwitch.Root>
    </div>

    <div className="flex items-center justify-between w-full">
      <label className="text-sm my-auto font-medium text-gray-700">
        User Badge
      </label>
      <RadixSwitch.Root
        checked={nav.userBadge.show}
        onCheckedChange={checked =>
          onNavChange({
            ...nav,
            userBadge: { ...nav.userBadge, show: checked },
          })
        }
        className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
          nav.userBadge.show ? "bg-blue-500/90" : "bg-gray-300"
        }`}
      >
        <RadixSwitch.Thumb
          className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            nav.userBadge.show ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </RadixSwitch.Root>
    </div>
  </div>
);

export default NavSettings;
