import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectSponsor = ({ defaultValue, onChange, items, disabled, type }) => {
  return (
    <Select.Root
      disabled={disabled}
      id="productId"
      name="productId"
      className="z-50"
      defaultValue={defaultValue}
      onValueChange={onChange}
    >
      <Select.Trigger
        className={`inline-flex text-base items-center justify-between border border-gray-300 rounded-xl px-4 h-[44px] w-full leading-none gap-[5px] ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-800"}  font-base shadow-sm hover:bg-mauve3 focus:shadow-black data-[placeholder]:text-blue-9 outline-none`}
        aria-label="Food"
      >
        <Select.Value placeholder="Select a package..." />
        <Select.Icon className="text-blue-11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className="z-50">
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-blue-11 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-base leading-[25px] text-blue-900/80">
                {type?.niceName} Sponsorship
              </Select.Label>
              {items?.map((i, index) => (
                <SelectItem key={"type_" + index} value={i.uid}>
                  {`${i.title} – ${i.price}`}
                </SelectItem>
              ))}

              <SelectItem key={"type_" + 'none'} value={false}>
                None
              </SelectItem>
            </Select.Group>

            {/* <Select.Separator className="h-[1px] bg-blue-6 m-[5px]" />

            <Select.Group>
              <Select.Label className="px-[25px] text-base leading-[25px] text-blue-900/80">
                Website Sponsor
              </Select.Label>
              {items.website?.map((i, index) => (
                <SelectItem key={"type_" + index} value={i.productId}>
                  {`${i.title} – ${i.price}`}
                </SelectItem>
              ))}
            </Select.Group> */}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-blue-11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "text-lg leading-none text-blue-11 rounded-[3px] flex items-center h-[44px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue-900 data-[highlighted]:text-blue-100",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectSponsor;
