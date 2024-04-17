import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

const toggleGroupItemClasses =
  "hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";

const ToggleGroupDemo = ({editor, showing, figureType}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (showing) {
      const videoAttrs = editor.getAttributes("figure");
      setValue(
        parseInt(videoAttrs.width, 10) ? parseInt(videoAttrs.width, 10) : 100
      );
    }
  }, [showing]);

  const updateWidth = value => {
    console.log(value);
    editor.commands.updateAttributes("figure", { width: value + "%" });
    // editor.chain().focus().updateAttributes('figure', { width: value+'%' }).run();
    setValue(value);
  };

  return (
    <ToggleGroup.Root
      onValueChange={(value) =>updateWidth(value)}
      className="inline-flex bg-mauve6 rounded shadow-[0_2px_10px] shadow-blackA4 space-x-px"
      type="single"
      defaultValue="100%"
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="left"
        aria-label="Left aligned"
      >
        <TextAlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="center"
        aria-label="Center aligned"
      >
        <TextAlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="right"
        aria-label="Right aligned"
      >
        <TextAlignRightIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default ToggleGroupDemo;
