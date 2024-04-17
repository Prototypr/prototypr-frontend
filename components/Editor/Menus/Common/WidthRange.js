import React, { useEffect, useState } from "react";

const WidthSlider = ({ editor, showing, figureType }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (showing) {
        resetValue()
    }
  }, [showing]);

  const resetValue = () =>{
    const figureAttrs = editor.getAttributes("figure");
    if(figureAttrs){
        setValue(
          parseInt(figureAttrs.width, 10) ? parseInt(figureAttrs.width, 10) : 100
        );
    }
  }

  const updateWidth = value => {
    if (figureType === "video") {
      //the video rerenders on change quite badly,causing the tooltip to disappear
      //so only update video width on mouseup
      editor.commands.updateAttributes("figure", { width: value + "%" });
    } else {
      //if not video, update width as the slider moves
      setValue(value);
      editor.commands.updateAttributes("figure", { width: value + "%" });
    }
  };

  return (
    <div className="flex ml-2 flex-col justify-center">
      {value && (
        <div class="flex items-center gap-2">
          <input
            class=" bg-gray-300 border-0 h-2 rounded accent-white appearance-none fill-white"
            min="25"
            max="100"
            step="25"
            type="range"
            value={value}
            // onInput={(e) => setWidth(e.target.value)}
            onChange={e => {
              if (figureType === "video") {
                //the video rerenders on change quite badly,causing the tooltip to disappear
                //so only update video width on mouseup
                setValue(e.target.value);
              } else {
                //if not video, update width as the slider moves
                updateWidth(e.target.value);
              }
            }}
            // onChange={(e) => setValue(e.target.value)}
            onMouseUp={e => {
                if (figureType === "video") {
                    updateWidth(e.target.value);
                }
            }}
          />
          <span class="text-xs font-semibold text-gray-400 select-none">
            {value}%
          </span>
        </div>
      )}
    </div>
  );
};
export default WidthSlider;
